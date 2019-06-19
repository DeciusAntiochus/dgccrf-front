import React from 'react';
import { Grid } from 'semantic-ui-react';
import MenuButtonComponent from '../../components/menuButton.component';

export default class MenuComponent extends React.Component {
  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
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
      </Grid>
    );
  }
}
