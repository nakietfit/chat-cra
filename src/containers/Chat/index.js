import React, { Component } from 'react'
import PeopleList from '../../components/PeopleList';
import ChatHeader from '../../components/ChatHeader';
import ChatHistory from '../../components/ChatHistory';
import ChatMessage from '../../components/ChatMessage';
import ParseSDK from '../../helpers/parseSDK'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'

class Chat extends Component {
  render() {
    if (!ParseSDK.User.current()) {
      return <Redirect to="/login" />;
    }
    
    return (
      <div className="container clearfix">
        <PeopleList />
        {
          this.props.match.params.id && (
            <div className="chat">
              <ChatHeader />
              <ChatHistory />
              <ChatMessage />
            </div>
          )
        }
      </div>
    )
  }
}

export default withRouter(Chat)