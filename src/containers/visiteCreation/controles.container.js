import React from 'react';
import { Modal, Container, Button, Table, Message } from 'semantic-ui-react';
import SingleControleComponent from './singleControle.container';
import PropTypes from 'prop-types';

export default class ControleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countControl: 0,
      addModalOpen: false,
      addModalErrorMessage: ''
    };
  }

  submitControle = controle => {
    if (
      !controle.dossier ||
      !controle.tache ||
      !controle.activite ||
      !controle.cpf ||
      !controle.stade
    ) {
      this.setState({
        addModalErrorMessage:
          'Veuillez renseigner tous les champs obligatoires.'
      });
    } else {
      controle.ident = this.state.countControl;
      this.setState({
        countCountrol: this.state.countControl + 1,
        addModalOpen: false
      });
      this.props.changeControle(this.props.controles.concat([controle]));
    }
  };

  displayMessage = message => {
    if (message) {
      return (
        <Message negative>
          <p>{message}</p>
        </Message>
      );
    }
  };
  render() {
    return (
      <Container>
        <p style={{ fontWeight: 'bold' }}>Contrôles :</p>
        <Modal
          trigger={
            <Button onClick={() => this.setState({ addModalOpen: true })}>
              Ajouter un contrôle
            </Button>
          }
          open={this.state.addModalOpen}
        >
          <Modal.Header>
            <span>Ajouter un contrôle</span>
            <Button
              floated="right"
              onClick={() => {
                this.setState({ addModalOpen: false });
              }}
            >
              Close
            </Button>
          </Modal.Header>
          <Modal.Content>
            {this.displayMessage(this.state.addModalErrorMessage)}
            <SingleControleComponent onSubmit={this.submitControle} />
          </Modal.Content>
        </Modal>
        <Table celled>
          <Table.Body>
            {this.props.controles.map(controle => (
              <Table.Row key={controle.ident}>
                <Table.Cell>{controle.dossierText}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

ControleComponent.propTypes = {
  changeControle: PropTypes.func.isRequired,
  controles: PropTypes.array.isRequired
};
