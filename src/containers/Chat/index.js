import React, { Component } from 'react'
import PeopleList from '../../components/PeopleList';
import ChatHeader from '../../components/ChatHeader';
import ChatHistory from '../../components/ChatHistory';
import ChatMessage from '../../components/ChatMessage';

export default class Chat extends Component {
  render() {
    return (
      <div class="container clearfix">
        <PeopleList />
        <div class="chat">
          <ChatHeader />
          <ChatHistory />
          <ChatMessage />
        </div>
      </div>
    )
  }
}
