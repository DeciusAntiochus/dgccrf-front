import React, { Component } from 'react';
import { Grid, Segment, Responsive, Icon, Header } from 'semantic-ui-react';

import { Link } from 'react-router-dom';
import moment from 'moment';

export default class Visite extends Component {
  render() {
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
          <Link to={'visite/' + this.props.visite.VISITE_IDENT}>
            <Grid>
              <Grid.Row verticalAlign="middle" style={{ padding: 0 }}>
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
                    <Icon name="search" color="grey" size="large"></Icon>
                    <div style={{ backgroundColor: 'red' }}></div>
                  </Responsive>
                  <Responsive maxWidth={599}>
                    <Icon name="search" color="grey" size="small"></Icon>
                    <Icon name="circle" color="red" size="small"></Icon>
                  </Responsive>
                </Grid.Column>
                <Grid.Column width={7} textAlign="left">
                  <Grid.Row>
                    <Header
                      as="h3"
                      style={{ color: 'grey', overflowWrap: 'break-word' }}
                    >
                      {this.props.visite.controles[0].ETOB_RAISON_SOCIALE}
                    </Header>
                  </Grid.Row>
                  <Grid.Row>
                    <Header as="h6" style={{ fontWeight: 'normal' }}>
                      {this.props.visite.controles[0].ETOB_NOM_RESPONSABLE}
                    </Header>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Grid.Row>
                    <Header as="h6" style={{ fontWeight: 'normal' }}>
                      {/* {this.props.dossier.ACDG_LIBELLE} */}
                    </Header>
                  </Grid.Row>
                  <Grid.Row>
                    <Responsive minWidth={600}>
                      <Header as="h4" style={{ overflowWrap: 'break-word' }}>
                        {this.props.visite.controles[0].ETOB_ADR1}{' '}
                        {this.props.visite.controles[0].ETOB_ADR2}{' '}
                        {this.props.visite.controles[0].ETOB_ADR3} -{' '}
                        {this.props.visite.controles[0].ETOB_ADRVILLE}
                      </Header>
                    </Responsive>
                    <Responsive
                      maxWidth={600}
                      style={{ overflowWrap: 'break-word' }}
                    >
                      <Header as="h5">
                        {this.props.visite.controles[0].ETOB_ADR1}{' '}
                        {this.props.visite.controles[0].ETOB_ADR2}{' '}
                        {this.props.visite.controles[0].ETOB_ADR3} -{' '}
                        {this.props.visite.controles[0].ETOB_ADRVILLE}
                      </Header>
                    </Responsive>
                  </Grid.Row>
                  <Grid.Row>
                    <Header
                      as="h4"
                      style={{ fontWeight: 'normal', fontStyle: 'italic' }}
                    >
                      {moment(
                        this.props.visite.controles[0].VISITE_DATE_INTERVENTION
                      ).format('DD/MM/YYYY')}
                    </Header>
                  </Grid.Row>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Link>
        </Segment>
      </Grid.Row>
    );
  }
}
