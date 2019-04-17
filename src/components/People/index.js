import React, { Component } from 'react'

export default class People extends Component {
  render() {
    const { people } = this.props

    // let statusClass = ''
    // if (people.status == 'online') {
    //   statusClass = 'fa fa-circle online'
    // }
    // if (people.status != 'online') {
    //   statusClass = 'fa fa-circle offline'
    // }

    return (
      <li className="clearfix">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
        <div className="about">
          <div className="name">{people.hoTen}</div>
          <div className="status">
            <i className='fa fa-circle online'></i> online
          </div>
        </div>
      </li>
    )
  }
}
