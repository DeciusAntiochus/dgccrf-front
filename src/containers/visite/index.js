import React from 'react';
import TrameComponent from './trame';
import { Grid, Card, Container } from 'semantic-ui-react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { EventEmitter } from 'events';
import FileNavigationComponent from '../fileNavigation';
import Photo from './photo/photo';
import Documents from './documents/documents.container';
import { PropTypes } from 'prop-types';
import { changeNameOfPage } from '../navbar/actions';
import { connect } from 'react-redux';

import './trame/visite.css';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    changeNameOfPage: newName => dispatch(changeNameOfPage(newName))
  };
}

class Visite extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._emitter = new EventEmitter();
    this.state = {
      activeIndex: 0,
      activeTab: 0
    };
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.setActiveTab = this.setActiveTab.bind(this);
  }
  componentDidMount() {
    this.props.changeNameOfPage('Visite *Nom de la visite*');
  }

  handleChangeIndex = value => {
    this.setState({
      activeIndex: value
    });
  };

  handleChange = (event, value) => {
    this.setState({
      activeIndex: value
    });
  };

  setActiveTab = index => {
    this.setState({ activeTab: index });
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          height: '100%',

          backgroundColor: '#f2f2f2'
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
                backgroundColor: '#f2f2f2',
                background: 'none',
                borderRadius: 5,
                boxShadow: '0px 0px 0px 0px #f2f2f2'
              }}
            >
              {this.state.activeTab === 0 ? (
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
                      <Tab label="Avant" />
                      <Tab label="Pendant" />
                      <Tab label="Après" />
                    </Tabs>
                  </Grid.Row>
                  <Grid.Row
                    style={{ flex: 10, overflowY: 'auto' }}
                    className="hidescrollbar"
                  >
                    <Grid.Column width={16} centered>
                      <TrameComponent
                        index={this.state.activeIndex}
                        handleChangeIndex={this.handleChangeIndex}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              ) : this.state.activeTab === 1 ? (
                <Photo setActiveTab={this.setActiveTab} />
              ) : (
                <Documents />
              )}
            </Card>
          </Container>
          <FileNavigationComponent
            setActiveTab={this.setActiveTab}
            activeItem={this.state.activeTab}
          />
        </div>
      </div>
    );
  }
}

Visite.propTypes = {
  changeNameOfPage: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Visite);
