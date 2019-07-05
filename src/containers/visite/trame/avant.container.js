import React, { Component } from 'react';

import TrameComponent from './trame.container';

export default class Avant extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      taskList: [
        {
          title: 'Vérifier les contrôles précédents'.toUpperCase(),
          status: 'done',
          documentToFill: null
        },
        {
          title: 'Vérifier les contrôles précédents'.toUpperCase(),
          status: 'done',
          documentToFill: null
        },
        {
          title: 'Vérifier les contrôles précédents'.toUpperCase(),
          status: 'done',
          documentToFill: null
        },
        {
          title: 'Saisir son emploi du temps dans Agat'.toUpperCase(),
          status: 'problem',
          documentToFill: 'PVprelevement.pdf'
        },

        {
          title: 'Saisir son emploi du temps dans Agat'.toUpperCase(),
          status: 'problem',
          documentToFill: 'PVprelevement.pdf'
        },
        {
          title: 'Vérifier les contrôles précédents'.toUpperCase(),
          status: 'done',
          documentToFill: null
        },
        {
          title: 'Saisir son emploi du temps dans Agat'.toUpperCase(),
          status: 'problem',
          documentToFill: 'PVprelevement.pdf'
        },
        {
          title: 'Vérifier les contrôles précédents'.toUpperCase(),
          status: 'done',
          documentToFill: null
        },
        {
          title: 'Saisir son emploi du temps dans Agat'.toUpperCase(),
          status: 'problem',
          documentToFill: 'PVprelevement.pdf'
        },
        {
          title: 'Vérifier les contrôles précédents'.toUpperCase(),
          status: 'done',
          documentToFill: null
        },
        {
          title: 'Saisir son emploi du temps dans Agat'.toUpperCase(),
          status: 'problem',
          documentToFill: 'PVprelevement.pdf'
        },
        {
          title: 'Saisir son emploi du temps dans Agat'.toUpperCase(),
          status: 'problem',
          documentToFill: 'PVprelevement.pdf'
        },
        {
          title: 'Saisir son emploi du temps dans Agat'.toUpperCase(),
          status: 'problem',
          documentToFill: 'PVprelevement.pdf'
        },
        {
          title: 'Saisir son emploi du temps dans Agat'.toUpperCase(),
          status: 'problem',
          documentToFill: 'PVprelevement.pdf'
        },
        {
          title: 'Saisir son emploi du temps dans Agat'.toUpperCase(),
          status: 'problem',
          documentToFill: 'PVprelevement.pdf'
        },
        {
          title: 'Saisir son emploi du temps dans Agat'.toUpperCase(),
          status: 'problem',
          documentToFill: 'PVprelevement.pdf'
        },
        {
          title: 'Dernier'.toUpperCase(),
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
