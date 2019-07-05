import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import DossierField from '../../components/fields/dossierField.component';
import StadeField from '../../components/fields/stadeField.component';

export default class SingleControleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      controle: {
        dossier: '',
        dg: '',
        cpf: '',
        stade: ''
      }
    };
  }
  render() {
    return (
      <Form>
        <DossierField
          dossierChange={(e, data) =>
            this.setState({
              controle: { ...this.state.controle, dossier: data.value }
            })
          }
        />
        <Form.Group widths="equal">
          <Form.Input
            fluid
            required
            label="Code DG"
            placeholder="Code DG"
            onChange={e =>
              this.setState({
                controle: { ...this.state.controle, dg: e.target.value }
              })
            }
          />

          <Form.Input
            fluid
            required
            label="Code CPF"
            placeholder="Code CPF"
            onChange={e =>
              this.setState({
                controle: { ...this.state.controle, cpf: e.target.value }
              })
            }
          />
        </Form.Group>
        <StadeField
          onChange={(e, data) =>
            this.setState({
              controle: { ...this.state.controle, stade: data.value }
            })
          }
        />
        <Form.Button onClick={() => this.props.onSubmit(this.state.controle)}>
          Valider
        </Form.Button>
      </Form>
    );
  }
}

SingleControleComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
