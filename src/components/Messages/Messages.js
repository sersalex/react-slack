import React from "react";
import { Segment, CommentGroup } from "semantic-ui-react";
import firebase from "../../firebase";

import MessageForm from "./MessageForm";
import MessagesHeader from "./MessagesHeader";
import Message from "./Message";

class Messages extends React.Component {
  state = {
    messagesRef: firebase.database().ref('messages'),
    messages: [],
    messagesLoading: true,
    channel: this.props.currentChannel,
    user: this.props.currentUser
  }

  componentDidMount() {
    const {channel, user} = this.state;
    if (channel && user) {
      this.addListeners(channel.id)
    }
  }

  addListeners = channelId => {
    this.addMessageListener(channelId)
  }

  addMessageListener = channelId => {
    let loadedMessages = [];
    this.state.messagesRef.child(channelId).on('child_added', snap => {
      loadedMessages.push(snap.val())
      this.setState({ messages: loadedMessages, messagesLoading: false})
      console.log(loadedMessages)
    })
  }

  displayMessages = messages => (
    messages.length > 0 && messages.map(message => (
      <Message
        key={message.timestamp}
        message={message}
        user={this.state.user}
      />
    ))
  )

  render() {
    const { messagesRef, messages, channel, user } = this.state;
    return (
      <React.Fragment>
        <MessagesHeader/>

        <Segment>
          <CommentGroup className="messages">
            {/* Messages */}
            {this.displayMessages(messages)}
          </CommentGroup>

        </Segment>
        <MessageForm
          currentChannel={channel}
          currentUser={user}
          messagesRef={messagesRef}
        />
      </React.Fragment>
    )
  }
}

export default Messages;