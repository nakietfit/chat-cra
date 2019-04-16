import React, { Component } from 'react'
import People from '../People'
import Search from '../Search'

export default class PeopleList extends Component {
  people_list = [
    {
      avatar: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg",
      name: "Vincent Porter",
      status: "online"
    },
    {
      avatar: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg",
      name: "Aiden Chavez",
      status: "left 7 mins ago"
    },
    {
      avatar: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg",
      name: "Mike Thomas",
      status: "online"
    }
  ]

  render() {
    return (
      <div class="people-list" id="people-list">
        <Search />
        <ul class="list">
          {
            this.people_list.map((e, i) => <People key={i} people={e} />)
          }
        </ul>
      </div>
    )
  }
}
