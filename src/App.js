import React from 'react';
import './App.css';
// import PouchDB from 'pouchdb';
import Menu from './containers/menu';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import NavBar from './containers/navbar';
import FileNavigation from './containers/fileNavigation';

// var db = new PouchDB('my_database');
// var remoteCouch = 'http://Admin:pass@127.0.0.1:5984/test';
// var opts = { live: true };
// db.replicate.to(remoteCouch, opts);
// db.replicate.from(remoteCouch, opts);

export class App extends React.Component {
  render() {
    return (
      <Router>
        <NavBar />
        <FileNavigation />
        <Route exact path="/menu" component={Menu} />
        <Redirect to="/menu"></Redirect>
      </Router>
    );
  }
}
