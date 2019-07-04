var url_prefix = 'http://Admin:pass@172.17.64.137:5984';
// 'http://Admin:dtymoney91190@dty-dgccrf.centralesupelec.fr/couchdb';

export default {
  couchDb: {
    url_dossiers: url_prefix + '/dossiers',
    url_controles: url_prefix + '/controles',
    url_documents: url_prefix + '/documents',
    url_new_controles: url_prefix + '/new-controles',
    url_visites: url_prefix + '/visites'
  }
};
