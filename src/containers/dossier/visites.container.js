import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class VisitesComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visitesList: [{
                enterprise: "Carrefour",
                date: new Date(),
                id: "19920a3dd"
            },
            {
                enterprise: "Leclerc",
                date: new Date(),
                id: "127226rf3"
            },
            {
                enterprise: "Auchan",
                date: new Date(),
                id: "127236rdz2"
            }]
        }
    }
    render() {
        return (
            <Grid
                textAlign="center"
                style={{ height: '100vh' }}
                verticalAlign="top"
            >
                <Grid.Column style={{ maxWidth: "90vw", margin: "1em" }}>
                    <List divided relaxed>
                        {this.state.visitesList.map(visite => (
                            <List.Item as={Link} key={visite.id} to={"/visite/" + visite.id} >
                                <List.Content>
                                    <List.Header >{visite.enterprise}</List.Header>
                                    <List.Description >{moment(visite.date).format("DD/MM/YYYY")}</List.Description>
                                </List.Content>
                            </List.Item>
                        ))}
                    </List>


                </Grid.Column>
            </Grid >

        );
    }
}