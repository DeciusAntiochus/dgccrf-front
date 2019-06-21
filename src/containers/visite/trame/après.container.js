import React, { Component } from 'react';

import TrameComponent from './trame.container';

export default class Apres extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      taskList: [
        {
          title: 'Saisir dans Sora'.toUpperCase(),
          status: 'done',
          documentToFill: null
        },
        {
          title: 'Envoyer un mail'.toUpperCase(),
          status: 'problem',
          documentToFill: 'PVprelevement.pdf'
        }
      ]
    };
  }

  render() {
    return <TrameComponent taskList={this.state.taskList} />;
  }
}
