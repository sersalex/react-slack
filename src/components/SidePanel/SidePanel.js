import React from "react";
import { Menu } from "semantic-ui-react";
import UserPanel from "./UserPanel";

class SidePanel extends React.Component {
  render() {
    const currentUser = this.props.currentUser;
    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{ background: '#3e113f', fontSize: '1.2rem'}}
      >
        <UserPanel currentUser={currentUser}></UserPanel>
      </Menu>
    )
  }
}

export default SidePanel;