//var url_prefix = 'https://Admin:dtymoney91190@m.dgccrf.rie.gouv.fr/couchdb';
var url_prefix = 'http://Admin:password@172.17.64.136:5984';
export default {
  backend: {
    base_url: 'http://172.17.64.136:8080'
  },
  couchDb: {
    url_dossiers: url_prefix + '/dossiers',
    url_controles: url_prefix + '/controles',
    url_documents: url_prefix + '/documents',
    url_new_controles: url_prefix + '/new-controles',
    url_visites: url_prefix + '/visites',
    url_activite: url_prefix + '/activite',
    url_cpf: url_prefix + '/produit-cpf',
    url_trames: url_prefix + '/trames',
    url_new_visites: url_prefix + '/new-visites'
  }
};
