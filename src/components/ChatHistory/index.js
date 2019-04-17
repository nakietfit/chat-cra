import React, { Component } from 'react'
import Message from '../Message'
import ParseSDK from '../../helpers/parseSDK'
import { withRouter } from 'react-router'

class ChatHistory extends Component {
  state = {
    message_list: []
  }

  subscription = null

  getMessageList = async () => {
    const currentUser = ParseSDK.User.current();
    const sndMsg = new ParseSDK.Query('Message');
    sndMsg.equalTo('senderId', currentUser.id);
    sndMsg.equalTo('receiverId', this.props.match.params.id);
    const rcvMsg = new ParseSDK.Query('Message');
    rcvMsg.equalTo('senderId', this.props.match.params.id);
    rcvMsg.equalTo('receiverId', currentUser.id);
    const msg = ParseSDK.Query.or(sndMsg, rcvMsg);
    const res = await msg.find();
    const msgList = res.map(e => e.toJSON());
    this.setState({ message_list: msgList });

    this.subscription = await msg.subscribe();
    this.subscription.on('open', () => {
      console.log('subscription opened');
    });
    this.subscription.on('create', (msg) => {
      let message = {
        message: msg.attributes.message,
        senderId: msg.attributes.senderId,
        receiverId: msg.attributes.receiverId,
        createdAt: msg.attributes.createdAt.toString()
      }
      this.setState({ message_list: this.state.message_list.concat(message) })
    });
  }

  componentDidMount() {
    this.getMessageList();
  }

  componentWillUnmount() {
    this.subscription.on('close', () => {
      console.log('subscription closed');
    });
    this.subscription.unsubscribe();
  }

  render() {
    return (
      <div className="chat-history">
        <ul>
          {
            this.state.message_list.map((e, i) => <Message key={i} message={e} />)
          }
        </ul>
      </div>
    )
  }
}

export default withRouter(ChatHistory)