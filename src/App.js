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
import NavBar from './containers/navbar';
import EntrepriseView from './containers/entreprise';

import './containers/navbar/navbar.css';

export class App extends React.Component {
  render() {
    return (
      <div
        style={{
          height: '100vh',
          backgroundColor: '#f2f2f2',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Router>
          <NavBar />
          <div
            className="marginNavbar"
            style={{ position: 'absolute', height: '100%', width: '100%' }}
          >
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
          </div>
        </Router>
      </div>
    );
  }
}
