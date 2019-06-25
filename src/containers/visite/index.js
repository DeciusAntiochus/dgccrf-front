import React from 'react';
import TrameComponent from './trame';
import { Grid, Card, Container } from 'semantic-ui-react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { EventEmitter } from 'events';

import FileNavigationComponent from '../fileNavigation';
import Photo from './photo/photo';
import Documents from './documents/documents.container';

export default class Visite extends React.Component {
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

  handleChangeIndex = value => {
    console.log(value);
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
    console.log(index);
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
                height: '80vh',
                backgroundColor: '#f2f2f2',
                borderRadius: 5,
                boxShadow: '0px 0px 0px 0px #f2f2f2'
              }}
            >
              {this.state.activeTab === 0 ? (
                <Grid
                  centered
                  style={{
                    flex: 1,
                    flexDirection: 'column'
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
                  <Grid.Row style={{ flex: 10 }}>
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
