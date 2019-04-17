import React, { Component } from 'react'
import ParseSDK from '../../helpers/parseSDK'
import { withRouter } from 'react-router'

class ChatMessage extends Component {
  constructor(props) {
    super(props);

    this.messageToSend = React.createRef();
  }

  handleClick = async () => {
    const currentUser = ParseSDK.User.current();
    const Message = ParseSDK.Object.extend("Message");
    const msg = new Message();

    msg.set("message", this.messageToSend.current.value);
    msg.set("senderId", currentUser.id);
    msg.set("receiverId", this.props.match.params.id);

    await msg.save();
    this.messageToSend.current.value = "";
  }

  render() {
    return (
      <div className="chat-message clearfix">
        <textarea name="message-to-send" ref={this.messageToSend} placeholder ="Type your message" rows="3"></textarea>
                
        <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
        <i className="fa fa-file-image-o"></i>
        
        <button onClick={this.handleClick}>Send</button>
      </div>
    )
  }
}

export default withRouter(ChatMessage)