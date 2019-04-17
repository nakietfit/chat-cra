import React, { Component, Fragment } from 'react'
import ParseSDK from '../../helpers/parseSDK'
import { Link } from 'react-router-dom'

export default class SignUp extends Component {
  constructor(props) {
    super(props)

    this.email = React.createRef();
    this.password = React.createRef();
  }

  handleSubmit = async e => {
    e.preventDefault();
    var user = new ParseSDK.User();
    user.set("username", this.email.current.value);
    user.set("password", this.password.current.value);

    try {
      await user.signUp();
    } catch (error) {
      console.log("Error: " + error.code + " " + error.message);
    }
  };

  render() {
    return (
      <Fragment>
        <Link to="/login">Log in</Link>
        <form onSubmit={this.handleSubmit}>
          <input type="email" ref={this.email} placeholder="Email" />
          <input type="password" ref={this.password} placeholder="Password" />
          <button>Sign up</button>
        </form>
      </Fragment>
    )
  }
}
