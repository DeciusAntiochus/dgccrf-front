import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
  Grid,
  Segment,
  Header,
  Responsive
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './dossier.css';

class Dossier extends React.Component {
  render() {
    return (
      <Grid.Row style={{ padding: '20px' }}>
        <Segment
        // to={this.props.link}
        // icon
        // basic
        // fluid
        // className="menubutton"
        // color={this.props.color}
        // size="massive"
        >
          <Link to={this.props.link}>
            <Grid>
              <Grid.Row verticalAlign="middle" style={{ padding: 0 }}>
                <Grid.Column width={3} style={{ backgroundColor: '#f2f2f2' }}>
                  <Responsive minWidth={600}>
                    <Icon name="folder" color="yellow" size="huge"></Icon>
                  </Responsive>
                </Grid.Column>
                <Grid.Column width={8} textAlign="left">
                  <Header as="h2">{this.props.name}</Header>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Header as="h3">Salut</Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Link>
        </Segment>
      </Grid.Row>
    );
  }
}

Dossier.propTypes = {
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Dossier;
