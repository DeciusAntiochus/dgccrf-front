import PouchDB from 'pouchdb';
import config from '../config';

class pouchDbService {
    constructor(pouchDbUrl) {
        this.db = new PouchDB('my_ddd', {
            ajax: {
                withCredentials: false
            }
        });
        var opts = {
            live: true, retry: true, ajax: {
                withCredentials: false
            }
        };
        this.db.replicate.to(pouchDbUrl, opts);
        this.db.replicate.from(pouchDbUrl, opts);
        console.log('ok')

    }

    getAllDocs() {
        return this.db.allDocs({ include_docs: true, descending: true });
    }
}

export default new pouchDbService(config.couchDb.url);