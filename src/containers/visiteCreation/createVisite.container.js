/* eslint-disable no-undef */
import React from 'react';
import {
  Form,
  Grid,
  GridRow,
  GridColumn,
  Icon,
  TextArea,
  Button
} from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import {
  changeNameOfPage,
  changeBackUrl,
  changeActivePage
} from '../navbar/actions';
import { connect } from 'react-redux';
import PouchDbServices from '../../services';
import ControleComponent from './controles.container';
let visitesService = PouchDbServices.services.visite;
let dossierService = PouchDbServices.services.dossier;

function mapStateToProps(state) {
  return {
    agentIdent: state.dataReducer.AGENT_DD_IDENT
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeNameOfPage: newName => dispatch(changeNameOfPage(newName)),
    changeBackUrl: newBackUrl => dispatch(changeBackUrl(newBackUrl)),
    changeActivePage: () =>
      dispatch(changeActivePage('mesDossiers', '/nouvelle-visite'))
  };
}

class CreateVisiteComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cpmm: false,
      mutualisee: false,
      date: '',
      etab: '',
      SIRET: '',
      observations: '',
      trame: '',
      trameList: ['trame 1', 'trame 2']
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.changeNameOfPage('Création de visite');
    this.props.changeBackUrl('/mes-dossiers'); // TODO : change for /dossier/:idDossier
    this.props.changeActivePage();
    dossierService
      .getAllActionCode()
      .then(actionList => this.setState({ actionList }));
  }

  onSubmit() {
    visitesService
      .postControlesByVisite(
        {
          ETOB_RAISON_SOCIALE: this.state.etab,
          ETOB_SIRET: this.state.SIRET,
          VIS_DATE: this.state.date,
          VIS_OBSERVATIONS: this.state.observations,
          VIS_MUTUALISEE: this.state.mutualisee,
          VIS_CPMM: this.state.cpmm,
          trame: this.state.trame,
          AG_IDENT: this.props.agentIdent
        },
        this.state.addedActions
      )
      .then(() => window.alert('La visite a bien été ajoutée.'));
  }

  render() {
    return (
      <Grid style={{ margin: 'auto', textAlign: 'left' }} centered>
        <GridRow>
          <GridColumn width={14}>
            <Form onSubmit={this.onSubmit}>
              <Form.Group widths="equal">
                <Form.Checkbox
                  label="CPMM"
                  onChange={e => this.setState({ cpmm: e.target.value })}
                />
                <Form.Checkbox
                  label="Visite Mutualisée"
                  onChange={e => this.setState({ mutualisee: e.target.value })}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <DateInput
                  label="Date de la visite"
                  name="date"
                  placeholder="Date de la visite"
                  required
                  value={this.state.date}
                  iconPosition="right"
                  onChange={(event, { value }) =>
                    this.setState({ date: value })
                  }
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  required
                  label="Etablissement"
                  placeholder="Raison Sociale"
                  onChange={e => this.setState({ etab: e.target.value })}
                />

                <Form.Input
                  fluid
                  required
                  label="SIRET"
                  placeholder="SIRET"
                  onChange={e => this.setState({ siret: e.target.value })}
                />
              </Form.Group>
              <Form.Group style={{ margin: 0 }}>
                <Grid
                  style={{ width: '100%', margin: 0 }}
                  verticalAlign="bottom"
                >
                  <GridRow style={{ display: 'flex' }}>
                    <Grid.Column width={14} style={{ padding: 0 }}>
                      <Form.Select
                        fluid
                        placeholder="Trâme"
                        label="Trâme associée"
                        style={{ width: '100%' }}
                        options={this.state.trameList.map(trame => ({
                          key: trame,
                          text: trame,
                          value: trame
                        }))}
                        onChange={(e, { value }) =>
                          this.setState({ trame: value })
                        }
                      />
                    </Grid.Column>

                    <Grid.Column width={1} style={{ padding: 0 }}>
                      <Link to="/nouvelle-trame">
                        <div
                          style={{
                            width: '100%',
                            textAlign: 'center',
                            cursor: 'pointer',
                            paddingBottom: '0.3em'
                          }}
                        >
                          <Icon name="plus" size="big" />
                        </div>
                      </Link>
                    </Grid.Column>
                  </GridRow>
                </Grid>
              </Form.Group>
              <Form.Group>
                <Form.Field width={16}>
                  <TextArea
                    placeholder="Observations"
                    onChange={e =>
                      this.setState({ observations: e.target.value })
                    }
                  />
                </Form.Field>
              </Form.Group>
            </Form>
            <ControleComponent />
            <Button style={{ marginTop: '20px' }} onClick={this.onSubmit}>
              Valider
            </Button>
          </GridColumn>
        </GridRow>
      </Grid>
    );
  }
}

CreateVisiteComponent.propTypes = {
  changeNameOfPage: PropTypes.func.isRequired,
  changeBackUrl: PropTypes.func.isRequired,
  changeActivePage: PropTypes.func.isRequired,
  agentIdent: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateVisiteComponent);