import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';

import { Chats } from '../../api/chats.js';
import ChatData from './chatData';

export default class ChatPop extends Component{

    constructor() {
        super();
        this.popChat=this.popChat.bind(this);
    }

    popChat(){
        $(".popup-box").removeClass('popup-box-on');
        $('#'+this.props.user._id).addClass('popup-box-on');

        if(document.getElementById(this.props.user._id+1)){
            var element = document.getElementById(this.props.user._id+1);
            var containerHeight = element.clientHeight;
            var contentHeight = element.scrollHeight;
            element.scrollTop = (contentHeight - containerHeight);     
        }
        
    }

    renderChatData(){
        let user = this.props.user; 
        let currentUser = this.props.currentUser;
        let userId1 = currentUser._id;
        let userId2 = user._id;
        let chats = Chats.findOne({ _id: { $in: [userId1+userId2, userId2+userId1] } })

        let talks = false;
        let i = 0;
        if(chats!=undefined){       
            talks = true;
            return (
                <ChatData key={i++} user={user} currentUser={currentUser} talks={talks}/>
            )
        } else {
            
            talks = false;
            console.log(talks)
            return (
                <ChatData key={user._id} user={user} currentUser={currentUser} talks={talks}/>
            )
        }      
    }

    render(){
        return( 
            <div className="pop">      
                <li key={this.props.user._id} className="sidebar-brand">  
                        <a href="#" id="addClass" onClick={this.popChat}>
                            <input type="hidden" ref="user" value={this.props.user._id} />
                            <input type="hidden" ref="currentUser" value={this.props.currentUser._id} /> 
                            <span className="glyphicon glyphicon-comment"></span>
                            {this.props.user.username} 
                        </a>    
                </li>

                <div className="clearfix"></div>  

                <div>
                    {this.renderChatData()}
                </div>
            </div>
        )
    }
} 