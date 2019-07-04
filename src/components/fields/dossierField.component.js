import React from 'react';
import { Form, Select } from 'semantic-ui-react';

export default class DossierField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dossiers: []
    };
  }

  loadDossiers(dossiers) {
    const newDossiers = dossiers.map(dossier => {
      return { text: dossier.DOSSIER_LIBELLE };
    });
    this.setState({ dossiers: newDossiers });
  }

  // componentDidMount() {
  //   dossierService.getAllDocs().then(res => this.loadDossiers(res));
  // }

  render() {
    return (
      <Form.Field
        control={Select}
        options={this.state.dossiers}
        label={{ children: 'Dossier', htmlFor: 'form-select-control-dossier' }}
        placeholder="Dossier"
        search
        searchInput={{ id: 'form-select-control-dossier' }}
      />
    );
  }
}
