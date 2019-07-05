/* eslint-disable no-undef */
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import config from '../config';
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

    this.documentsDB.createIndex({
      index: { fields: ['visite'] }
    });
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

  getDocsByVisiteId(visiteid) {
    return this.documentsDB
      .find({
        selector: {
          visite: { $elemMatch: visiteid }
        }
      })
      .then(res => res.docs);
  }
  getDocsByDossierId(dossierid) {
    return this.documentsDB
      .find({
        selector: {
          dossier: dossierid
        }
      })
      .then(res => res.docs);
  }

  async postDocument(document) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.documentsDB.post(document);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  async editName(document) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.documentsDB.put(document);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  async deleteDocument(document) {
    return await this.documentsDB.remove(document);
  }
}

export default new pouchDbDocumentsService();
