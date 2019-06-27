import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import config from '../config';
PouchDB.plugin(PouchDBFind);

class pouchDbVisiteService {
    constructor(pouchDbUrl) {
        this.db = new PouchDB('controles');

        var opts = {
            live: true, retry: true,
        };
        this.db.replicate.to(pouchDbUrl, opts);
        this.db.replicate.from(pouchDbUrl, opts);
        this.db.createIndex({
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
            .then(table => table.rows.map(item => item.doc));
    }

    getControlesByDossier(dossierID) {
        return this.db.find({ selector: { DOSSIER_IDENT: dossierID.toString() } })
            .then(table => table.docs);
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

}

export default new pouchDbVisiteService(config.couchDb.url_controles);