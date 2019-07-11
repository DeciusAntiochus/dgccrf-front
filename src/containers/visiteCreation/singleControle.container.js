import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import DossierField from '../../components/fields/dossierField.component';
import StadeField from '../../components/fields/stadeField.component';
import CodesField from '../../components/fields/codes.component';

export default class SingleControleComponent extends React.Component {
  constructor(props) {
    super(props);
    if (props.controle) {
      this.state = {
        controle: {
          dossier: props.controle.dossier,
          dossierText: props.controle.dossierText,
          tache: props.controle.tache,
          tacheText: props.controle.tacheText,
          activite: props.controle.ACDG_IDENT,
          activiteText: props.controle.ACDG_CODE_LIB_NIVEAU3,
          cpf: props.controle.CPF_IDENT,
          stade: props.controle.stade,
          ident: props.controle.ident
        }
      };
    } else {
      this.state = {
        controle: {
          dossier: parseInt(this.props.dossier.id),
          dossierText: this.props.dossier.text,
          tache: 0,
          tacheText: '',
          activite: 0,
          activiteText: '',
          cpf: 0,
          stade: ''
        }
      };
    }
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
          activite={this.state.controle.activite}
          cpf={this.state.controle.cpf}
        />
        <StadeField
          onChange={(e, data) =>
            this.setState({
              controle: { ...this.state.controle, stade: data.value }
            })
          }
          stade={this.state.controle.stade}
        />
        <Form.Button onClick={() => this.props.onSubmit(this.state.controle)}>
          Valider
        </Form.Button>
      </Form>
    );
  }
}

SingleControleComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  dossier: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string
  }),
  controle: PropTypes.any
};
