import React from 'react';
import { Menu, Container, Dropdown, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class NavBarComponent extends React.Component {
  render() {
    return (
      <Menu fixed="top" color="blue" inverted>
        <Container>
          <Menu.Item as="a">
            <Icon name="angle left" />
            Retour
          </Menu.Item>
          <Menu.Menu position="right">
            <Dropdown item simple text="Menu">
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/mes-dossiers">
                  <Icon name="file" /> Mes Dossiers
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/entreprises">
                  <Icon name="building outline" />
                  Entreprises
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/preferences">
                  <Icon name="setting"></Icon>Préférences
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}
