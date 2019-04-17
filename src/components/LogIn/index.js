import React, { Component, Fragment } from 'react'
import ParseSDK from '../../helpers/parseSDK'
import { Link } from 'react-router-dom'

export default class LogIn extends Component {
  constructor(props) {
    super(props)

    this.email = React.createRef();
    this.password = React.createRef();
  }

  handleSubmit = async e => {
    e.preventDefault();
    const user = await ParseSDK.User.logIn(this.email.current.value, this.password.current.value);
  };

  render() {
    return (
      <Fragment>
        <Link to="/signup">Sign up</Link>
        <form onSubmit={this.handleSubmit}>
          <input type="email" ref={this.email} placeholder="Email" />
          <input type="password" ref={this.password} placeholder="Password" />
          <button>Log in</button>
        </form>
      </Fragment>
    )
  }
}
