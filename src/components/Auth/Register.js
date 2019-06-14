import React from 'react'
import {Grid, Header, Icon, GridColumn, Form, Segment, FormInput, Button, Message} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class Register extends React.Component {
  state = {

  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  };

  render() {
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <GridColumn style={{maxWidth: 450}}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange"/>
            Register for DevChat
          </Header>
          <Form size="large">
            <Segment stacked>
              <FormInput
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                type="text"
                onChange={this.handleChange}
              />
              <FormInput
                fluid
                name="email"
                icon="email"
                iconPosition="left"
                placeholder="Email Address"
                type="email"
                onChange={this.handleChange}
              />
              <FormInput
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={this.handleChange}
              />
              <FormInput
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password Confirmation"
                type="password"
                onChange={this.handleChange}
              />

              <Button fluid color="orange" size="large">
                Submit
              </Button>
            </Segment>
          </Form>
          <Message>Already a user? <Link to="/login">Login</Link></Message>
        </GridColumn>
      </Grid>
    )
  }
}

export default Register;
