import React, { Component } from 'react';

import TrameComponent from './trame.container';

export default class Pendant extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      taskList: [
        {
          title: 'Contrôler les prix'.toUpperCase(),
          status: 'done',
          documentToFill: null
        },
        {
          title: 'PV de prélévement'.toUpperCase(),
          status: 'problem',
          documentToFill: 'PVprelevement.pdf'
        },
        {
          title: 'PV de déclaration'.toUpperCase(),
          status: 'on-progress',
          documentToFill: 'PVdeclaration.pdf'
        }
      ]
    };
  }

  render() {
    return <TrameComponent taskList={this.state.taskList} />;
  }
}
