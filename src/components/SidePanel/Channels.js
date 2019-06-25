import React from 'react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { setCurrentChannel } from '../../actions';
import { Menu, MenuItem, Icon, Modal, ModalHeader, ModalContent, Form, FormField, Input, ModalActions, Button, MenuMenu } from 'semantic-ui-react';

class Channels extends React.Component {
  state = {
    activeChannel: '',
    user: this.props.currentUser,
    channels: [],
    channelName: '',
    channelDetails: '',
    channelsRef: firebase.database().ref('channels'),
    modal: false,
    firstLoad: true
  }

  componentDidMount() {
    this.addListeners();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  addListeners = () => {
    let loadedChannels = [];
    this.state.channelsRef.on("child_added", snap => {
      loadedChannels.push(snap.val());
      this.setState({ channels: loadedChannels }, () => this.setFirstChannel());
    });
  };

  removeListeners = () => {
    this.state.channelsRef.off()
  }

  setFirstChannel = () => {
    const firstChannel = this.state.channels[0];

    if (this.state.firstLoad && this.state.channels.length > 0) {
      this.props.setCurrentChannel(firstChannel)
      this.setActiveChannel(firstChannel)
    }
    this.setState({ firstLoad: false });
  }


  addChannel = () => {
    const { channelsRef, channelName, channelDetails, user } = this.state;

    const key = channelsRef.push().key;

    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL
      }
    };

    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({channelName: '', channelDetails: ''});
        this.closeModal();
        console.log('add')
      })
      .catch(e => console.log(e))
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)){
      this.addChannel();
    }
  }

  isFormValid = ({channelName, channelDetails}) => channelName && channelDetails;

  closeModal = () => this.setState({ modal: false });

  openModal = () => this.setState({ modal: true })


  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  changeChannel = channel => {
    this.setActiveChannel(channel);
    this.props.setCurrentChannel(channel);
  };

  setActiveChannel = channel => {
    this.setState({activeChannel: channel.id})
  }

  displayChannels = channels =>
    channels.length > 0 &&
    channels.map(channel => (
      <MenuItem
        key={channel.id}
        onClick={() => this.changeChannel(channel)}
        name={channel.name}
        active={channel.id === this.state.activeChannel}
        style={{ opacity: 0.7 }}
      >
        # {channel.name}
      </MenuItem>
    ));


  render() {
    const { channels, modal } = this.state;
    return (
      <React.Fragment>
        <MenuMenu className="menu">
          <MenuItem>
            <span>
              <Icon name="exchange"/> CHANNELS
            </span>{" "}
            ({channels.length}) <Icon name="add" onClick={this.openModal}/>
          </MenuItem>
        {/* Channels */}
        {this.displayChannels(channels)}
        </MenuMenu>

        <Modal basic open={modal} onClose={this.closeModal}>
          <ModalHeader>
            Add a Channel
          </ModalHeader>
          <ModalContent>
            <Form onSubmit={this.handleSubmit}>
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
            <Button color="green" inverted onClick={this.handleSubmit}>
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

export default connect(null, {setCurrentChannel})(Channels);