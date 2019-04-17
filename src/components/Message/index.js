import React, { Component, Fragment } from 'react'
import ParseSDK from '../../helpers/parseSDK'

export default class Message extends Component {
  render() {
    const { message } = this.props
    const currentUser = ParseSDK.User.current();

    return (
      <Fragment>
        {
          message.senderId === currentUser.id ? (
            <li className="clearfix">
              <div className="message-data align-right">
                <span className="message-data-time">{message.createdAt}</span> &nbsp; &nbsp;
                <span className="message-data-name">{message.senderId}</span> <i className="fa fa-circle me"></i>
              </div>
              <div className="message my-message float-right">{message.message}</div>
            </li>
          ) : (
            <li>
              <div className="message-data">
                <span className="message-data-name"><i className="fa fa-circle online"></i> {message.senderId}</span>
                <span className="message-data-time">{message.createdAt}</span>
              </div>
              <div className="message other-message">{message.message}</div>
            </li>
          )
        }
      </Fragment>
    )
  }
}
