import React from 'react';
import { Modal, ModalHeader, ModalContent, Input, ModalActions, Button, Icon } from 'semantic-ui-react';

class FileModal extends React.Component {
  render () {
    const { modal, closeModal } = this.props;
    return (
      <Modal basic open={modal} onClose={closeModal}>
        <ModalHeader>
          Select an Image File
        </ModalHeader>
        <ModalContent>
          <Input
            fluid
            label="File types: jpg, png"
            name="file"
            type="file"
          />
        </ModalContent>
        <ModalActions>
          <Button color="green" inverted>
            <Icon name="checkmark"/> Send
          </Button>
          <Button color="red" inverted onClick={closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
        </ModalActions>
      </Modal>
    )
  }
}

export default FileModal;