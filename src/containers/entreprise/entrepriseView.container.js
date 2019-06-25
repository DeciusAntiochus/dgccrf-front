import React from 'react';
import { Card, Grid, Container } from 'semantic-ui-react';
import EntrepriseAttribute from '../../components/entrepriseAttribute.component';

export default class EntrepriseViewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  render() {
    return (
      <Container style={{ margin: '5rem' }}>
        <Card centered raised fluid>
          <Card.Content>
            <Card.Header textAlign="center">Entreprise</Card.Header>
          </Card.Content>
          <Card.Content>
            <Grid columns={2}>
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
      </Container>
    );
  }
}