import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class EntrepriseField extends React.Component {
  render() {
    return (
      <Form.Group widths="equal">
        <Form.Input
          fluid
          required
          label="Etablissement"
          placeholder="Raison Sociale"
          onChange={e => this.props.changeRaisonSocialeValue(e.target.value)}
          value={this.props.ETOB_RAISON_SOCIALE}
        />

        <Form.Input
          fluid
          required
          label="SIRET"
          placeholder="SIRET"
          onChange={e => this.props.changeSiretValue(e.target.value)}
          value={this.props.ETOB_SIRET}
        />
      </Form.Group>
    );
  }
}

EntrepriseField.propTypes = {
  ETOB_RAISON_SOCIALE: PropTypes.string.isRequired,
  ETOB_SIRET: PropTypes.string.isRequired,
  changeSiretValue: PropTypes.func.isRequired,
  changeRaisonSocialeValue: PropTypes.func.isRequired
};
