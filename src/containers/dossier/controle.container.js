import React from 'react';
import { Form, Select } from 'semantic-ui-react';
import dossierService from '../../services/dossier.service';

export default class ControleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dossiers: [],
      dossier: '',
      tp: ''
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
      <Form>
        <Form.Group widths="equal">
          <Form.Field
            required
            control={Select}
            options={this.state.dossiers}
            label="Dossier"
            placeholder="Dossier"
            search
            onChange={(e, data) => {
              this.setState({ dossier: data.value });
            }}
          />
          <Form.Input
            fluid
            required
            label="Tâche Programmée"
            placeholder="Tâche Programmée"
            onChange={e => this.setState({ dg: e.target.value })}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            required
            label="Code DG"
            placeholder="Code DG"
            onChange={e => this.setState({ dg: e.target.value })}
          />

          <Form.Input
            fluid
            required
            label="Code CPF"
            placeholder="Code CPF"
            onChange={e => this.setState({ cpf: e.target.value })}
          />
        </Form.Group>
        <Form.Input
          fluid
          required
          label="Stade"
          placeholder="Stade"
          onChange={e => this.setState({ stade: e.target.value })}
        />
        <Form.Button>Valider</Form.Button>
      </Form>
    );
  }
}
