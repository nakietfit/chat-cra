import React, { Component, Fragment } from 'react'
import ParseSDK from '../../helpers/parseSDK'
import { Link, Redirect } from 'react-router-dom'

export default class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      reload: false
    }

    this.email = React.createRef();
    this.password = React.createRef();
    this.name = React.createRef();
  }

  handleSubmit = async e => {
    e.preventDefault();
    var user = new ParseSDK.User();
    user.set("username", this.email.current.value);
    user.set("password", this.password.current.value);
    user.set("hoTen", this.name.current.value);

    try {
      await user.signUp();
      this.setState({ reload: !this.state.reload });
    } catch (error) {
      console.log("Error: " + error.code + " " + error.message);
    }
  };

  render() {
    if (ParseSDK.User.current()) {
      return <Redirect to="/" />;
    }

    return (
      <Fragment>
        <Link to="/login">Log in</Link>
        <form onSubmit={this.handleSubmit}>
          <input type="email" ref={this.email} placeholder="Email" />
          <input type="password" ref={this.password} placeholder="Password" />
          <input type="text" ref={this.name} placeholder="Name" />
          <button>Sign up</button>
        </form>
      </Fragment>
    )
  }
}
