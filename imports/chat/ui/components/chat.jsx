 import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import ChatPop from './chatPop';

export default class Chat extends Component{

    constructor() {
        super();
        this.toggleChat=this.toggleChat.bind(this);
        this.popChat=this.popChat.bind(this);
    }

    toggleChat(event){
        event.preventDefault();
        $("#wrapper").toggleClass("toggled");
    }

    popChat(){
        $('#qnimate').addClass('popup-box-on');
    }

    renderUsers(){
        let users = this.props.users; 
        let currentUser = this.props.currentUser;     

        if(currentUser){
            return users.map((user) => {
                if(user._id!=currentUser._id){
                    return (
                        <ChatPop key={user._id} user={user} currentUser={currentUser} />      
                    )
                }    
            });
        }
        
    }

    render(){
        return(       
            <div id="wrapper">

                <div id="sidebar-wrapper">
                    <ul className="sidebar-nav">
                        {this.renderUsers()} 
                    </ul>
                </div>
                <div className="clearfix"></div>
            </div>
        )
    }
} 