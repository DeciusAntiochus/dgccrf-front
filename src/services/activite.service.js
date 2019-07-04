import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import config from '../config';

PouchDB.plugin(PouchDBFind);
class ActiviteService {
    constructor() {
        let pouchDbUrl = config.couchDb.url_activite;
        this.db = new PouchDB('activite');
        var opts = {
            batch_size: 1000,
            live: true,
            retry: true,
        };

        this.db.replicate.from(pouchDbUrl, opts)

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
}

export default ActiviteService;
