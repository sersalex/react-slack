import React from "react";
import { Segment, Header, Accordion, AccordionTitle, Icon, AccordionContent, Image } from "semantic-ui-react";

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

  render() {
    const { activeIndex, privateChannel, channel } = this.state;

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
            Posters
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