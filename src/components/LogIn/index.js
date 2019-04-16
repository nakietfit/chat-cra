import React, { Component } from 'react'
import ParseSDK from '../../helpers/parseSDK'

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
      <form onSubmit={this.handleSubmit}>
        <input type="email" ref={this.email} placeholder="Email" />
        <input type="password" ref={this.password} placeholder="Password" />
        <button>Log in</button>
      </form>
    )
  }
}
