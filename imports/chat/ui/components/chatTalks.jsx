import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';

import { Chats } from '../../api/chats.js';


export default class ChatTalks extends Component{

    render(){
        return(                               
          <div className="direct-chat-messages" >
              
              
                <div className="direct-chat-info">
                  <span className="direct-chat-name pull-left">{this.props.talk.userName}</span>
                </div>
                <img alt="iamgurdeeposahan" src="/images/images.png" />
                <div className="direct-chat-text">
                  {this.props.talk.chatMessage}
                </div>
                <div className="clearfix">
                </div>
             
          </div> 
        )
    }
} 