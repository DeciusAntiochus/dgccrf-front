import React from 'react';
import { Form, Select } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import PouchDbServices from '../../services';
let activiteService = PouchDbServices.services.activite;
let cpfService = PouchDbServices.services.cpf;

export default class CodesField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activites: [],
      cpf: []
    };
  }
  loadActivites(activites) {
    const newActivites = activites
      .filter(activite => activite.ACDG_ENQUETE_FLAG === 1)
      .map(activite => {
        return {
          key: activite.ACDG_IDENT,
          text: activite.ACDG_CODE_LIB_NIVEAU3,
          value: activite.ACDG_IDENT
        };
      });
    this.setState({ activites: newActivites });
  }
  loadCpf(cpf) {
    const newcpf = cpf.map(cpf => {
      return {
        key: cpf.CPF_IDENT,
        text: cpf.CPF_CODE_LIBELLE,
        value: cpf.CPF_IDENT
      };
    });
    this.setState({ cpf: newcpf });
  }

  componentDidMount() {
    activiteService.getAllDocs().then(res => this.loadActivites(res));
    cpfService.getAllDocs().then(res => this.loadCpf(res));
  }

  render() {
    return (
      <Form.Group widths="equal">
        <Form.Field
          required
          control={Select}
          options={this.state.activites}
          label="Code DG"
          placeholder="Code DG"
          search
          defaultValue={this.props.activite}
          onChange={this.props.activiteChange}
        />
        <Form.Field
          required
          control={Select}
          options={this.state.cpf}
          label="Code CPF"
          placeholder="Code CPF"
          search
          defaultValue={this.props.cpf}
          onChange={this.props.cpfChange}
        />
      </Form.Group>
    );
  }
}

CodesField.propTypes = {
  activiteChange: PropTypes.func.isRequired,
  cpfChange: PropTypes.func.isRequired,
  activite: PropTypes.number.isRequired,
  cpf: PropTypes.number.isRequired
};
