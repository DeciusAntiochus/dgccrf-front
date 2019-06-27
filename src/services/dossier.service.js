import PouchDB from 'pouchdb';
import config from '../config';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);


class pouchDbService {
    constructor(pouchDbUrl) {
        this.db = new PouchDB('mes-dossiers');
        var opts = {
            live: true, retry: true,
        };
        this.db.replicate.to(pouchDbUrl, opts);
        this.db.replicate.from(pouchDbUrl, opts);
        this.db.createIndex({
            index: { fields: ['ACDG_CODE_ACTION'] }
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
            .then(table => table.rows.map(item => item.doc).filter(item => !(item._id.split('/')[0] == "_design")));
    }

    getAllActionCode() {
        return this.getAllDocs()
            .then(array => array.map(item => item.ACDG_CODE_ACTION).filter((value, index, self) => self.indexOf(value) === index))
    }

    getDossierIdFromActionCode(actionCode) {
        return this.db.find({
            selector: {
                ACDG_CODE_ACTION: actionCode
            }
        }).then(items => items.docs[0].DOSSIER_IDENT)
    }

}

export default new pouchDbService(config.couchDb.url_dossiers);