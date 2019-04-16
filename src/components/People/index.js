import React, { Component } from 'react'

export default class People extends Component {
  render() {
    const { people } = this.props

    let statusClass = ''
    if (people.status == 'online') {
      statusClass = 'fa fa-circle online'
    }
    if (people.status != 'online') {
      statusClass = 'fa fa-circle offline'
    }

    return (
      <li class="clearfix">
        <img src={people.avatar} alt="avatar" />
        <div class="about">
          <div class="name">{people.name}</div>
          <div class="status">
            <i class={statusClass}></i> {people.status}
          </div>
        </div>
      </li>
    )
  }
}
