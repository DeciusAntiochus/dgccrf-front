import React from 'react';
import {
  Grid,
  List,
  Icon,
  Container,
  Button,
  Search,
  Segment
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import visitesService from '../../services/visite.service';
import PropTypes from 'prop-types';
import Visite from './visite';

import _ from 'lodash';
import MyActivityIndicator from '../../components/myActivityIndicator.component';

export default class VisitesComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.visitesList ? (
      <div>
        <div
          style={{
            backgroundColor: '#f2f2f2',
            position: 'fixed',
            zIndex: 10,
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 70
          }}
        >
          <div style={{ flex: 1, maxWidth: 200 }}>
            <Search
              input={{ fluid: true }}
              open={false}
              // onSearchChange={_.debounce(this.handleSearchChange, 500)}
            />
          </div>
          <div style={{ flex: 2, textAlign: 'right' }}>
            <Link to="/nouvelle-visite">
              <Button style={{ padding: 5 }} icon basic color="blue">
                <div>
                  <Icon name="plus" size="large" />
                  Créer une visite
                </div>
              </Button>
            </Link>
          </div>
        </div>

        <div style={{ paddingTop: 70 }}>
          {this.props.visitesList.length > 0 ? (
            this.props.visitesList.map((visite, i) => (
              <Visite visite={visite} key={i} />
            ))
          ) : (
            <Segment style={{ fontStyle: 'italic' }}>
              {' '}
              Pas encore de visites pour ce dossier!{' '}
            </Segment>
          )}
        </div>
      </div>
    ) : (
      <MyActivityIndicator />
    );
  }
}

VisitesComponent.propTypes = {
  visitesList: PropTypes.any
};
