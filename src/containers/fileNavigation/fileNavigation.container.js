import React from 'react';
import { Menu } from 'semantic-ui-react';

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
      <Menu color="grey" inverted widths={3}>
        <Menu.Item
          name="Trame"
          active={this.state.activeItem === 'home'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Photo"
          active={this.state.activeItem === 'messages'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Documents"
          active={this.state.activeItem === 'friends'}
          onClick={this.handleItemClick}
        />
      </Menu>
    );
  }
}
