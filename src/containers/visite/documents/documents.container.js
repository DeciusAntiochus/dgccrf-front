import React, { Component } from 'react';

import { documents } from './documents.faker';

import _ from 'lodash';

export default class Documents extends Component {
  render() {
    let docs = Array(5).fill(documents[0]);
    return (
      <div
        style={{
          display: 'flex',

          flexWrap: 'wrap'
        }}
      >
        {docs.map((document, i) => (
          <div key={i}>
            <img src={document}></img>
          </div>
        ))}
      </div>
    );
  }
}
