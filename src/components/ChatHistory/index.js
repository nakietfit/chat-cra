import React, { Component } from 'react'
import Message from '../Message'
import ParseSDK from '../../helpers/parseSDK'

export default class ChatHistory extends Component {
  state = {
    message_list: []
  }

  getMessageList = async () => {
    const currentUser = ParseSDK.User.current();
    const sndMsg = new ParseSDK.Query('Message');
    sndMsg.equalTo('senderId', currentUser.id);
    const rcvMsg = new ParseSDK.Query('Message');
    rcvMsg.equalTo('receiverId', currentUser.id);
    const msg = ParseSDK.Query.or(sndMsg, rcvMsg);
    const res = await msg.find();
    const msgList = res.map(e => e.toJSON());
    this.setState({ message_list: msgList });
  }

  componentDidMount() {
    this.getMessageList();
  }

  render() {
    return (
      <div class="chat-history">
        <ul>
          {
            this.state.message_list.map((e, i) => <Message key={i} message={e} />)
          }
        </ul>
      </div>
    )
  }
}
