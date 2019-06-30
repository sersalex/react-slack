import React from 'react';
import firebase from '../../firebase';
import { connect } from "react-redux";
import { setCurrentChannel, setPrivateChannel} from "../../actions"
import { MenuMenu, MenuItem, Icon } from 'semantic-ui-react';

class Starred extends React.Component {
  state = {
    user: this.props.currentUser,
    usersRef: firebase.database().ref('users'),
    activeChannel: '',
    starredChannels: []
  }

  componentDidMount() {
    if (this.state.user) {
      this.addListeners(this.state.user.uid);
    }
  }

  addListeners = userId => {
    this.state.usersRef
      .child(userId)
      .child('starred')
      .on('child_added', snap => {
        const starredChannel = { id: snap.key, ...snap.val() }
        this.setState({
          starredChannels: [...this.state.starredChannels, starredChannel]
        })
      })

    this.state.usersRef
      .child(userId)
      .child('starred')
      .on('child_removed', snap => {
        const channelToRemove = { id: snap.key, ...snap.val() }
        const filteredChannels = this.state.starredChannels.filter(c => c.id !== channelToRemove.id)
        this.setState({
          starredChannels: filteredChannels
        })
      })


  }

  changeChannel = channel => {
    this.setActiveChannel(channel);
    this.props.setCurrentChannel(channel);
    this.props.setPrivateChannel(false);
  };


  setActiveChannel = channel => {
    this.setState({ activeChannel: channel.id })
  }

  displayChannels = starredChannels =>
    starredChannels.length > 0 &&
      starredChannels.map(channel => (
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


  render () {
    const { starredChannels } = this.state;
    return (
      <MenuMenu className="menu">
        <MenuItem>
          <span>
            <Icon name="star" /> STARRED
            </span>{" "}
          ({starredChannels.length})
        </MenuItem>
        {this.displayChannels(starredChannels)}
      </MenuMenu>
    )
  }
}

export default connect(null, {setCurrentChannel, setPrivateChannel})(Starred);