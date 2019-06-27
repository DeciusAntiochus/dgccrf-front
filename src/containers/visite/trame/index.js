import React from 'react';

import Avant from './avant.container';
import Pendant from './pendant.container';
import Apres from './après.container';
import SwipeableViews from 'react-swipeable-views';

import './visite.css';

export default class Trame extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeIndex: 0
    };
    this.getActiveIndex = this.getActiveIndex.bind(this);
  }

  getActiveIndex(e) {
    this.setState({ activeIndex: e });
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <SwipeableViews
          className="hidescrollbar"
          index={this.props.index}
          onChangeIndex={this.props.handleChangeIndex}
          slideStyle={{ height: '60vh' }}
          slideClassName="hidescrollbar"
        >
          <Avant />
          <Pendant />
          <Apres />
        </SwipeableViews>
      </div>
    );
  }
}
