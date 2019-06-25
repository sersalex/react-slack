import React from 'react'
import { Segment, Header, Icon, Input } from 'semantic-ui-react';
import HeaderSubHeader from 'semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader';

class MessagesHeader extends React.Component {
  render () {
    const { channelName, numUniqueUsers, handleSearchChange, searchLoading} = this.props;

    return (
      <Segment clearing>
        {/* Channel Title */}
        <Header fluid="true" as="h2" floated="left" style={{marginBottom: 0}}>
          <span>
            {channelName}
            <Icon name={"star outline"} color="black"/>
          </span>
          <HeaderSubHeader>{numUniqueUsers}</HeaderSubHeader>
        </Header>

        {/* Channel Search Input */}
        <Header floated="right">
          <Input
            loading={searchLoading}
            onChange={handleSearchChange}
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