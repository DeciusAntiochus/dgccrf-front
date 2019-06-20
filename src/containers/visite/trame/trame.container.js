import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class DossierComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskList: [{
                title: "Contrôler les prix",
                status: "done",
                documentToFill: null
            },
            {
                title: "PV de prélévement",
                status: "problem",
                documentToFill: "PVprelevement.pdf"
            },
            {
                title: "PV de déclaration",
                status: "on-progress",
                documentToFill: "PVdeclaration.pdf"
            }]
        }
    }

    getIconFromStatus(status) {
        return {
            "done": <List.Icon name="check" color="green" size='large' verticalAlign='middle' />,
            "on-progress": <List.Icon name="circle" color="orange" size='large' verticalAlign='middle' />,
            "problem": <List.Icon name="warning circle" color="red" size='large' verticalAlign='middle' />
        }[status]
    }

    render() {
        return (

            <Grid.Column width={15} style={{ margin: "1em", overflow: "auto", border: "solid 1px black" }}>

                <List divided relaxed
                    style={{ padding: "1em", margin: "1em", textAlign: "left" }}
                >
                    {this.state.taskList.map(task => (
                        <List.Item as={Link} key={task.title} to={"visite/" + task.id} >
                            {this.getIconFromStatus(task.status)}
                            <List.Content>
                                <List.Header >{task.title}</List.Header>
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
            </Grid.Column>

        );
    }
}
