import React, { Component } from 'react';

import { documents } from './documents.faker';

export default class Documents extends Component {
  render() {
    console.log(documents);
    return (
      <div style={{ display: 'flex' }}>
        {documents.map((document, i) => (
          <div key={i}>
            <img src={document}></img>
          </div>
        ))}
      </div>
    );
  }
}
