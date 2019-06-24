import React from 'react';
import { Menu, Icon, Button, Grid } from 'semantic-ui-react';

export default class FileNavigationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'trame'
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    return (
      <Grid textAlign="center">
        <Menu
          style={{ zIndex: '0', backgroundColor: 'grey' }}
          fixed="bottom"
          fluid
          inverted
          widths={2}
          icon="labeled"
        >
          <Menu.Item
            name="trame"
            color="blue"
            active={this.state.activeItem === 'trame'}
            onClick={this.handleItemClick}
          >
            <Icon name="list ul" />
            Trame
          </Menu.Item>
          <Menu.Item
            name="documents"
            color="blue"
            active={this.state.activeItem === 'documents'}
            onClick={this.handleItemClick}
          >
            <Icon name="file" /> Documents{' '}
          </Menu.Item>
        </Menu>
        <Button
          name="photo"
          style={{
            zIndex: '1',
            bottom: '0',
            position: 'absolute',
            marginBottom: '-12.345px'
          }}
          className="photoButton"
          circular
          size="massive"
          color={this.state.activeItem === 'photo' ? 'blue' : 'grey'}
          onClick={this.handleItemClick}
        >
          <div style={{ flexDirection: 'column' }}>
            <Icon name="photo" />
            <p>Photo</p>
          </div>
        </Button>
      </Grid>
    );
  }
}
