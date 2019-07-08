import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import config from '../config';

PouchDB.plugin(PouchDBFind);

class PouchDBService {}
