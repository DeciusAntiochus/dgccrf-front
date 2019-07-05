import React from 'react';
import { Form, Select } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import dossierService from '../../services/dossier.service';

export default class DossierField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dossiers: []
    };
  }

  loadDossiers(dossiers) {
    const newDossiers = dossiers
      .filter(dossier => !(dossier.TYPE_DOSSIER_LIBELLE === 'Information'))
      .map(dossier => {
        return {
          key: dossier.DOSSIER_IDENT,
          text: dossier.DOSSIER_LIBELLE,
          value: dossier.DOSSIER_IDENT
        };
      });
    this.setState({ dossiers: newDossiers });
  }

  componentDidMount() {
    dossierService.getAllDocs().then(res => this.loadDossiers(res));
  }

  render() {
    return (
      <Form.Group widths="equal">
        <Form.Field
          required
          control={Select}
          options={this.state.dossiers}
          label="Dossier"
          placeholder="Dossier"
          search
          onChange={this.props.dossierChange}
        />
        <Form.Input
          fluid
          required
          label="Tâche Programmée"
          placeholder="Tâche Programmée"
          onChange={e => this.setState({ dg: e.target.value })}
        />
      </Form.Group>
    );
  }
}

DossierField.propTypes = {
  dossierChange: PropTypes.func.isRequired
};
