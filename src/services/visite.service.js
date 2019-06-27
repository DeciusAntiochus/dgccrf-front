import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import config from '../config';
import dossierService from './dossier.service';
PouchDB.plugin(PouchDBFind);

class pouchDbVisiteService {
    constructor(pouchDbUrl, newDbPouchDbUrl) {
        this.db = new PouchDB('controles');

        var opts = {
            live: true, retry: true
        };
        this.db.replicate.to(pouchDbUrl, { live: true, retry: true });
        this.db.replicate.from(pouchDbUrl, opts);
        this.db.createIndex({
            index: { fields: ['DOSSIER_IDENT'] }
        });

        this.newDb = new PouchDB('new-controles');
        this.newDb.replicate.to(newDbPouchDbUrl, { live: true, retry: true });
        this.newDb.replicate.from(newDbPouchDbUrl, opts);
        this.newDb.createIndex({
            index: { fields: ['DOSSIER_IDENT'] }
        });
    }

    //call the callback on db changes
    onChanges(cb) {
        this.db.changes({
            since: 'now',
            live: true
        }).on('change', cb);
    }

    //getAllDocsOfTheDB
    getAllDocs() {
        return this.db.allDocs({ include_docs: true, descending: true })
            .then(table => table.rows.map(item => item.doc))
            .then(firstArray => this.newDb.allDocs({ include_docs: true, descending: true })
                .then(table => table.rows.map(item => item.doc).concat(firstArray))
            );
    }

    getControlesByDossier(dossierID) {
        return this.db.find({ selector: { DOSSIER_IDENT: parseInt(dossierID) } })
            .then(table => table.docs)
            .then(firstArray => this.newDb.find({ selector: { DOSSIER_IDENT: parseInt(dossierID) } })
                .then(table => table.docs.concat(firstArray))
            );
    }

    async getVisitesByDossier(dossierID) {
        let controles = await this.getControlesByDossier(dossierID);
        let visitesDic = {};
        for (let controle of controles) {
            visitesDic[controle.VISITE_IDENT] = visitesDic[controle.VISITE_IDENT] || [];
            visitesDic[controle.VISITE_IDENT].push(controle)
        }
        return Object.keys(visitesDic).map(VISITE_IDENT => ({ VISITE_IDENT, controles: visitesDic[VISITE_IDENT] }));
    }

    postControlesByVisite(visiteInfos, controlesActionList) {
        let promises = [];
        for (let action of controlesActionList) {
            promises.push(dossierService.getDossierIdFromActionCode(action)
                .then(DOSSIER_IDENT => this.newDb.post({ ...visiteInfos, DOSSIER_IDENT })))
        }
        return Promise.all(promises);
    }

}

export default new pouchDbVisiteService(config.couchDb.url_controles, config.couchDb.url_new_controles);