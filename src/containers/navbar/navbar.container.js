import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Icon, Responsive } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router/esm/react-router';

class NavBarComponent extends React.Component {
  render() {
    return (
      <div>
        <Menu
          as={Responsive}
          minWidth={500}
          fixed="top"
          style={{ position: 'relative', backgroundColor: '#3C4586' }}
          inverted
          icon="labeled"
        >
          <Menu.Item as="a" onClick={() => this.props.history.goBack()}>
            <Icon style={{ margin: '0' }} name="angle left" />
            Retour
          </Menu.Item>
          <Menu.Item as={Link} to="/mes-dossiers">
            <Icon name="file" /> Mes Dossiers
          </Menu.Item>
          <Menu.Item style={{ flex: '1', verticalAlign: 'middle' }}>
            <p style={{ fontSize: '20px' }}>Nom de la page</p>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item as={Link} to="/entreprises">
              <Icon name="building outline" />
              Entreprises
            </Menu.Item>
            <Menu.Item as={Link} to="/preferences">
              <Icon name="setting"></Icon>Préférences
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Menu
          as={Responsive}
          maxWidth={500}
          fixed="top"
          style={{ position: 'relative', backgroundColor: '#3C4586' }}
          color="blue"
          inverted
          size="large"
        >
          <Menu.Item as="a" onClick={() => this.props.history.goBack()}>
            <Icon style={{ margin: '0' }} name="angle left" />
          </Menu.Item>
          <Menu.Item style={{ flex: '1' }}>
            <p style={{ flex: '1', textAlign: 'center' }}>Nom de la page</p>
          </Menu.Item>
          <Menu.Menu position="right">
            <Dropdown item simple icon="list layout">
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
        </Menu>
      </div>
    );
  }
}

NavBarComponent.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func
  })
};

export default withRouter(NavBarComponent);
