import React from 'react';
import { Form, Grid, GridRow, GridColumn, Icon, Label } from 'semantic-ui-react';

export default class CreateVisiteComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actionList: ["123", "342", "1112"],
            addedActions: [undefined]
        }
    }

    render() {
        return (
            <Grid>
                <GridRow centered>
                    <GridColumn width={10} >
                        <Form onSubmit={() => console.log(this.state)} >

                            <Form.Group widths="equal">
                                <Form.Input fluid label="Etablissement" placeholder="Etablissement"
                                    onChange={(e) => this.setState({ enterpise: e.target.value })} />
                                <Form.Input fluid label="SIRET" placeholder="SIRET"
                                    onChange={(e) => this.setState({ siret: e.target.value })} />
                            </Form.Group>

                            {
                                this.state.addedActions.map((addedAction, actionIndex) => (
                                    <Form.Group key={addedAction} style={{ display: "flex", alignItems: "center" }} >
                                        <Form.Select fluid placeholder="Action" label={actionIndex == 0 ? "Actions associées" : undefined}
                                            options={this.state.actionList.map(action => ({ key: action, text: action, value: action }))}
                                            width={15}
                                            value={this.state.addedActions[actionIndex]}
                                            onChange={(e, { value }) => {
                                                let newActions = this.state.addedActions.map((el, i) => i === actionIndex ? value : el);
                                                this.setState({ addedActions: newActions })
                                            }} />
                                        {actionIndex !== 0 &&
                                            <Icon color="red" name="minus" size="big" style={{ cursor: "pointer" }}
                                                verticalAlign="bottom"
                                                onClick={() => {
                                                    let newActions = this.state.addedActions.filter((el, i) => i !== actionIndex);
                                                    this.setState({ addedActions: newActions })
                                                }} />}
                                    </Form.Group>
                                )
                                )}
                            <div style={{ width: "100%", textAlign: "center" }}>
                                <Icon name="circle plus" size="big" color="green"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        let newActions = this.state.addedActions.map(el => el);
                                        newActions.push(undefined);
                                        this.setState({ addedActions: newActions })
                                    }} />
                            </div>

                            <Form.Button>Valider</Form.Button>
                        </Form >
                    </GridColumn>
                </GridRow>
            </Grid >
        );
    }
}