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
import PropTypes from 'prop-types';
import Visite from './visite';
import _ from 'lodash';
import MyActivityIndicator from '../../components/myActivityIndicator.component';

import PouchDbServices from '../../services';
let visitesService = PouchDbServices.services.visite;

export default class VisitesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visitesList: [],
      isLoading: true
    };
  }

  componentDidMount() {
    let dossierId = this.props.match.params.id;
    visitesService
      .getVisitesByDossier(dossierId)
      .then(data => this.setState({ visitesList: data, isLoading: false }));
    visitesService.onChanges(() =>
      this.setState({ isLoading: true }, () => {
        visitesService
          .getVisitesByDossier(dossierId)
          .then(data => this.setState({ visitesList: data, isLoading: false }));
      })
    );
  }

  render() {
    console.log(this.state.visitesList);
    return !this.state.isLoading ? (
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
          {this.state.visitesList.length > 0 ? (
            this.state.visitesList.map((visite, i) => (
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
  match: PropTypes.objectOf({
    params: PropTypes.objectOf({
      id: PropTypes.string
    })
  })
};
