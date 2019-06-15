import React from 'react'
import firebase from '../../firebase'
import md5 from 'md5'

import {Grid, Header, Icon, GridColumn, Form, Segment, FormInput, Button, Message} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: [],
    loading: false,
    userRef: firebase.database().ref('users')
  };

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  };

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: 'Fill in all fields' };
      this.setState({errors: errors.concat(error)});
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: 'Password is invalid' };
      this.setState({errors: errors.concat(error)});
      return false;
    } else {
      return true
    }
  };

  isFormEmpty = ({username, email, password, passwordConfirmation}) => {
    return !username.length || !email.length || !password.length || !passwordConfirmation.length
  };

  isPasswordValid = ({password, passwordConfirmation}) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false
    } else return password === passwordConfirmation;
  };

  displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({errors: [], loading: true});
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(user => {
          user.user.updateProfile({
            displayName: this.state.username,
            photoURL: `http://gravatar.com/avatar/${md5(user.user.email)}?d=identicon`
          })
          .then(() => {
            this.saveUser(user).then(() => {
              console.log('User saved');
              this.setState({loading: false});
            });
          })
          .catch(err => {
            console.log(err)
            this.setState({errors: this.state.errors.concat(err), loading: false})
          })
        })
        .catch(err => {
          this.setState({errors: this.state.errors.concat(err), loading: false});
          console.log(err)
        })
    }
  };

  handleInputError = (errors, inputName) => {
    return errors.some(e => e.message.toLowerCase().includes(inputName)) ? 'error' : ''
  };

  saveUser = createdUser => {
    return this.state.userRef.child(createdUser.user.uid)
      .set({
        name: createdUser.user.displayName,
        avatar: createdUser.user.photoURL
      });
  };

  render() {
    const {username, email, password, passwordConfirmation, errors, loading} = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <GridColumn style={{maxWidth: 450}}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange"/>
            Register for DevChat
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <FormInput
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                type="text"
                value={username}
                onChange={this.handleChange}
              />
              <FormInput
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                type="email"
                value={email}
                className={this.handleInputError(errors, 'email')}
                onChange={this.handleChange}
              />
              <FormInput
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={password}
                className={this.handleInputError(errors, 'password')}
                onChange={this.handleChange}
              />
              <FormInput
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password Confirmation"
                type="password"
                value={passwordConfirmation}
                onChange={this.handleChange}
              />

              <Button disabled={loading} className={loading ? 'loading' : ''} fluid color="orange" size="large">
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>Already a user? <Link to="/login">Login</Link></Message>
        </GridColumn>
      </Grid>
    )
  }
}

export default Register;
