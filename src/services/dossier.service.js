import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import config from '../config';

PouchDB.plugin(PouchDBFind);
class pouchDbService {
  constructor(pouchDbUrl) {
    this.db = new PouchDB('mes-dossiers');
    // var opts = {
    //   live: true,
    //   retry: true,
    //   filter: 'filters/by_user',
    //   query_params: { AGENT_DD_IDENT: 4447 }
    // };
    // this.db.replicate.from(pouchDbUrl, opts);
    this.db.createIndex({
      index: { fields: ['DOSSIER_IDENT'] }
    });
    this.db.createIndex({
      index: { fields: ['ACDG_CODE_ACTION'] }
    });
  }

  //call the callback on db changes
  onChanges(cb) {
    this.db
      .changes({
        since: 'now',
        live: true
      })
      .on('change', cb);
  }

  //getAllDocsOfTheDB
  getAllDocs() {
    return this.db
      .allDocs({ include_docs: true, descending: true })
      .then(table =>
        table.rows
          .map(item => item.doc)
          .filter(item => !(item._id.split('/')[0] == '_design'))
      );
  }

  getAllActionCode() {
    return this.getAllDocs().then(array =>
      array
        .map(item => item.ACDG_CODE_ACTION)
        .filter((value, index, self) => self.indexOf(value) === index)
    );
  }

  getDossierIdFromActionCode(actionCode) {
    return this.db
      .find({
        selector: {
          ACDG_CODE_ACTION: actionCode
        }
      })
      .then(items => items.docs[0].DOSSIER_IDENT);
  }

  getDossierById(dossier) {
    return this.db
      .find({
        selector: {
          DOSSIER_IDENT: parseInt(dossier)
        }
      })
      .then(res => res.docs[0]);
  }
}

export default new pouchDbService(config.couchDb.url_dossiers);
