import React from 'react';
import logo from './logo.svg';
import './App.css';
import PouchDB from 'pouchdb';
var db = new PouchDB('my_database');
var remoteCouch = 'http://Admin:pass@127.0.0.1:5984/test';
var opts = { live: true };
db.replicate.to(remoteCouch, opts, console.log);
db.replicate.from(remoteCouch, opts, console.log);

export class App extends React.Component {
  render() {
    return <div></div>;
  }
}
