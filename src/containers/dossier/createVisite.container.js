/* eslint-disable no-undef */
import React from 'react';
import {
  Form,
  Grid,
  GridRow,
  GridColumn,
  Icon,
  TextArea,
  Modal,
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
import visitesService from '../../services/visite.service';
import dossierService from '../../services/dossier.service';
import ControleComponent from './controle.container';

function mapStateToProps() {
  return {};
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
      actionList: ['123', '342', '1112'],
      trameList: ['Trame 1', 'Trame 2'],
      addedActions: [undefined],
      cpmm: false,
      mutualisee: false,
      date: '',
      etab: '',
      SIRET: '',
      observations: '',
      trame: ''
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
    if (this.state.addedActions.includes(undefined)) {
      return window.alert(
        'Veuillez spécifier un code action ou retirer les champs actions inutiles.'
      );
    }
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
          AG_IDENT: '4447' // TODO : à changer pour mettre le bon code agent
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
              {/* <Grid style={{ width: '100%', margin: 0 }}>
                {this.state.addedActions.map((addedAction, actionIndex) => (
                  <GridRow
                    key={addedAction}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0',
                      margin: '0'
                    }}
                  >
                    <GridColumn width={14} style={{ margin: 0, padding: 0 }}>
                      <Form.Select
                        fluid
                        placeholder="Action"
                        label={
                          actionIndex == 0 ? 'Actions associées' : undefined
                        }
                        options={this.state.actionList.map(action => ({
                          key: action,
                          text: action,
                          value: action
                        }))}
                        style={{ width: '100%' }}
                        value={this.state.addedActions[actionIndex]}
                        onChange={(e, { value }) => {
                          let newActions = this.state.addedActions.map(
                            (el, i) => (i === actionIndex ? value : el)
                          );
                          this.setState({ addedActions: newActions });
                        }}
                      />
                    </GridColumn>
                    <GridColumn
                      width={1}
                      style={{ padding: 0, marginLeft: '0' }}
                    >
                      {actionIndex !== 0 && (
                        <Icon
                          color="red"
                          name="minus"
                          size="big"
                          style={{ cursor: 'pointer' }}
                          width={1}
                          verticalAlign="bottom"
                          onClick={() => {
                            let newActions = this.state.addedActions.filter(
                              (el, i) => i !== actionIndex
                            );
                            this.setState({ addedActions: newActions });
                          }}
                        />
                      )}
                    </GridColumn>
                  </GridRow>
                ))}
              </Grid>

              <div
                style={{
                  width: '100%',
                  textAlign: 'center',
                  marginTop: '0.5em',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  let newActions = this.state.addedActions.map(el => el);
                  newActions.push(undefined);
                  this.setState({ addedActions: newActions });
                }}
              >
                <Icon name="circle plus" size="big" color="green" />
              </div> */}

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
            <p style={{ fontWeight: 'bold' }}>Contrôles :</p>
            <Modal trigger={<Button>Ajouter un contrôle</Button>}>
              <Modal.Header>Ajouter un contrôle</Modal.Header>
              <Modal.Content>
                <ControleComponent />
              </Modal.Content>
            </Modal>

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
  changeActivePage: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateVisiteComponent);
