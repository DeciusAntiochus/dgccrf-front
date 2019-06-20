import React from 'react';
import { Menu, Icon, Button } from 'semantic-ui-react';

export default class FileNavigationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home'
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    return (
      <Menu fixed="bottom" color="grey" inverted widths={3} icon="labeled">
        <Menu.Item
          name="Trame"
          active={this.state.activeItem === 'home'}
          onClick={this.handleItemClick}
        >
          <Icon name="list ul" />
          Trame
        </Menu.Item>
        <Button
          as={Menu.Item}
          name="Photo"
          circular
          active={this.state.activeItem === 'messages'}
          onClick={this.handleItemClick}
        >
          <Icon name="photo" /> Photo{' '}
        </Button>
        <Menu.Item
          name="Documents"
          active={this.state.activeItem === 'friends'}
          onClick={this.handleItemClick}
        >
          <Icon name="file" /> Documents{' '}
        </Menu.Item>
      </Menu>
    );
  }
}
