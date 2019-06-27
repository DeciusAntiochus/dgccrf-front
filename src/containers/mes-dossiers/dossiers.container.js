import React from 'react';
import { Grid, List, Container, Card, Search } from 'semantic-ui-react';

import Dossier from './dossier';
import MenuButton from '../../components/menuButton.component';
import dossierService from '../../services/PouchDB.service';
import { PropTypes } from 'prop-types';
import { changeNameOfPage, changeBackUrl } from '../navbar/actions';
import { connect } from 'react-redux';

import _ from 'lodash';

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
  loadDossiers(dossiers) {
    this.setState({ dossiers: dossiers, results: dossiers });
  }

  handleSearchChange = (e, { value }) => {
    const results = this.state.dossiers.filter(dossier => {
      return (
        dossier.DOSSIER_LIBELLE.toLowerCase().includes(value.toLowerCase()) ||
        dossier.DOSSIER_OBJ_TRAVAIL.includes(value.toLowerCase())
      );
    });

    this.setState({ results: results });
  };

  componentDidMount() {
    dossierService.getAllDocs().then(res => this.loadDossiers(res));
    dossierService.onChanges(() =>
      dossierService.getAllDocs().then(res => this.loadDossiers(res))
    );
    this.props.changeNameOfPage('Mes Dossiers');
    this.props.changeBackUrl('/menu');
  }

  constructor(props) {
    super(props);
    this.state = {
      dossiers: [],
      results: []
    };
  }

  render() {
    return (
      <Card
        fluid
        style={{
          flexGrow: 1,
          width: '100%',
          margin: 0,
          backgroundColor: '#f2f2f2',
          borderRadius: 5,
          boxShadow: '0px 0px 0px 0px #f2f2f2',
          overflow: 'auto',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <div
          style={{
            position: 'fixed',
            zIndex: 10,
            width: '100%',
            textAlign: 'center',
            padding: 10,
            backgroundColor: '#f2f2f2',
            display: 'flex',
            justifyContent: 'center',
            verticalAlign: 'middle'
          }}
        >
          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',

              fontWeight: 'bold'
            }}
          >
            {this.state.dossiers.length} dossiers trouvés.
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Search
              size="tiny"
              open={false}
              onSearchChange={_.debounce(this.handleSearchChange, 500)}
            />
          </div>

          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',

              alignItems: 'center'
            }}
          >
            {this.state.results.length} résultats.
          </div>
        </div>

        <div className="responsivemargin" style={{ position: 'relative' }}>
          <List>
            {this.state.results.map(task => (
              <List.Item key={task.id}>
                <div className="responsivepadding">
                  <Dossier
                    icon="folder"
                    iconcolor="yellow"
                    key={task.id}
                    dossier={task}
                    link={'dossier/' + task.DOSSIER_IDENT}
                    color="white"
                  />
                </div>
              </List.Item>
            ))}
          </List>
        </div>
      </Card>
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
