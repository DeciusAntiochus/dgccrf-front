import React from 'react';
import './App.css';
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

