import React from 'react';
import { Form, Grid, GridRow, GridColumn, Icon } from 'semantic-ui-react';

export default class TrameCreationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskList: []
        }
    }

    render() {
        return (
            <Grid centered style={{ width: "100%", height: "80%", margin: 0, marginTop: "2em" }}>
                <div style={{ width: "80%", height: "100%", padding: "2em", border: '1px solid black' }}>
                    <div style={{ height: "90%", overflowY: "auto" }} >
                        <GridRow >
                            <h2>
                                Mes Taches
                        </h2>
                        </GridRow>

                        {
                            this.state.taskList.map((taskItem, taskIndex) => (

                                <GridRow key={taskItem}
                                    style={{ width: "100%", display: "flex", padding: "0", margin: "1em" }}>
                                    <GridColumn width={14} style={{ width: "100%", margin: 0, padding: 0 }} >

                                        <Form.Input placeholder="Intitulé"
                                            style={{ width: "100%" }} onChange={(e, { value }) => {
                                                let newTasks = this.state.taskList.map((el, i) => i === taskIndex ? { ...el, title: value } : el);
                                                this.setState({ taskList: newTasks })
                                            }}
                                        />

                                    </GridColumn>
                                    <GridColumn width={1} style={{ padding: 0, marginLeft: "0" }}
                                    >

                                        <Icon color="red" name="minus" size="big"
                                            style={{ cursor: "pointer", verticalAlign: "top", padding: "0.2em" }}
                                            width={1}

                                            onClick={() => {
                                                let newTasks = this.state.taskList.filter((el, i) => i !== taskIndex);
                                                this.setState({ taskList: newTasks })
                                            }} />

                                    </GridColumn>
                                </GridRow>
                            )
                            )}
                    </div>
                    <Grid.Row
                        height={1}
                        style={{ width: "100%", textAlign: "center", marginTop: "0.5em", cursor: "pointer" }}
                        onClick={() => {
                            let newTasks = this.state.taskList.map(el => el);
                            newTasks.push({ title: undefined });
                            this.setState({ taskList: newTasks })
                        }}>

                        <Icon name="circle plus" size="big" color="green" />

                    </Grid.Row>
                </div>
            </Grid>
        )
    }
}