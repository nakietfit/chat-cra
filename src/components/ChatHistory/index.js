import React, { Component } from 'react'
import Message from '../Message'
import ParseSDK from '../../helpers/parseSDK'
import { withRouter } from 'react-router'

function createBlankPointerTo(ClassName, objectId) {
  const ParseObject = ParseSDK.Object.extend(ClassName);
  return ParseObject.createWithoutData(objectId);
};

class ChatHistory extends Component {
  state = {
    message_list: []
  }

  subscription = null

  getMessageList = async (id) => {
    const currentUser = ParseSDK.User.current();
    const sndMsg = new ParseSDK.Query('Message');
    sndMsg.equalTo('senderId', currentUser.id);
    sndMsg.equalTo('receiverId', id);
    const rcvMsg = new ParseSDK.Query('Message');
    rcvMsg.equalTo('senderId', id);
    rcvMsg.equalTo('receiverId', currentUser.id);
    const msg = ParseSDK.Query.or(sndMsg, rcvMsg);
    const res = await msg.find();
    const msgList = res.map(e => e.toJSON());
    this.setState({ message_list: msgList });

    this.subscription = await msg.subscribe();
    this.subscription.on('open', () => {
      console.log('subscription opened');
    });
    this.subscription.on('create', async (msg) => {
      let message = {
        message: msg.attributes.message,
        senderId: msg.attributes.senderId,
        receiverId: msg.attributes.receiverId,
        createdAt: msg.attributes.createdAt.toString()
      }
      
      const cvsQuery = new ParseSDK.Query('Conversation');
      cvsQuery.equalTo('userId', currentUser.id);
      cvsQuery.equalTo('chatter', createBlankPointerTo('User', id));
      let cvs = await cvsQuery.first();
      if (cvs) {
        cvs.set("latestChatTime", msg.attributes.createdAt);
        await cvs.save();
      }
      if (!cvs) {
        cvs = new ParseSDK.Object('Conversation');
        cvs.set('userId', currentUser.id);
        cvs.set('chatter', createBlankPointerTo('User', id));
        cvs.set("latestChatTime", msg.attributes.createdAt);
        await cvs.save();
      }

      const ccvsQuery = new ParseSDK.Query('Conversation');
      ccvsQuery.equalTo('userId', id);
      ccvsQuery.equalTo('chatter', createBlankPointerTo('User', currentUser.id));
      let ccvs = await ccvsQuery.first();
      if (ccvs) {
        ccvs.set("latestChatTime", msg.attributes.createdAt);
        await ccvs.save();
      }
      if (!ccvs) {
        ccvs = new ParseSDK.Object('Conversation');
        ccvs.set('userId', id);
        ccvs.set('chatter', createBlankPointerTo('User', currentUser.id));
        ccvs.set("latestChatTime", msg.attributes.createdAt);
        await ccvs.save();
      }

      this.setState({ message_list: this.state.message_list.concat(message) })
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.setState({ message_list: [] });
      this.getMessageList(nextProps.match.params.id);
    }
  }

  componentDidMount() {
    this.getMessageList(this.props.match.params.id);
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