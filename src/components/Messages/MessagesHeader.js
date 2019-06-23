import React from 'react'
import { Segment, Header, Icon, Input } from 'semantic-ui-react';
import HeaderSubHeader from 'semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader';

class MessagesHeader extends React.Component {
  render () {
    return (
      <Segment clearing>
        {/* Channel Title */}
        <Header fluid="true" as="h2" floated="left" style={{marginBottom: 0}}>
          <span>
            Channel
            <Icon name={"star outline"} color="black"/>
          </span>
          <HeaderSubHeader>2 Users</HeaderSubHeader>
        </Header>

        {/* Channel Search Input */}
        <Header floated="right">
          <Input
            size="mini"
            icon="search"
            name="serachTerm"
            placeholder="SearchMessages"
          />
        </Header>
      </Segment>
    )
  }
};

export default MessagesHeader;