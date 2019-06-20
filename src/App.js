import React from 'react';
import './App.css';
import PouchDB from 'pouchdb';
import Menu from './containers/menu';
import Dossiers from './containers/mes-dossiers';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import MonDossier from './containers/dossier';
import MaVisite from './containers/visite';

var db = new PouchDB('my_database');
var remoteCouch = 'http://Admin:pass@127.0.0.1:5984/test';
var opts = { live: true };
db.replicate.to(remoteCouch, opts);
db.replicate.from(remoteCouch, opts);

export class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/mes-dossiers" component={Dossiers} />
        <Route exact path="/dossier/:id" component={MonDossier} />
        <Route exact path="/visite/:id" component={MaVisite} />
        {/* <Redirect to="/menu"></Redirect> */}
      </Router>

    );
  }
}
