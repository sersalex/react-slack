import React from 'react';
import { Menu, MenuItem, Icon } from 'semantic-ui-react';

class Channels extends React.Component {
  state = {
    channels: []
  }

  render() {
    const { channels } = this.state;
    return (
      <Menu style={{ paddingBottom: '2em', background: '#3e113f' }} >
        <MenuItem>
          <span>
            <Icon name="exchange"/> CHANNELS
          </span>{" "}
          ({channels.length}) <Icon name="add"/>
        </MenuItem>
      {/* Channels */}
      </Menu>
    )
  }
}

export default Channels;