import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import config from '../config';
import dossierService from './dossier.service';
PouchDB.plugin(PouchDBFind);

class pouchDbDocumentsService {
  constructor() {
    this.documentsDB = new PouchDB('documents');
    var opts = {
      live: true,
      retry: true
    };
    this.documentsDB.replicate.to(config.couchDb.url_documents, {
      live: true,
      retry: true
    });
    this.documentsDB.replicate.from(config.couchDb.url_documents, opts);
  }

  //call the callback on db changes
  onChanges(cb) {
    this.documentsDB
      .changes({
        since: 'now',
        live: true
      })
      .on('change', cb);
  }

  //getAllDocsOfTheDB
  getAllDocs() {
    return this.documentsDB
      .allDocs({ include_docs: true, descending: true })
      .then(table =>
        table.rows
          .map(item => item.doc)

          .filter(item => !(item._id.split('/')[0] == '_design'))
      );
  }

  async postDocument(document, type, name) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.documentsDB.post({
          document: document,
          author: 4447,
          dossier: 2440825,
          visite: [],
          type: type,
          name: name
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default new pouchDbDocumentsService();
