import React from 'react';
import { Modal } from 'semantic-ui-react';

import './documents.component';

import PropTypes from 'prop-types';

function DocumentModal(props) {
  return (
    <Modal
      closeIcon={true}
      basic
      open={props.opened}
      onClose={() => {
        props.close();
      }}
    >
      <Modal.Header style={{ display: 'flex', justifyContent: 'center' }}>
        {props.document.name}
      </Modal.Header>
      <Modal.Content style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={props.document.document} className="image" />
      </Modal.Content>
    </Modal>
  );
}

DocumentModal.propTypes = {
  opened: PropTypes.bool,
  close: PropTypes.func,
  document: PropTypes.object
};

export default DocumentModal;
