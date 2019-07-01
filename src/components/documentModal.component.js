import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';

import PropTypes from 'prop-types';

class DocumentModal extends Component {
  render() {
    const { document } = this.props;
    return (
      <Modal>
        <Modal.Content>{document.name}</Modal.Content>
      </Modal>
    );
  }
}

DocumentModal.propTypes = {
  document: PropTypes.object
};

export default DocumentModal;
