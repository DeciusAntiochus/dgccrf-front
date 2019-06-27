import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import propTypes from 'prop-types';

class EntrepriseAttribute extends React.Component {
  render() {
    return (
      <Grid.Row>
        <Grid.Column verticalAlign="middle" mobile={3} width={1}>
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
        <Grid.Column
          verticalAlign="middle"
          width={5}
          tablet={5}
          computer={5}
          mobile={13}
        >
          <div style={{ fontSize: '15px' }}>
            <span style={{ fontWeight: 'bold' }}>{this.props.name}</span>
          </div>
        </Grid.Column>
        <Grid.Column only="mobile" mobile={3}></Grid.Column>
        <Grid.Column
          verticalAlign="middle"
          width={7}
          tablet={5}
          computer={5}
          mobile={13}
        >
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
