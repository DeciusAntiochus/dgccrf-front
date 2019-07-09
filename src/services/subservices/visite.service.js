/* eslint-disable no-undef */
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import replicateFromSQL from '../replicationHandler';
import config from '../../config';
PouchDB.plugin(PouchDBFind);

class PouchDbVisiteService {
  constructor(AGENT_DD_IDENT) {
    this.resetDb = this.resetDb.bind(this);
    this.initDb = this.initDb.bind(this);
    this.changesCallbacks = [];
    this.initDb(AGENT_DD_IDENT);
  }

  async resetDb(AGENT_DD_IDENT) {
    clearInterval(this.controleInterval);
    clearInterval(this.visiteInterval);
    await this.controleDB.destroy();
    await this.newControleDB.destroy();
    await this.visiteDB.destroy();
    await this.newVisiteDB.destroy();
    await this.initDb(AGENT_DD_IDENT);
  }

  async initDb(AGENT_DD_IDENT) {
    var opts = {
      batch_size: 1000,
      live: true,
      retry: true,
      filter: 'filters/by_user',
      query_params: { AGENT_DD_IDENT: AGENT_DD_IDENT }
    };

    var opts_without_filter = {
      batch_size: 1000,
      live: true,
      retry: true
    };

    this.controleDB = new PouchDB('controles');
    this.controleInterval = replicateFromSQL(this.controleDB, config.backend.base_url + '/fulldata/controles/' + AGENT_DD_IDENT);
    this.controleDB.createIndex({
      index: { fields: ['DOSSIER_IDENT'] }
    });
    this.controleDB
      .changes({
        since: 'now',
        live: true
      })
      .on('change', () => this.changesCallbacks.map(cb => cb()));

    this.newVisiteDB = new PouchDB('new-visites');
    this.newVisiteDB.replicate.to(config.couchDb.url_new_visites, {
      live: true,
      retry: true
    });
    this.newVisiteDB.replicate.from(
      config.couchDb.url_new_visites,
      opts_without_filter
    );
    this.newVisiteDB.createIndex({
      index: { fields: ['VISITE_IDENT'] }
    });
    this.newVisiteDB
      .changes({
        since: 'now',
        live: true
      })
      .on('change', () => this.changesCallbacks.map(cb => cb()));

    this.newControleDB = new PouchDB('new-controles');
    this.newControleDB.replicate.to(config.couchDb.url_new_controles, {
      live: true,
      retry: true
    });
    this.newControleDB.replicate.from(config.couchDb.url_new_controles, opts);
    this.newControleDB.createIndex({
      index: { fields: ['DOSSIER_IDENT'] }
    });
    this.newControleDB
      .changes({
        since: 'now',
        live: true
      })
      .on('change', () => this.changesCallbacks.map(cb => cb()));

    this.visiteDB = new PouchDB('visites');
    this.visiteInterval = replicateFromSQL(this.visiteDB, config.backend.base_url + '/fulldata/visites/' + AGENT_DD_IDENT);
    this.visiteDB.createIndex({
      index: { fields: ['VISTE_IDENT'] }
    });
    this.visiteDB
      .changes({
        since: 'now',
        live: true
      })
      .on('change', () => this.changesCallbacks.map(cb => cb()));
  }

  //call the callback on db changes
  onChanges(cb) {
    this.changesCallbacks.push(cb);
  }

  //getAllDocsOfTheDB
  async getAllDocs() {
    let firstArray = await this.controleDB.allDocs({ include_docs: true, descending: true });
    firstArray = firstArray.rows.map(item => item.doc);
    let secondArray = await this.newControleDB.allDocs({ include_docs: true, descending: true });
    secondArray = secondArray.rows.map(item => item.doc);

    return secondArray.concat(firstArray).filter(item => !(item._id.split('/')[0] == '_design'));
  }

  async getControlesByDossier(dossierID) {
    let firstArray = await this.controleDB.find({ selector: { DOSSIER_IDENT: parseInt(dossierID) } });
    firstArray = firstArray.docs;
    let secondArray = await this.newControleDB.find({ selector: { DOSSIER_IDENT: parseInt(dossierID) } });
    secondArray = secondArray.docs;
    return firstArray.concat(secondArray).filter((value, index, self) => self.indexOf(value) === index);
  }

  async getVisitesByDossier(dossierID) {
    let controles = await this.getControlesByDossier(dossierID);
    let visitesDic = {};
    for (let controle of controles) {
      visitesDic[controle.VISITE_IDENT] =
        visitesDic[controle.VISITE_IDENT] || [];
      visitesDic[controle.VISITE_IDENT].push(controle);
    }
    let visitesList = Object.keys(visitesDic).map(async VISITE_IDENT => {
      let visiteData = await this.visiteDB
        .find({ selector: { VISITE_IDENT: parseInt(VISITE_IDENT) } })
        .then(table => table.docs[0]);
      if (!visiteData) {
        visiteData = await this.newVisiteDB
          .find({ selector: { VISITE_IDENT: parseInt(VISITE_IDENT) } })
          .then(table => table.docs[0]);
      }
      if (visiteData) {
        return {
          visiteData,
          controles: visitesDic[VISITE_IDENT]
        };
      }
    });
    visitesList = await Promise.all(visitesList);
    // eslint-disable-next-line no-undefa
    return visitesList.filter(doc => doc);
  }

  postControlesByVisite(visiteInfos, controlesList) {
    let promises = [];
    const ident = parseInt(Date.now());
    promises.push(
      this.newVisiteDB.post({
        ...visiteInfos,
        VISITE_IDENT: ident
      })
    );
    for (let controle of controlesList) {
      promises.push(
        this.newControleDB.post({
          ...visiteInfos,
          DOSSIER_IDENT: controle.dossier,
          CPF_CODE_PRODUIT: controle.cpf,
          STADE_PRODUIT_IDENT: parseInt(controle.stade),
          CONTROLE_IDENT: controle.dossier.toString() + controle.cpf.toString(),
          VISITE_IDENT: ident
        })
      );
    }
    return Promise.all(promises);
  }
}

export default PouchDbVisiteService;
