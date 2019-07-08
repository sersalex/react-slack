import React from "react";
import { Segment, Header, Accordion, AccordionTitle, Icon, AccordionContent, Image, List, ListItem, ListContent, ListHeader, ListDescription } from "semantic-ui-react";

class MetaPanel extends React.Component {
  state = {
    channel: this.props.currentChannel,
    privateChannel: this.props.isPrivateChannel,
    activeIndex: 0
  }

  setActiveIndex = (event, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({activeIndex: newIndex})

  }

  formatCount = num => (num > 1 || num === 0) ? `${num} posts` : `${num} post`

  displayTopPosters = posts => (
    Object.entries(posts)
      .sort((a, b) => b[1] - a[1])
      .map(([key, val], i) => (
        <ListItem key={i}>
          <Image avatar src={val.avatar}/>
          <ListContent>
            <ListHeader as="a">{key}</ListHeader>
            <ListDescription>{this.formatCount(val.count)}</ListDescription>
          </ListContent>
        </ListItem>
      ))
  )
  .slice(0, 5)

  render() {
    const { activeIndex, privateChannel, channel } = this.state;
    const { userPosts } = this.props;

    if (privateChannel) return null;

    return (
      <Segment loading={!channel}>
        <Header as="h3" attached="top">
          About # {channel && channel.name}
        </Header>
        <Accordion styled attached="true">
          {/* Info */}
          <AccordionTitle
           active={activeIndex === 0}
           index={0}
           onClick={this.setActiveIndex}
           >
            <Icon name="dropdown"/>
            <Icon name="info" />
            Details
          </AccordionTitle>
          <AccordionContent active={activeIndex === 0}>
            {channel && channel.details}
          </AccordionContent>
          {/* Posters */}
          <AccordionTitle
            active={activeIndex === 1}
            index={1}
            onClick={this.setActiveIndex}
          >
            <Icon name="dropdown" />
            <Icon name="user circle" />
            Top Posters
          </AccordionTitle>
          <AccordionContent active={activeIndex === 1}>
            <List>
              {userPosts && this.displayTopPosters(userPosts)}
            </List>
          </AccordionContent>

          {/* Created By */}
          <AccordionTitle
            active={activeIndex === 2}
            index={2}
            onClick={this.setActiveIndex}
          >
            <Icon name="dropdown" />
            <Icon name="pencil alternate"/>
            Created By
          </AccordionTitle>
          <AccordionContent active={activeIndex === 2}>
            <Header as="h3">
              {channel && channel.createdBy && <Image circular src={channel.createdBy.avatar} />}
              {channel && channel.createdBy ? channel.createdBy.name : 'Неизвестный автор'}
            </Header>
          </AccordionContent>
        </Accordion>
      </Segment>
    )
  }
}

export default MetaPanel;