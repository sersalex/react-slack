import React from 'react';
import firebase from '../../firebase';
import { Grid, GridColumn, GridRow, Header, HeaderContent, Icon, Dropdown } from 'semantic-ui-react';

class UserPanel extends React.Component {
  state = {
    user: this.props.currentUser
  }

  dropdownOptions = () => [
    {
      key: 'user',
      text: (<span> Вы вошли как <strong>{this.state.user}</strong></span>),
      disabled: true
    },
    {
      key: 'avatar',
      text: <span>Сменить аватар</span>,
      disabled: true
    },
    {
      key: 'signout',
      text: <span onClick={this.handleSignout}>Выйти</span>
    }
  ]

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('signOut')
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Grid>
        <GridColumn>
          <GridRow style={{padding: '1.2em', margin: 0}}>
            {/* App Header */}
            <Header inverted floated="left" as="h2">
              <Icon name="code"/>
              <HeaderContent>
                DevChat
              </HeaderContent>
            </Header>
          </GridRow>

          {/* User Dropdown */}
          <Header style={{padding: '0.25em'}} as="h4" inverted>
            <Dropdown
             trigger={<span>{this.state.user}</span>}
             options={this.dropdownOptions()}>

            </Dropdown>
          </Header>
        </GridColumn>
      </Grid>
    )
  }
}

export default UserPanel;