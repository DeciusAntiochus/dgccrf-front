import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import propTypes from 'prop-types';

class EntrepriseAttribute extends React.Component {
  render() {
    return (
      <Grid.Row>
        <Grid.Column verticalAlign="middle">
          <Icon
            circular
            name={this.props.icon}
            className="mybutton"
            style={{
              marginRight: '10px',
              color: 'white',
              backgroundColor: '#3C4586'
            }}
          ></Icon>
        </Grid.Column>
        <Grid.Column verticalAlign="middle" width={6}>
          <div style={{ fontSize: '15px' }}>
            <span style={{ fontWeight: 'bold' }}>{this.props.name}</span>
          </div>
        </Grid.Column>
        <Grid.Column verticalAlign="middle" width={9}>
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
