import React from 'react';
import { Grid } from 'semantic-ui-react';
import MenuButtonComponent from '../../components/menuButton.component';

export default class MenuComponent extends React.Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Grid style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={3}></Grid.Column>
            <Grid.Column width={10}>
              <MenuButtonComponent
                link="/mes-dossiers"
                name="Mes Dossiers"
                color="teal"
                icon="file"
              />
              <MenuButtonComponent
                link="/entreprises"
                name="Entreprises"
                color="blue"
                icon="building outline"
              />
              <MenuButtonComponent
                link="/preferences"
                name="Préférences"
                color="violet"
                icon="setting"
              />
            </Grid.Column>
            <Grid.Column width={3}></Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
