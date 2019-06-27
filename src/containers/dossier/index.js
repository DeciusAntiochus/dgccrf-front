import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import InfosComponent from './infos.container';
import VisitesComponent from './visites.container';
import { PropTypes } from 'prop-types';
import { changeNameOfPage, changeBackUrl } from '../navbar/actions';
import { connect } from 'react-redux';
import { Grid, Container } from 'semantic-ui-react';
import { Tabs, Tab } from '@material-ui/core';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    changeNameOfPage: newName => dispatch(changeNameOfPage(newName)),
    changeBackUrl: newBackUrl => dispatch(changeBackUrl(newBackUrl))
  };
}

class MonDossier extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeIndex: 0
    };
  }

  componentDidMount() {
    this.props.changeNameOfPage('Dossier ' + this.props.match.params.id);
    this.props.changeBackUrl('/mes-dossiers');
  }
  render() {
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          backgroundColor: '#f2f2f2'
        }}
      >
        <Container style={{ overflow: 'hidden' }}>
          <Grid
            centered
            style={{
              flex: 1,
              flexDirection: 'column',
              flexWrap: 'nowrap'
            }}
          >
            {/* <Grid.Row style={{ flex: 1 }}>
                  <Header
                    textAlign="center"
                    size="huge"
                    style={{ padding: 20, color: '#3C4586' }}
                  >
                    VISITE
                  </Header>
                </Grid.Row> */}
            <Grid.Row style={{ flex: 1 }}>
              <Tabs
                value={this.state.activeIndex}
                fullWidth
                onChange={this.handleChange}
              >
                <Tab label="Infos" />
                <Tab label="Visites" />
                <Tab label="Documents" />
              </Tabs>
            </Grid.Row>
            <Grid.Row
              style={{ flex: 10, overflowY: 'auto' }}
              className="hidescrollbar"
            >
              <Grid.Column width={16} centered>
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    backgroundColor: 'blue'
                  }}
                >
                  <SwipeableViews
                    slideStyle={{ height: '100%', backgroundColor: 'red' }}
                    slideClassName="hidescrollbar"
                  >
                    <InfosComponent />
                    <VisitesComponent />
                  </SwipeableViews>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

MonDossier.propTypes = {
  changeNameOfPage: PropTypes.func.isRequired,
  changeBackUrl: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonDossier);
