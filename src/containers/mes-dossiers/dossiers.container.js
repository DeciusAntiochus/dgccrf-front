import React from 'react';
import { Grid } from 'semantic-ui-react';
import MenuButton from '../../components/menuButton.component';
import dossierService from '../../services/PouchDB.service';

export default class DossierComponent extends React.Component {
  constructor(props) {
    super(props);
    dossierService.getAllDocs().then(console.log);
    dossierService.onChanges(() => dossierService.getAllDocs().then(console.log))
    this.state = {
      taskList: [{
        name: "TN 20131441",
        id: "19920a3dd"
      },
      {
        name: "TR 20145323",
        id: "127226rf3"
      }]
    }
  }
  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="top"
      >
        <Grid.Column style={{ maxWidth: "90vw", margin: "1em" }}>

          {this.state.taskList.map(task => (
            <MenuButton key={task.id} name={task.name} link={"dossier/" + task.id} color="white" />
          ))}

        </Grid.Column>
      </Grid >

    );
  }
}
