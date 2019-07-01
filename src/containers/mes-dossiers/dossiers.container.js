import React from 'react';
import { Grid, List, Container, Card, Search } from 'semantic-ui-react';

import Dossier from './dossier';
import MenuButton from '../../components/menuButton.component';
import dossierService from '../../services/dossier.service';
import { PropTypes } from 'prop-types';
import { changeNameOfPage, changeBackUrl } from '../navbar/actions';
import { connect } from 'react-redux';

import './dossier.css';

import _ from 'lodash';
import MyActivityIndicator from '../../components/myActivityIndicator.component';

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
    this.setState({ dossiers: dossiers, results: dossiers, isLoading: false });
  }

  handleSearchChange = (e, { value }) => {
    const results = this.state.dossiers.filter(dossier => {
      return (
        dossier.DOSSIER_LIBELLE &&
        (dossier.DOSSIER_LIBELLE.toLowerCase().includes(value.toLowerCase()) ||
          dossier.DOSSIER_OBJ_TRAVAIL.includes(value.toLowerCase()) ||
          dossier.DOSSIER_IDENT.toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase()))
      );
    });

    this.setState({ results: results });
  };

  componentDidMount() {
    dossierService.getAllDocs().then(res => this.loadDossiers(res));
    dossierService.onChanges(() =>
      this.setState({ isLoading: true }, () => {
        dossierService.getAllDocs().then(res => this.loadDossiers(res));
      })
    );
    this.props.changeNameOfPage('Mes Dossiers');
    this.props.changeBackUrl('/menu');
  }

  constructor(props) {
    super(props);
    this.state = {
      dossiers: [],
      results: [],
      isLoading: true
    };
  }

  render() {
    console.log(this.state.dossiers);
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
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        {!this.state.isLoading ? (
          <>
            <div
              style={{
                position: 'fixed',
                zIndex: 10,
                width: '100%',
                textAlign: 'center',
                backgroundColor: '#f2f2f2',
                padding: 10,

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
              <div style={{ flex: 1, maxWidth: 200 }}>
                <Search
                  input={{ fluid: true }}
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

            <div
              className="responsivemargin"
              style={{
                backgroundColor: '#f2f2f2'
              }}
            >
              <List>
                {this.state.results.map(task => (
                  <List.Item key={task.DOSSIER_IDENT}>
                    <div className="responsivepadding">
                      {task.TYPE_DOSSIER_IDENT === 3 ? (
                        <Dossier
                          icon="folder"
                          iconcolor="yellow"
                          dossier={task}
                          link={'dossier/' + task.DOSSIER_IDENT}
                          color="white"
                          type={task.TYPE_DOSSIER_LIBELLE}
                        />
                      ) : task.TYPE_DOSSIER_IDENT === 2 ? (
                        <Dossier
                          icon="info circle"
                          iconcolor="blue"
                          dossier={task}
                          link={'dossier/' + task.DOSSIER_IDENT}
                          color="white"
                          type={task.TYPE_DOSSIER_LIBELLE}
                        />
                      ) : (
                        <Dossier
                          icon="plus circle"
                          iconcolor="grey"
                          dossier={task}
                          link={'dossier/' + task.DOSSIER_IDENT}
                          color="white"
                          type={task.TYPE_DOSSIER_LIBELLE}
                        />
                      )}
                    </div>
                  </List.Item>
                ))}
              </List>
            </div>
          </>
        ) : (
          <MyActivityIndicator />
        )}
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
