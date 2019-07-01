import React from 'react';
import { Grid, List, Icon, Container, Button, Search } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import visitesService from '../../services/visite.service';
import PropTypes from 'prop-types';
import Visite from './visite';

export default class VisitesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visitesList: []
    };
  }

  componentDidMount() {
    let dossierId = this.props.match.params.id;
    visitesService
      .getVisitesByDossier(dossierId)
      .then(data => this.setState({ visitesList: data }));
    visitesService.onChanges(() =>
      visitesService
        .getVisitesByDossier(dossierId)
        .then(data => this.setState({ visitesDic: data }))
    );
  }

  render() {
    console.log(this.state.visitesList);
    return (
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
            <Search input={{ fluid: true }} />
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
          {this.state.visitesList.map((visite, i) => (
            <Visite visite={visite} key={i} />
          ))}
        </div>
      </div>
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
