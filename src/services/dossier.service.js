import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import config from '../config';

PouchDB.plugin(PouchDBFind);
class pouchDbService {
  constructor(pouchDbUrl) {
    this.db = new PouchDB('mes-dossiers');
    var opts = {
      live: true,
      retry: true
    };
    this.db.replicate.to(pouchDbUrl, opts);
    this.db.replicate.from(pouchDbUrl, opts);
    this.db.createIndex({
      index: { fields: ['DOSSIER_IDENT'] }
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
      .then(table => table.rows.map(item => item.doc));
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
