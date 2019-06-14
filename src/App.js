import React from 'react';
import logo from './logo.svg';
import './App.css';
import PouchDB from 'pouchdb';
var db = new PouchDB('my_database');

export class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      text : '',
      list:[]
    }
    db.changes({
      since: 'now',
      live: true
    }).on('change', this.updateTodos.bind(this));
  }

  updateTodos(){
    db.allDocs({include_docs: true, descending: true}, (err, doc) => {
      this.setState({list:doc.rows});
    });
  }

  addTodo(text) {
    var todo = {
      _id: new Date().toISOString(),
      title: text,
      completed: false
    };
    db.put(todo, function callback(err, result) {
      if (!err) {
        console.log('Successfully posted a todo!');
      }
    });
  }

  getTodos(){

  }
  
  render() {
    return (
      <div>
        <input onChange = {(e)=>this.setState({text:e.target.value})} /> 
        <button onClick={()=>this.addTodo(this.state.text)}>Ajouter</button>
        <button onClick={()=>this.getTodos()}>refresh</button>
        <div>
          {JSON.stringify(this.state.list)}
        </div>
      </div>
    );
  }
}


