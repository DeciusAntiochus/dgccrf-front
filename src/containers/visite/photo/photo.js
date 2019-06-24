import React, { Component } from 'react';

import Camera, { FACING_MODES } from 'react-html5-camera-photo';

import 'react-html5-camera-photo/build/css/index.css';

import './photo.css';

import styled, { keyframes } from 'styled-components';
import { slideInUp } from 'react-animations';

import FullScreen from 'react-full-screen';

import { Spinner } from 'react-activity';

import 'react-activity/dist/react-activity.css';
import { Icon } from 'semantic-ui-react';
import { Button } from '@material-ui/core';

const SlideAnimation = keyframes`${slideInUp}`;

const SlideDiv = styled.div`
  animation: 1s ${SlideAnimation};
`;

export default class Photo extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isFull: false,
      loaded: false
    };
  }
  goFull = () => {
    this.setState({ isFull: !this.state.isFull });
  };

  close = () => {
    this.props.setActiveTab(0);
    this.goFull();
  };

  componentDidMount() {
    this.goFull();
  }

  loaded = () => {
    this.setState({ loaded: true });
  };

  onTakePhoto(dataUri) {
    // Do stuff with the dataUri photo...
    console.log(dataUri);
  }

  render() {
    return (
      <div style={{ backgroundColor: 'black' }}>
        {!this.state.loaded && <Spinner />}
        <br />
        <FullScreen
          enabled={this.state.isFull}
          onChange={isFull => this.setState({ isFull })}
        >
          {this.state.isFull && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Camera
                onCameraStart={() => this.loaded()}
                idealFacingMode={FACING_MODES.ENVIRONMENT}
                isImageMirror={false}
                onTakePhoto={dataUri => {
                  this.onTakePhoto(dataUri);
                  this.close();
                }}
              />
              <div
                style={{
                  marginTop: 50,

                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Button
                  size="large"
                  color="secondary"
                  variant="outlined"
                  onClick={() => this.close()}
                >
                  Fermer
                </Button>
              </div>
            </div>
          )}
        </FullScreen>
      </div>
    );
  }
}
