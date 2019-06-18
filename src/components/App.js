import React from 'react';
import { connect } from 'react-redux';
import {Grid, GridColumn} from 'semantic-ui-react';
import './App.css';
import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPannel from './MetaPannel/MetaPannel';

function App({currentUser}) {
  return (
    <Grid columns="equal" className="app" style={{background: '#eee'}}>
      <ColorPanel/>
      <SidePanel currentUser={currentUser}/>
      <GridColumn style={{marginLeft: 320}}>
        <Messages />
      </GridColumn>
      <GridColumn width={4}>
        <MetaPannel />
      </GridColumn>

    </Grid>
  );
}

const mapStateToProps = state => ({
  currentuser: state.user.currentUser
})

export default connect(mapStateToProps)(App);
