import React, { Component, Fragment } from 'react'
import ParseSDK from '../../helpers/parseSDK'

export default class Message extends Component {
  render() {
    const { message } = this.props
    const currentUser = ParseSDK.User.current();

    return (
      <Fragment>
        {
          message.senderId == currentUser.id ? (
            <li class="clearfix">
              <div class="message-data align-right">
                <span class="message-data-time">{message.createdAt}</span> &nbsp; &nbsp;
                <span class="message-data-name">{message.senderId}</span> <i class="fa fa-circle me"></i>
              </div>
              <div class="message my-message float-right">{message.message}</div>
            </li>
          ) : (
            <li>
              <div class="message-data">
                <span class="message-data-name"><i class="fa fa-circle online"></i> {message.senderId}</span>
                <span class="message-data-time">{message.createdAt}</span>
              </div>
              <div class="message other-message">{message.message}</div>
            </li>
          )
        }
      </Fragment>
    )
  }
}
