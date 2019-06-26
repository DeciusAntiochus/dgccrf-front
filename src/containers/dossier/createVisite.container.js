/* eslint-disable no-undef */
import React from 'react';
import { Form, Grid, GridRow, GridColumn, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { changeNameOfPage } from '../navbar/actions';
import { connect } from 'react-redux';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    changeNameOfPage: newName => dispatch(changeNameOfPage(newName))
  };
}

class CreateVisiteComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actionList: ['123', '342', '1112'],
      trameList: ['Trame 1', 'Trame 2'],
      addedActions: [undefined]
    };
  }
  componentDidMount() {
    this.props.changeNameOfPage('Création de visite');
  }

  render() {
    return (
      <Grid style={{ margin: 'auto', textAlign: 'left' }} centered>
        <GridRow>
          <GridColumn width={14}>
            <Form onSubmit={() => alert(this.state)}>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Etablissement"
                  placeholder="Etablissement"
                  onChange={e => this.setState({ enterpise: e.target.value })}
                />

                <Form.Input
                  fluid
                  label="SIRET"
                  placeholder="SIRET"
                  onChange={e => this.setState({ siret: e.target.value })}
                />
              </Form.Group>

              <Grid style={{ width: '100%', margin: 0 }}>
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
              </div>

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

              <Form.Button>Valider</Form.Button>
            </Form>
          </GridColumn>
        </GridRow>
      </Grid>
    );
  }
}

CreateVisiteComponent.propTypes = {
  changeNameOfPage: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateVisiteComponent);
