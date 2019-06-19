import React from 'react';
import './App.css';
import PouchDB from 'pouchdb';


export class AddDocs extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      text : '',
      list:[]
    }

    this.db = new PouchDB('my_database');
    var remoteCouch = 'http://Admin:pass@172.17.64.137:5984/test';

    this.db.changes({
      since: 'now',
      live: true
    }).on('change', this.updateTodos.bind(this));

    var opts = {
        live: true,
        retry:true, 
        filter: 'filter/by_agent',
        query_params: { "agent": this.props.user },
    };
    this.db.replicate.to(remoteCouch, {live:true,retry:true}, console.log);
    this.db.replicate.from(remoteCouch, opts, console.log);
    this.updateTodos();

    this.updateTodos = this.updateTodos.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }


  updateTodos(){
    this.db.allDocs({include_docs: true, descending: true}, (err, doc) => {
      this.setState({list:doc.rows.map(row=>row.doc)});
    });
  }

  addTodo(text,user) {
    var todo = {
      _id: new Date().toISOString(),
      text: text,
      user: user
    };
    this.db.put(todo, function callback(err, result) {
      if (!err) {
        console.log('Successfully posted a todo!');
      }
    });
  }
  
  render() {
    return (
      <div>
        <input onChange = {(e)=>this.setState({text:e.target.value})} placeholder="Text"/> 
        <button onClick={()=>this.addTodo(this.state.text,this.props.user)}>Ajouter</button>
        <button onClick={()=>this.getTodos()}>refresh</button>
        <div>
          {JSON.stringify(this.state.list)}
        </div>
      </div>
    );
  }
}

