import React from 'react';
import { Grid, List, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import visitesService from '../../services/visite.service';
import PropTypes from 'prop-types';

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
    return (
      <Grid textAlign="center" style={{ display: 'flex' }} verticalAlign="top">
        <Grid.Row textAlign="right" display="flex">
          <Grid.Column width={16}>
            <Link to="/nouvelle-visite">
              <div>
                <Icon name="plus" size="big" />
              </div>
            </Link>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <List divided relaxed style={{ flex: 1 }}>
              {this.state.visitesList.map(visite => (
                <List.Item
                  as={Link}
                  key={visite.VISITE_IDENT}
                  to={'/visite/' + visite.VISITE_IDENT}
                >
                  <List.Content>
                    <List.Header>{visite.enterprise}</List.Header>
                    <List.Description>
                      {moment(visite.date).format('DD/MM/YYYY')}
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
