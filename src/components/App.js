import React from 'react';
import { connect } from "react-redux";
import {Grid, GridColumn} from 'semantic-ui-react';
import './App.css';
import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPannel from './MetaPannel/MetaPannel';

function App({ currentUser, currentChannel, isPrivateChannel }) {
  return (
    <Grid columns="equal" className="app" style={{background: '#eee'}}>
      <ColorPanel/>
      <SidePanel
        key={currentUser && currentUser.uid}
        currentUser={currentUser}
      />
      <GridColumn style={{marginLeft: 320}}>
        <Messages
          key={currentChannel && currentChannel.id}
          currentChannel={currentChannel}
          currentUser={currentUser}
        />
      </GridColumn>
      <GridColumn width={4}>
        <MetaPannel />
      </GridColumn>

    </Grid>
  );
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel
});

export default connect(mapStateToProps)(App);
