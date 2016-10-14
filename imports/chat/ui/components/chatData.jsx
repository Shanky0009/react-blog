import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';

import { Chats } from '../../api/chats.js';
import ChatTalks from './chatTalks';

export default class ChatData extends Component{

    constructor() {
        super();
        this.state = {}
        this.removePopup=this.removePopup.bind(this);
        this.sendChat=this.sendChat.bind(this);
        this.updateScroll=this.updateScroll.bind(this);
    }

    removePopup() {
          $('#'+this.props.user._id).removeClass('popup-box-on');
    }

    sendChat(event){

        event.preventDefault();
        if (event.keyCode === 13)
        {
          currentUser = this.props.currentUser;
          user = this.props.user;
          message = this.refs.message.value.trim()
          
          Meteor.call('users.chat', message, user, currentUser , function(err){
            if(err){
              console.log(err)
            }
          });

          this.setState.bind(this)
          this.intervalId  = setInterval(this.updateScroll.bind(this), 1000);
          this.refs.message.value = "";  
        }
        
    }

    


    updateScroll(){
      if(document.getElementById(this.props.user._id+1)){
        var element = document.getElementById(this.props.user._id+1);
        var containerHeight = element.clientHeight;
        var contentHeight = element.scrollHeight+200;
        element.scrollTop = contentHeight - containerHeight;
      }
      clearInterval(this.intervalId)
    }


    componentWillMount(){
        this.force = setInterval(this.forceUpdate.bind(this), 1000);
        this.updateScroll();
    }

    componentWillUnmount(){
       clearInterval(this.force);
    }

    

    renderChatTalks(){
        let user = this.props.user; 
        let currentUser = this.props.currentUser; 
        let userId1 = currentUser._id;
        let userId2 = user._id;

        let i=1;
        let chats = Chats.findOne({ _id: { $in: [userId1+userId2, userId2+userId1] } })

        if(chats!=undefined){
          talks = chats.talks;
  
          return talks.map((talk) => {
            return (
                <ChatTalks key={i++} talk={talk} />
            ) 
          });
        }  
    }

    render(){
        return( 
            <div className="popData" id="popData">      
                    <div className="popup-box chat-popup" id={this.props.user._id}>
                      <div className="popup-head">
                        <div className="popup-head-left pull-left"><img src="/images/images.png" alt={this.props.user.username} /> {this.props.user.username}</div>
                            <div className="popup-head-right pull-right">
                                
                                <button data-widget="remove" id="removeClass" onClick={this.removePopup} className="chat-header-button pull-right" type="button">
                                    <i className="glyphicon glyphicon-off"></i>
                                </button>
                            </div>
                        </div>
                        
                        {this.props.talks ?
                          <div className="popup-messages" id={this.props.user._id+'1'}>                   
                            {this.renderChatTalks()}
                          </div>
                        :
                          ''
                        }
                            
                        <div className="popup-messages-footer">
                          <textarea id="status_message" ref="message" placeholder="Type a message..." rows="10" cols="40" name="message" onKeyUp={this.sendChat}></textarea>
                        </div>
                    </div>
                </div>  
        )
    }
} 