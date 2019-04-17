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
      <li class="clearfix">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
        <div class="about">
          <div class="name">{people.hoTen}</div>
          <div class="status">
            <i class='fa fa-circle online'></i> online
          </div>
        </div>
      </li>
    )
  }
}
