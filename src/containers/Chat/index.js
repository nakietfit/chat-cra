import React, { Component } from 'react'
import PeopleList from '../../components/PeopleList';
import ChatHeader from '../../components/ChatHeader';
import ChatHistory from '../../components/ChatHistory';
import ChatMessage from '../../components/ChatMessage';
import ParseSDK from '../../helpers/parseSDK'
import { Redirect } from 'react-router-dom'

export default class Chat extends Component {
  render() {
    return (
      <div class="container clearfix">
        <PeopleList />
        {
          ParseSDK.User.current() ? (
            <div class="chat">
              <ChatHeader />
              <ChatHistory />
              <ChatMessage />
            </div>
          ) : (
            <Redirect to="/login" />
          )
        }
      </div>
    )
  }
}
