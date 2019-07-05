var url_prefix = 'http://Admin:pass@localhost:5984';
// 'http://Admin:dtymoney91190@dty-dgccrf.centralesupelec.fr/couchdb';

export default {
    backend: {
        base_url: 'http://localhost:8080'
    },
    couchDb: {
        url_dossiers: url_prefix + '/dossiers',
        url_controles: url_prefix + '/controles',
        url_documents: url_prefix + '/documents',
        url_new_controles: url_prefix + '/new-controles',
        url_visites: url_prefix + '/visites',
        url_activite: url_prefix + '/activite',
        url_cpf: url_prefix + '/produit-cpf'
    }
};
