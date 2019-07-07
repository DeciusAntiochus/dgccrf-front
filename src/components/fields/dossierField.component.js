import React from 'react';
import { Form, Select } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import PouchDbServices from '../../services';
let dossierService = PouchDbServices.services.dossier;

export default class DossierField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dossiers: [],
      taches: []
    };
  }

  async handleDossierChange(codeDossier) {
    let taches = [];
    const dossier = await dossierService.getDossierById(codeDossier);
    for (var i = 0; i < dossier.TAPR_LIBELLE.length; i += 1) {
      if (
        dossier.TAPR_LIBELLE[i] !== '[*]Non défini' &&
        taches.map(tache => tache.key).indexOf(dossier.TAPR_IDENT[i]) === -1
      ) {
        taches = taches.concat([
          {
            text: dossier.TAPR_LIBELLE[i] + dossier.TAPR_LIBELLE_COURT[i],
            value: parseInt(dossier.TAPR_IDENT[i]),
            key: parseInt(dossier.TAPR_IDENT[i])
          }
        ]);
      }
    }
    if (taches.length === 0) {
      taches = [{ text: 'Aucun', value: -1, key: -1 }];
    }
    this.setState({ taches });
    if (taches.map(tache => tache.key).indexOf(this.props.tache) === -1) {
      this.props.tacheChange(taches[0].key, taches[0].text);
    }
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
          onChange={(e, data) => (
            this.props.dossierChange(data.value, e.currentTarget.innerText),
            this.handleDossierChange(data.value)
          )}
        />
        <Form.Field
          required
          control={Select}
          options={this.state.taches}
          label="Tâche Programmée"
          placeholder="Tâche Programmée"
          search
          onChange={(e, data) => {
            this.props.tacheChange(data.value, e.currentTarget.innerText);
          }}
        />
      </Form.Group>
    );
  }
}

DossierField.propTypes = {
  dossierChange: PropTypes.func.isRequired,
  tacheChange: PropTypes.func.isRequired,
  dossier: PropTypes.number.isRequired,
  tache: PropTypes.number.isRequired
};
