import React from 'react';
import './App.css';
<<<<<<< HEAD
import {AddDocs} from './AddDocs';

export class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: '',
      validated: false
    };
  }

  render(){
    return (
      
        ! this.state.validated ?
        <div>
          <input onChange = {(e)=>this.setState({user:e.target.value})} placeholder="User"/> 
          <button onClick = {(e)=>this.setState({validated:true})}>Valider</button>
        </div>
        :<AddDocs user={this.state.user} />
    )
  }
}

=======
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
>>>>>>> 3be8429e973c5dbfac173014c5140122d6950526
