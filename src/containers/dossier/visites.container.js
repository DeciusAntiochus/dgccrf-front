import React from 'react';
import { Grid, List, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class VisitesComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visitesList: [
                {
                    enterprise: 'Carrefour',
                    date: new Date(),
                    id: '19920a3dd'
                },
                {
                    enterprise: 'Leclerc',
                    date: new Date(),
                    id: '127226rf3'
                },
                {
                    enterprise: 'Auchan',
                    date: new Date(),
                    id: '127236rdz2'
                }
            ]
        };
    }
    render() {
        return (
            <Grid
                textAlign="center"
                style={{ minHeight: '100vh' }}
                verticalAlign="top"
            >
                <Grid.Row textAlign="center" display="flex">
                    <Grid.Column width={16}>
                        <Link to="/nouvelle-visite">
                            <Icon name="plus" />
                        </Link>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <List divided relaxed style={{ flex: 1 }}>
                            {this.state.visitesList.map(visite => (
                                <List.Item
                                    as={Link}
                                    key={visite.id}
                                    to={'/visite/' + visite.id}
                                >
                                    <List.Content>
                                        <List.Header>{visite.enterprise}</List.Header>
                                        <List.Description>
                                            {moment(visite.date).format('DD/MM/YYYY')}
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                            ))}
                        </List>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}
