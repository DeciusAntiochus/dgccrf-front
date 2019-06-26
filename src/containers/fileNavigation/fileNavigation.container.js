import React from 'react';
import { Menu, Icon, Button, Grid } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';

class FileNavigationComponent extends React.Component {
  constructor(props) {
    super(props);
  }

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
            style={{ zIndex: -1 }}
            name="trame"
            color="blue"
            active={this.props.activeItem === 0}
            onClick={() => this.props.setActiveTab(0)}
          >
            <Icon name="list ul" />
            Trame
          </Menu.Item>
          <Menu.Item
            style={{
              zIndex: 2,

              bottom: '0',
              position: 'absolute',
              marginBottom: '-30px',
              overflow: 'hidden',
              width: '103px',
              textAlign: 'center'
            }}
            onClick={() => this.props.setActiveTab(1)}
          >
            <div
              style={{
                flexDirection: 'column'
              }}
            >
              <Button
                color={this.props.activeItem === 1 ? 'red' : 'gray'}
                style={{ fontSize: 40, zIndex: 2, margin: 0 }}
                circular
                size="massive"
                icon="photo"
              ></Button>
            </div>
          </Menu.Item>
          <Menu.Item
            style={{ zIndex: -1 }}
            name="documents"
            color="blue"
            active={this.props.activeItem === 2}
            onClick={() => this.props.setActiveTab(2)}
          >
            <Icon name="file" /> Documents{' '}
          </Menu.Item>
        </Menu>
      </Grid>
    );
  }
}

FileNavigationComponent.propTypes = {
  activeItem: PropTypes.number.isRequired,
  setActiveTab: PropTypes.func.isRequired
};

export default FileNavigationComponent;
