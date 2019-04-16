import React, { Component } from 'react'
import ParseSDK from '../../helpers/parseSDK'

export default class ChatMessage extends Component {
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
    msg.set("receiverId", "rrQZdINvYD");

    await msg.save();
    this.messageToSend.current.value = "";
  }

  render() {
    return (
      <div class="chat-message clearfix">
        <textarea name="message-to-send" ref={this.messageToSend} placeholder ="Type your message" rows="3"></textarea>
                
        <i class="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
        <i class="fa fa-file-image-o"></i>
        
        <button onClick={this.handleClick}>Send</button>
      </div>
    )
  }
}
