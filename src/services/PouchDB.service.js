import PouchDB from 'pouchdb';
import config from '../config';

class pouchDbService {
    constructor(pouchDbUrl) {
        this.db = new PouchDB('mes-dossiers');
        var opts = {
            live: true, retry: true,
        };
        this.db.replicate.to(pouchDbUrl, opts);
        this.db.replicate.from(pouchDbUrl, opts);
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

}

export default new pouchDbService(config.couchDb.url_dossiers);