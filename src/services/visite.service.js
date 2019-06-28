import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import config from '../config';
import dossierService from './dossier.service';
PouchDB.plugin(PouchDBFind);

class pouchDbVisiteService {
    constructor() {
        this.controleDB = new PouchDB('controles');
        var opts = {
            live: true, retry: true
        };
        this.controleDB.replicate.to(config.couchDb.url_controles, { live: true, retry: true });
        this.controleDB.replicate.from(config.couchDb.url_controles, opts);
        this.controleDB.createIndex({
            index: { fields: ['DOSSIER_IDENT'] }
        });

        this.newControleDB = new PouchDB('new-controles');
        this.newControleDB.replicate.to(config.couchDb.url_new_controles, { live: true, retry: true });
        this.newControleDB.replicate.from(config.couchDb.url_new_controles, opts);
        this.newControleDB.createIndex({
            index: { fields: ['DOSSIER_IDENT'] }
        });

        this.visiteDB = new PouchDB('visites');
        this.visiteDB.replicate.to(config.couchDb.url_visites, { live: true, retry: true });
        this.visiteDB.replicate.from(config.couchDb.url_visites, opts);
        this.visiteDB.createIndex({
            index: { fields: ['VISTE_IDENT'] }
        });
    }

    //call the callback on db changes
    onChanges(cb) {
        this.controleDB.changes({
            since: 'now',
            live: true
        }).on('change', cb);
    }

    //getAllDocsOfTheDB
    getAllDocs() {
        return this.controleDB.allDocs({ include_docs: true, descending: true })
            .then(table => table.rows.map(item => item.doc))
            .then(firstArray => this.newControleDB.allDocs({ include_docs: true, descending: true })
                .then(table => table.rows.map(item => item.doc).concat(firstArray).filter(item => !(item._id.split('/')[0] == "_design")))
            );
    }

    getControlesByDossier(dossierID) {
        return this.controleDB.find({ selector: { DOSSIER_IDENT: parseInt(dossierID) } })
            .then(table => table.docs)
            .then(firstArray => this.newControleDB.find({ selector: { DOSSIER_IDENT: parseInt(dossierID) } })
                .then(table => table.docs.concat(firstArray).filter((value, index, self) => self.indexOf(value) === index))
            );
    }

    async getVisitesByDossier(dossierID) {
        let controles = await this.getControlesByDossier(dossierID);
        let visitesDic = {};
        for (let controle of controles) {
            visitesDic[controle.VISITE_IDENT] = visitesDic[controle.VISITE_IDENT] || [];
            visitesDic[controle.VISITE_IDENT].push(controle)
        }
        let visitesList = Object.keys(visitesDic).map(async VISITE_IDENT => ({
            visiteData: await this.visiteDB.find({ selector: { VISITE_IDENT } }),
            controles: visitesDic[VISITE_IDENT]
        }))
        return await Promise.all(visitesList);
    }

    postControlesByVisite(visiteInfos, controlesActionList) {
        let promises = [];
        for (let action of controlesActionList) {
            promises.push(dossierService.getDossierIdFromActionCode(action)
                .then(DOSSIER_IDENT => this.newControleDB.post({ ...visiteInfos, DOSSIER_IDENT })))
        }
        return Promise.all(promises);
    }

}

export default new pouchDbVisiteService();