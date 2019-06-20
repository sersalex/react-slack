import React from 'react';
import { Menu, MenuItem, Icon, Modal, ModalHeader, ModalContent, Form, FormField, Input, ModalActions, Button } from 'semantic-ui-react';

class Channels extends React.Component {
  state = {
    channels: [],
    channelName: '',
    channelDetails: '',
    modal: false
  }

  closeModal = () => {
    this.setState({ modal: false })
  }

  openModal = () => {
    this.setState({ modal: true })
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    const { channels, modal } = this.state;
    return (
      <React.Fragment>
        <Menu style={{ paddingBottom: '2em', background: '#3e113f' }} >
          <MenuItem>
            <span>
              <Icon name="exchange"/> CHANNELS
            </span>{" "}
            ({channels.length}) <Icon name="add" onClick={this.openModal}/>
          </MenuItem>
        {/* Channels */}
        </Menu>

        <Modal basic open={modal} onClose={this.closeModal}>
          <ModalHeader>
            Add a Channel
          </ModalHeader>
          <ModalContent>
            <Form>
              <FormField>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </FormField>
              <FormField>
                <Input
                  fluid
                  label="About the Channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </FormField>
            </Form>
          </ModalContent>
          <ModalActions>
            <Button color="green" inverted>
              <Icon name="checkmark"/> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </ModalActions>
        </Modal>
      </React.Fragment>
    )
  }
}

export default Channels;