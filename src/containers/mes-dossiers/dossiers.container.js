import React from 'react';
import { Grid } from 'semantic-ui-react';

import Dossier from './dossier';
import MenuButton from '../../components/menuButton.component';
import dossierService from '../../services/PouchDB.service';
import { PropTypes } from 'prop-types';
import { changeNameOfPage, changeBackUrl } from '../navbar/actions';
import { connect } from 'react-redux';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    changeNameOfPage: newName => dispatch(changeNameOfPage(newName)),
    changeBackUrl: newBackUrl => dispatch(changeBackUrl(newBackUrl))
  };
}

class DossierComponent extends React.Component {
  constructor(props) {
    super(props);
    dossierService.getAllDocs().then(console.log);
    dossierService.onChanges(() =>
      dossierService.getAllDocs().then(console.log)
    );
    this.state = {
      taskList: [
        {
          DOSSIER_LIBELLE: 'DDPP38 2017 00001',
          ACDG_CODE_ACTION: '20',
          DOSSIER_DATE_LIMITE: '2017-05-14 00:00:00.000',
          DOSSIER_RESPONSABLE_LIBELLE: 'SAGUETON Guillaume',
          DOSSIER_ATTRIBUTAIRES:
            'SAGUETON Guillaume / GIMBERGUES Louis / LABORIE Bernard / BONHOURE Thierry / DEROUET Cécile',
          DOSSIER_OBJ_TRAVAIL:
            'TR20JAA Opération Vacances à la Neige - (OVN) - ARA'
        },
        {
          DOSSIER_LIBELLE: 'DDPP69 2017 00001',
          ACDG_CODE_ACTION: '247',
          DOSSIER_DATE_LIMITE: '2018-01-06 00:00:00.000',
          DOSSIER_RESPONSABLE_LIBELLE: 'CHARROIN Chrystel',
          DOSSIER_ATTRIBUTAIRES:
            'CHARROIN Chrystel / DELEAGE Nadine / CIRAOLO Chantal / MICHEL Michele / DELVART Daniele / DE ANDRADE Norbert / VINCENDON Caroline / FOURRIER Laurent / DE ANDRADE Remi / LUNETEAU Julie',
          DOSSIER_OBJ_TRAVAIL:
            "2017 - Contrôles d'initiative en matière de loyauté/sécurité des produits industriels et des prestations de service"
        }
      ]
    };
  }

  componentDidMount() {
    this.props.changeNameOfPage('Mes Dossiers');
    this.props.changeBackUrl('/menu');
  }

  render() {
    return (
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="top">
        <Grid.Column style={{ maxWidth: '90vw', margin: '1em' }}>
          {this.state.taskList.map(task => (
            <Dossier
              icon="folder"
              iconcolor="yellow"
              key={task.id}
              name={task.name}
              link={'dossier/' + task.id}
              color="white"
            />
          ))}
        </Grid.Column>
      </Grid>
    );
  }
}

DossierComponent.propTypes = {
  changeNameOfPage: PropTypes.func.isRequired,
  changeBackUrl: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DossierComponent);
