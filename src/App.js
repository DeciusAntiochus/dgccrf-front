import React from 'react';
import './App.css';
// import PouchDB from 'pouchdb';
import Menu from './containers/menu';
import Dossiers from './containers/mes-dossiers';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect, Switch } from 'react-router-dom';
import MonDossier from './containers/dossier';
import CreateVisite from './containers/dossier/createVisite.container';
import CreateTrame from './containers/dossier/trameCreation.container';
import MaVisite from './containers/visite';


// var db = new PouchDB('dbdgccrf');
// var remoteCouch = 'http://Admin:password@172.17.64.136:5984/test';
// const opts = {
//   live: true
// };
// db.replicate.to(remoteCouch, opts);
// db.replicate.from(remoteCouch, opts);
import NavBar from './containers/navbar';
import EntrepriseView from './containers/entreprise';

// var db = new PouchDB('my_database');
// var remoteCouch = 'http://Admin:pass@127.0.0.1:5984/test';
// var opts = { live: true };
// db.replicate.to(remoteCouch, opts);
// db.replicate.from(remoteCouch, opts);

export class App extends React.Component {
  render() {
    return (
      <div style={{ overflow: 'hidden', height: '100vh' }}>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/entreprises" component={EntrepriseView} />
            <Route exact path="/menu" component={Menu} />
            <Route exact path="/mes-dossiers" component={Dossiers} />
            <Route exact path="/dossier/:id" component={MonDossier} />
            <Route exact path="/visite/:id" component={MaVisite} />
            <Route exact path="/nouvelle-visite" component={CreateVisite} />
            <Route exact path="/nouvelle-trame" component={CreateTrame} />
            <Route component={() => <Redirect to="/menu" />} />
          </Switch>
        </Router>
      </div >
    );
  }
}
