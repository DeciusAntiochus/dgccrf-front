import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Container, Dropdown, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router/esm/react-router';

class NavBarComponent extends React.Component {
  render() {
    return (
      <Menu fixed="top" color="blue" inverted>
        <Container>
          <Menu.Item as="a" onClick={() => this.props.history.goBack()}>
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

NavBarComponent.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func
  })
};

export default withRouter(NavBarComponent);
