import React from 'react';
import { Grid, List, Icon, Container } from 'semantic-ui-react';
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
      <Container>
        <Container
          style={{ backgroundColor: '#f2f2f2', position: 'fixed', zIndex: 10 }}
        >
          <Link to="/nouvelle-visite">
            <div>
              <Icon name="plus" size="big" />
            </div>
          </Link>
        </Container>

        <Container style={{ paddingTop: 30 }}>
          {this.state.visitesList.map((visite, i) => (
            <Visite visite={visite} key={i} />
          ))}
        </Container>
      </Container>
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
