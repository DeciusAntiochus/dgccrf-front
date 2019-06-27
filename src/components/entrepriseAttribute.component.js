import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import propTypes from 'prop-types';

class EntrepriseAttribute extends React.Component {
  render() {
    return (
      <Grid.Row stretched>
        <Grid.Column>
          <div style={{ fontSize: '15px' }}>
            <Icon
              circular
              inverted
              color="blue"
              name={this.props.icon}
              style={{ marginRight: '10px' }}
            ></Icon>
            <span style={{ fontWeight: 'bold' }}>{this.props.name}</span>
          </div>
        </Grid.Column>
        <Grid.Column verticalAlign="middle">
          <p
            style={{
              fontSize: '15px'
            }}
          >
            {this.props.value}
          </p>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

EntrepriseAttribute.propTypes = {
  icon: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  value: propTypes.element.isRequired
};

export default EntrepriseAttribute;
