import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import DossierField from '../../components/fields/dossierField.component';
import StadeField from '../../components/fields/stadeField.component';
import CodesField from '../../components/fields/codes.component';

export default class SingleControleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      controle: {
        dossier: 0,
        tache: 0,
        activite: '',
        cpf: '',
        stade: '',
        dossierText: '',
        activiteText: ''
      }
    };
  }
  render() {
    return (
      <Form>
        <DossierField
          dossierChange={(value, text) =>
            this.setState({
              controle: {
                ...this.state.controle,
                dossier: value,
                dossierText: text
              }
            })
          }
          tacheChange={(value, text) =>
            this.setState({
              controle: {
                ...this.state.controle,
                tache: value,
                tacheText: text
              }
            })
          }
          dossier={this.state.controle.dossier}
          tache={this.state.controle.tache}
        />
        <CodesField
          activiteChange={(e, data) =>
            this.setState({
              controle: {
                ...this.state.controle,
                activite: data.value,
                activiteText: e.currentTarget.innerText
              }
            })
          }
          cpfChange={(e, data) => {
            this.setState({
              controle: {
                ...this.state.controle,
                cpf: data.value
              }
            });
          }}
        />
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
