import React from "react";
import { Segment, CommentGroup } from "semantic-ui-react";
import MessageForm from "./MessageForm";
import MessagesHeader from "./MessagesHeader";

class Messages extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MessagesHeader/>

        <Segment>
          <CommentGroup className="messages">
            {/* Messages */}
          </CommentGroup>

        </Segment>
        <MessageForm/>
      </React.Fragment>
    )
  }
}

export default Messages;