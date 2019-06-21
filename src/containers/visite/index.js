import React from 'react';
import TrameComponent from './trame';
import { Grid, Card, Header, Container } from 'semantic-ui-react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { EventEmitter } from 'events';

export default class Visite extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._emitter = new EventEmitter();
        this.state = {
            activeIndex: 0
        };
        this.handleChangeIndex = this.handleChangeIndex.bind(this);
    }

    handleChange = (event, value) => {
        this.setState({
            activeIndex: value
        });
    };

    handleChangeIndex = index => {
        this.setState({
            activeIndex: index
        });
    };

    render() {

        return (
            <div
                style={{
                    display: 'flex',
                    height: '100%',
                    backgroundColor: '#f2f2f2',
                    padding: 20
                }}
            >
                <div
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        textAlign: 'center'
                    }}
                >
                    <Container>
                        <Card
                            fluid
                            style={{
                                height: '90vh',
                                backgroundColor: '#f2f2f2',
                                borderRadius: 5,
                                boxShadow: '0px 0px 0px 0px #f2f2f2'
                            }}
                        >
                            <Grid
                                centered
                                style={{
                                    flex: 1,
                                    flexDirection: 'column'
                                }}
                            >
                                <Grid.Row style={{ flex: 1 }}>
                                    <Header
                                        textAlign="center"
                                        size="huge"
                                        style={{ padding: 20, color: '#3C4586' }}
                                    >
                                        VISITE
                  </Header>
                                </Grid.Row>
                                <Grid.Row style={{ flex: 1 }}>
                                    <Tabs
                                        value={this.state.activeIndex}
                                        fullWidth
                                        onChange={this.handleChange}
                                    >
                                        <Tab label="Avant" />
                                        <Tab label="Pendant" />
                                        <Tab label="Après" />
                                    </Tabs>
                                </Grid.Row>
                                <Grid.Row style={{ flex: 10 }}>
                                    <Grid.Column width={16} centered>
                                        <TrameComponent
                                            index={this.state.activeIndex}
                                            handleChangeIndex={this.handleChangeIndex}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Card>
                    </Container>
                </div>
            </div>
        );
    }
}
