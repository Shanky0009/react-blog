import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import Profile from './container/profile.jsx';
import ProfileUpdate from './container/profileUpdate.jsx';
import Chat from '../../chat/ui/container/chat.jsx';
import Layout from '../../core/layout.jsx';
import Nav from '../../nav/ui/container/nav.jsx';


FlowRouter.route('/profile/:profileName', {
	name: "profile",
    action: function() {
    	mount(Layout, {
	        header: <Nav />, 
	        content: <Profile />,
	        sidebar: <Chat />, 
	      });
    }
});

FlowRouter.route('/setting', {
	name: "profileSetting",
    action: function() {
    	mount(Layout, {
	        header: <Nav />, 
	        content: <ProfileUpdate />,
	        sidebar: <Chat />, 
	      });
    }
});