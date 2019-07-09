import { store } from '../store';
import DossierService from './subservices/dossier.service';
import VisiteService from './subservices/visite.service';
import ActiviteService from './subservices/activite.service';
import CpfService from './subservices/cpf.service';

class PouchDbServices {

    constructor() {
        this.AGENT_DD_IDENT = store.getState().dataReducer.AGENT_DD_IDENT;
        this.services = {
            dossier: new DossierService(this.AGENT_DD_IDENT),
            visite: new VisiteService(this.AGENT_DD_IDENT),
            activite: new ActiviteService(),
            cpf: new CpfService()
        }
        this.ChangeAgent = this.ChangeAgent.bind(this);
    }

    async ChangeAgent(AGENT_DD_IDENT) {
        this.AGENT_DD_IDENT = AGENT_DD_IDENT;
        Object.keys(this.services).map(key => this.services[key].resetDb(AGENT_DD_IDENT));
    }
}

export default new PouchDbServices();