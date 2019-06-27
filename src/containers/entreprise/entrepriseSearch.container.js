/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import _ from 'lodash';
import { Grid, Search, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { changeNameOfPage, changeBackUrl } from '../navbar/actions';
import { connect } from 'react-redux';

const source = [
  {
    id: 1,
    siret: '43425495900035',
    raisonSociale: 'Sadaka',
    enseigne: 'Le Salon',
    naf:
      "Commerce de gros (commerce interentreprises) d'autres biens domestiques",
    adresse: '27 rue des étuves',
    ville: 'Montpellier',
    codePostal: '34000'
  },
  {
    id: 2,
    siret: '4342523848300035',
    raisonSociale: 'Roger',
    enseigne: 'Chez Tonton Coiffeur',
    naf:
      "Commerce de gros (commerce interentreprises) d'autres biens domestiques",
    adresse: '5 rue Charles de Gaulle',
    ville: 'Asnières',
    codePostal: '92600'
  }
];

const initialState = { isLoading: false, results: [], value: '' };

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    changeNameOfPage: newName => dispatch(changeNameOfPage(newName)),
    changeBackUrl: newBackUrl => dispatch(changeBackUrl(newBackUrl))
  };
}

class EntrepriseSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      value: ''
    };
  }

  componentDidMount() {
    this.props.changeNameOfPage('Établissements');
    this.props.changeBackUrl('/menu');
  }

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result =>
        re.test(result.raisonSociale) ||
        re.test(result.enseigne) ||
        re.test(result.siret);
      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch)
      });
    }, 300);
  };
  renderResults({ id, raisonSociale, enseigne, siret }) {
    return (
      <Container
        fluid
        as={Link}
        to={'/etablissement/' + id}
        style={{ color: 'black' }}
      >
        <Grid>
          <Grid.Row>
            <Grid.Column style={{ fontWeight: 'bold' }} width={7}>
              Enseigne :{' '}
            </Grid.Column>
            <Grid.Column width={8}>{enseigne}</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{ fontWeight: 'bold' }} width={7}>
              Raison Sociale :{' '}
            </Grid.Column>
            <Grid.Column width={8}>{raisonSociale}</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{ fontWeight: 'bold' }} width={7}>
              Siret :{' '}
            </Grid.Column>
            <Grid.Column width={8}>{siret}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Container>
        <Grid style={{ marginTop: '1rem' }}>
          <Grid.Column only="tablet computer" width={5} verticalAlign="middle">
            <span style={{ fontWeight: 'bold' }}>Rechercher :</span>
          </Grid.Column>
          <Grid.Column tablet={11} mobile={16} computer={11} textAlign="center">
            <Search
              fluid
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={_.debounce(this.handleSearchChange, 500, {
                leading: true
              })}
              results={results}
              value={value}
              resultRenderer={this.renderResults}
            />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}
EntrepriseSearch.propTypes = {
  changeNameOfPage: PropTypes.func.isRequired,
  changeBackUrl: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntrepriseSearch);
