import React from 'react';
import firebase from '../../firebase'
import { MenuMenu, MenuItem, Icon } from 'semantic-ui-react';

class DirectMessages extends React.Component {
  state = {
    user: this.props.currentUser,
    users: [],
    usersRef: firebase.database().ref('users'),
    connectedRef: firebase.database().ref('.info/connected'),
    presenceRef: firebase.database().ref('presence')
  }

  componentDidMount() {
    if (this.state.user) {
      this.addListeners(this.state.user.uid);
    }
  }

  addListeners = currentUserUid => {
    let loadedUsers = [];

    this.state.usersRef.on('child_added', snap => {
      if (currentUserUid !== snap.key) {
        let user = snap.val();
        user['uid'] = snap.key;
        user['status'] = 'offline';
        loadedUsers.push(user);
        this.setState({ users: loadedUsers })
      }
    });

    this.state.connectedRef.on('value', snap => {
      if (snap.val() === true) {
        const ref = this.state.presenceRef.child(currentUserUid);
        ref.set(true)
        ref.onDisconnect().remove(err => {
          if (err !== null) {
            console.log(err)
          }
        })
      }
    });

    this.state.presenceRef.on('child_added', snap => {
      if (currentUserUid !== snap.key) {
        this.addStatusToUser(snap.key)
      }
    })

    this.state.presenceRef.on('child_removed', snap => {
      if (currentUserUid !== snap.key) {
        this.addStatusToUser(snap.key, false)
      }
    })
  }

  addStatusToUser = (userId, connect = true) => {
    const updatedUsers = this.state.users.reduce((acc , user) => {
      if (user.uid === userId) {
        user['status'] = `${ connect ? 'online' : 'offline'}`
      }
      return acc.concat(user)
    }, []);

    this.setState({ users: updatedUsers})
  }

  isUserOnline = user => user.status === 'online'


  render() {
    const { users, user } = this.state;
    return (
      <MenuMenu className="menu">
        <MenuItem>
          <span>
            <Icon name="mail"/> DirectMessages
          </span>{' '}
          ({users.length})
        </MenuItem>
        {/* Users to Send Direct Messages */}
        {users.map(user => (
          <MenuItem key={user.uid} onClick={() => console.log(user)} style={{opacity: 0.7, fontStyle: 'italic'}}>
            <Icon
              name="circle"
              color={this.isUserOnline(user) ? 'green' : 'red'}
            />
            @ {user.name}
          </MenuItem>
        ))}
      </MenuMenu>
    )
  }
}

export default DirectMessages;
