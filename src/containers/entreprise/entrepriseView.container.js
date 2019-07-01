import React from 'react';
import { Card, Grid, Container } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import EntrepriseAttribute from '../../components/entrepriseAttribute.component';
import {
  changeNameOfPage,
  changeBackUrl,
  changeActivePage
} from '../navbar/actions';
import { connect } from 'react-redux';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    changeNameOfPage: newName => dispatch(changeNameOfPage(newName)),
    changeBackUrl: newBackUrl => dispatch(changeBackUrl(newBackUrl)),
    changeActivePage: value =>
      dispatch(changeActivePage(('etablissements', value)))
  };
}

class EntrepriseViewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '1',
      siret: '43425495900035',
      raisonSociale: 'Sadaka',
      enseigne: 'Le Salon',
      naf:
        "Commerce de gros (commerce interentreprises) d'autres biens domestiques",
      adresse: '27 rue des étuves',
      ville: 'Montpellier',
      codePostal: '34000'
    };
  }

  componentDidMount() {
    this.props.changeNameOfPage('Établissement ' + this.state.enseigne);
    this.props.changeBackUrl('/etablissements');
    this.props.changeActivePage('/etablissements/' + this.state.id);
  }

  render() {
    return (
      <Container style={{ padding: '1rem' }}>
        <Card centered raised fluid>
          <Card.Content>
            <Card.Header textAlign="center">Informations</Card.Header>
          </Card.Content>
          <Card.Content>
            <Grid>
              <EntrepriseAttribute
                name="Enseigne :"
                icon="building"
                value={<span>{this.state.enseigne}</span>}
              />

              <EntrepriseAttribute
                name="Raison Sociale :"
                icon="address card"
                value={<span>{this.state.raisonSociale}</span>}
              />
              <EntrepriseAttribute
                name="SIRET :"
                icon="text cursor"
                value={<span>{this.state.siret}</span>}
              />
              <EntrepriseAttribute
                name="NAF :"
                icon="clipboard"
                value={<span>{this.state.naf}</span>}
              />
              <EntrepriseAttribute
                name="Adresse :"
                icon="address book"
                value={
                  <span>
                    {this.state.adresse} <br /> {this.state.codePostal}
                    <span> </span>
                    {this.state.ville}
                  </span>
                }
              />
            </Grid>
          </Card.Content>
        </Card>
        <Card centered raised fluid>
          <Card.Content>
            <Card.Header textAlign="center">Visites</Card.Header>
          </Card.Content>
          <Card.Content>
            <Grid></Grid>
          </Card.Content>
        </Card>
      </Container>
    );
  }
}

EntrepriseViewComponent.propTypes = {
  changeNameOfPage: PropTypes.func.isRequired,
  changeBackUrl: PropTypes.func.isRequired,
  changeActivePage: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntrepriseViewComponent);
