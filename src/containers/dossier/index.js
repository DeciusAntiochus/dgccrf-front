import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import InfosComponent from './infos.container';
import VisitesComponent from './visites.container';
import { PropTypes } from 'prop-types';
import {
  changeNameOfPage,
  changeBackUrl,
  changeActivePage
} from '../navbar/actions';
import { connect } from 'react-redux';
import { Grid, Container } from 'semantic-ui-react';
import { Tabs, Tab } from '@material-ui/core';
import './swipeable.css';
import dossierService from '../../services/dossier.service';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    changeNameOfPage: newName => dispatch(changeNameOfPage(newName)),
    changeBackUrl: () => dispatch(changeBackUrl('/mes-dossiers')),
    changeActivePage: value => dispatch(changeActivePage('mesDossiers', value))
  };
}

class MonDossier extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeIndex: 0,
      dossier: null
    };
  }

  handleChange = (event, value) => {
    this.setState({
      activeIndex: value
    });
  };
  handleChangeIndex = value => {
    this.setState({
      activeIndex: value
    });
  };

  loadDossier(dossier) {
    this.setState({ dossier: dossier });
  }

  componentDidMount() {
    this.props.changeNameOfPage('Dossier ' + this.props.match.params.id);
    this.props.changeBackUrl();
    this.props.changeActivePage('/dossier/' + this.props.match.params.id);
    dossierService
      .getDossierById(this.props.match.params.id)
      .then(res => this.loadDossier(res));
  }
  render() {
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          width: '100%',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container
          style={{
            overflow: 'hidden',
            height: '100%',
            width: '100%'
          }}
        >
          <Grid
            centered
            style={{
              height: '100%',
              width: '100%',
              flex: 1,
              flexDirection: 'column',
              flexWrap: 'nowrap',
              overflow: 'hidden'
            }}
          >
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
              <Grid.Column width={16}>
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',

                    overflow: 'hidden'
                  }}
                >
                  <SwipeableViews
                    style={{ height: '100%' }}
                    slideStyle={{ height: '100%' }}
                    slideClassName="hidescrollbar"
                    index={this.state.activeIndex}
                    onChangeIndex={this.handleChangeIndex}
                  >
                    <InfosComponent dossier={this.state.dossier} />
                    <VisitesComponent {...this.props} />
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
  changeBackUrl: PropTypes.func.isRequired,
  changeActivePage: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number
    })
  })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonDossier);
