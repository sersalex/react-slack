import React from 'react';
import firebase from '../../firebase';
import { Segment, Input, Button, ButtonGroup } from 'semantic-ui-react';

class MessageForm extends React.Component {
  state = {
    message: '',
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    loading: false,
    errors: []
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  createMessage = () => {
    const { user } = this.state;
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: user.uid,
        name: user.displayName
      },
      content: this.state.message
    }
    return message;
  }

  sandMessage = () => {
    const { messagesRef } = this.props;
    const { message, channel } = this.state;

    if (message) {
      this.setState({loading: true})
      messagesRef
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({ loading: false, message: '', errors: [] })
        })
        .catch(err => {
          console.log(err);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err)
          })
        })
    } else {
      this.setState({
        errors: this.state.errors.concat({message: 'Add a message'})
      })
    }
  }

  render () {
    const { errors, message, loading } = this.state;
    return (
      <Segment className="message__form">
        <Input
          fluid
          name="message"
          value={message}
          onChange={this.handleChange}
          style={{marginBottom: '0.7em'}}
          label={<Button icon="add"/>}
          labelPosition="left"
          className={
            errors.some(error => error.message.includes('message')) ? 'error' : ''
          }
          placeholder="Write your message"
          />
          <ButtonGroup icon widths="2">
            <Button
              disabled={loading}
              onClick={this.sandMessage}
              color="orange"
              content="Add Reply"
              labelPosition="left"
              icon="edit"
            />
            <Button
              color="teal"
              content="Upload Media"
              labelPosition="right"
              icon="cloud upload"
            />

          </ButtonGroup>
      </Segment>
    )
  }
}

export default MessageForm;