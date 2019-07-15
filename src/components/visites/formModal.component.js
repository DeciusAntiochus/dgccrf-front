import { Modal, Step, Container, Button } from 'semantic-ui-react';
import React from 'react';

import PropTypes from 'prop-types';
function FormModal(props) {
  return (
    <Modal
      closeIcon={true}
      open={props.opened}
      onClose={() => {
        props.close();
      }}
    >
      <Modal.Header>Remplir un PV</Modal.Header>

      <Modal.Content>
        <Container
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div>
            <Step.Group>
              <Step>
                <Step.Content>
                  <Step.Title>Choix du PV</Step.Title>
                </Step.Content>
              </Step>

              <Step>
                <Step.Content>
                  <Step.Title> Informations </Step.Title>
                </Step.Content>
              </Step>

              <Step>
                <Step.Content>
                  <Step.Title> Prévisualisation </Step.Title>
                </Step.Content>
              </Step>
              <Step>
                <Step.Content>
                  <Step.Title> Signature </Step.Title>
                </Step.Content>
              </Step>
              <Step>
                <Step.Content>
                  <Step.Title> Terminé! </Step.Title>
                </Step.Content>
              </Step>
            </Step.Group>
          </div>
          <div style={{ marginTop: 30 }}>
            <Button.Group>
              <Button color="blue">PV d'audition</Button>

              <Button color="red">PV de déclaration</Button>
            </Button.Group>
          </div>
        </Container>
      </Modal.Content>
    </Modal>
  );
}

FormModal.propTypes = {
  opened: PropTypes.bool,
  close: PropTypes.func,
  document: PropTypes.object
};

export default FormModal;
