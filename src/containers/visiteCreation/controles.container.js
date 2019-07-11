import React from 'react';
import { Modal, Container, Button, Table, Message } from 'semantic-ui-react';
import SingleControleComponent from './singleControle.container';
import PropTypes from 'prop-types';
import PouchDbServices from '../../services';
let activiteService = PouchDbServices.services.activite;
let cpfService = PouchDbServices.services.cpf;

export default class ControleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countControl: 0,
      addModalOpen: false,
      addModalErrorMessage: '',
      modifyModalOpen: false,
      modifyModalErrorMessage: '',
      controleModified: {}
    };
    this.submitAddControle = this.submitAddControle.bind(this);
    this.submitModifyControle = this.submitModifyControle.bind(this);
  }

  displayNoControleAlert = () => {
    if (this.props.controles.length === 0) {
      return (
        <Table.Row>
          <Table.Cell>
            {"Aucun contrôle n'a été renseigné pour l'instant."}
          </Table.Cell>
        </Table.Row>
      );
    } else {
      return (
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Dossier</Table.HeaderCell>
            <Table.HeaderCell>Code Action</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      );
    }
  };

  async submitAddControle(controle) {
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
      const codeCPF = await cpfService.getCpfById(controle.cpf);
      const codeActivite = await activiteService.getActiviteById(
        controle.activite
      );
      this.setState({
        countCountrol: this.state.countControl + 1,
        addModalOpen: false,
        AddModalMessage: ''
      });
      this.props.changeControle(
        this.props.controles.concat([
          { ...controle, ...codeCPF, ...codeActivite }
        ])
      );
    }
  }

  async submitModifyControle(controle, controleId) {
    if (
      !controle.dossier ||
      !controle.tache ||
      !controle.activite ||
      !controle.cpf ||
      !controle.stade
    ) {
      this.setState({
        modifyModalErrorMessage:
          'Veuillez renseigner tous les champs obligatoires.'
      });
    } else {
      const codeCPF = await cpfService.getCpfById(controle.cpf);
      const codeActivite = await activiteService.getActiviteById(
        controle.activite
      );
      this.setState({
        modifyModalOpen: false,
        modifyModalMessage: ''
      });
      this.props.changeControle(
        this.props.controles.map(cont => {
          if (cont.ident === controleId) {
            return { ...controle, ...codeCPF, ...codeActivite };
          } else {
            return cont;
          }
        })
      );
    }
  }

  deleteControle = controleId => {
    this.props.changeControle(
      this.props.controles.filter(cont => cont.ident !== controleId)
    );
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
            <SingleControleComponent
              onSubmit={this.submitAddControle}
              dossier={this.props.dossier}
            />
          </Modal.Content>
        </Modal>
        <Modal open={this.state.modifyModalOpen}>
          <Modal.Header>
            <span>Modifier un contrôle</span>
            <Button
              floated="right"
              onClick={() => {
                this.setState({ modifyModalOpen: false });
              }}
            >
              Close
            </Button>
          </Modal.Header>
          <Modal.Content>
            {this.displayMessage(this.state.modifyModalErrorMessage)}
            <SingleControleComponent
              onSubmit={controle =>
                this.submitModifyControle(controle, controle.ident)
              }
              controle={this.state.controleModified}
              dossier={{
                id: this.state.controleModified.dossier,
                text: this.state.controleModified.dossierText
              }}
            />
          </Modal.Content>
        </Modal>
        <Table celled stackable>
          {this.displayNoControleAlert()}
          <Table.Body>
            {this.props.controles.map(controle => (
              <Table.Row key={controle.ident}>
                <Table.Cell>{controle.dossierText}</Table.Cell>
                <Table.Cell>{controle.ACDG_CODE_LIB_NIVEAU3}</Table.Cell>
                <Button
                  icon="pencil"
                  style={{ margin: '3px' }}
                  onClick={() =>
                    this.setState({
                      modifyModalOpen: true,
                      controleModified: controle
                    })
                  }
                ></Button>
                <Button
                  icon="trash alternate"
                  style={{ margin: '3px' }}
                  onClick={() => this.deleteControle(controle.ident)}
                ></Button>
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
  controles: PropTypes.array.isRequired,
  dossier: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  })
};
