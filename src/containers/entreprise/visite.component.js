import React, { Component } from 'react';
import { Grid, Segment, Responsive, Icon, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class Visite extends Component {
    render() {
        const { visite } = this.props;
        return (
            <Grid.Row style={{ padding: 10, overflow: 'auto' }}>
                <Segment
                    style={{ width: '100%' }}
                // to={this.props.link}
                // icon
                // basic
                // fluid
                // className="menubutton"
                // color={this.props.color}
                // size="massive"
                >
                    <Grid>
                        <Grid.Row
                            verticalAlign="middle"
                            style={{
                                padding: 0,
                                //backgroundColor: !visite.visiteData.new_visite && 'grey'
                            }}
                        >
                            <Grid.Column
                                width={3}
                                style={{
                                    backgroundColor: '#f2f2f2',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%'
                                }}
                            >
                                <Responsive minWidth={600}>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Icon name="search" color="grey" size="large"></Icon>
                                        <div
                                            style={{
                                                borderRadius: '50%',

                                                width: '20px',
                                                height: '20px',

                                                background: 'red',
                                                color: 'white'
                                            }}
                                        >
                                            {visite.controles.length}
                                        </div>
                                    </div>
                                </Responsive>
                                <Responsive maxWidth={599}>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Icon
                                            name="search"
                                            color="grey"
                                            size="small"
                                            style={{ fontSize: '1em' }}
                                        ></Icon>
                                        <div
                                            style={{
                                                borderRadius: '50%',

                                                width: '20px',
                                                height: '20px',

                                                background: 'red',
                                                color: 'white'
                                            }}
                                        >
                                            {visite.controles.length}
                                        </div>
                                    </div>
                                </Responsive>
                            </Grid.Column>
                            <Grid.Column width={7} textAlign="left">
                                <Grid.Row>
                                    <Header as="h3" style={{ fontWeight: 'normal' }}>
                                        {visite.VISITE_AGENT_LIBELLE}
                                    </Header>
                                </Grid.Row>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Grid.Row>
                                    <Header
                                        as="h3"
                                        style={{ fontWeight: 'normal', fontStyle: 'italic' }}
                                    >
                                        {moment(
                                            visite.VISITE_DATE_INTERVENTION
                                        ).format('DD/MM/YYYY')}
                                    </Header>
                                </Grid.Row>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Grid.Row>
        );
    }
}

Visite.propTypes = {
    visite: PropTypes.shape({
        visiteData: PropTypes.shape({
            ETOB_RAISON_SOCIALE: PropTypes.string,
            VISITE_DATE_INTERVENTION: PropTypes.string,
            ETOB_ADR1: PropTypes.string,
            ETOB_ADR2: PropTypes.string,
            ETOB_ADRVILLE: PropTypes.string
        })
    })
};
