import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import Bloggs from './container/blogs.jsx';
import AddEditBlog from './container/addEditBlog.jsx';
import Chat from '../../chat/ui/container/chat.jsx';
import Layout from '../../core/layout.jsx';
import Nav from '../../nav/ui/container/nav.jsx';

FlowRouter.route('/blogs', {
	name: "blogs",
  	action: function() {
  		mount(Layout, {
        header: <Nav />, 
        content: <Bloggs />,
        sidebar: <Chat />, 
      });
  	}
});

FlowRouter.route('/addBlog', {
	name: "addBlog",
  action: function() {
      mount(Layout, {
        header: <Nav />, 
        content: <AddEditBlog />,
        sidebar: <Chat />,  
      });
    } 
});

FlowRouter.route('/blogs/:blogId', {
	name: "blogView",
  	action: function(params) {
  		mount(Layout, {
        header: <Nav />, 
        content: <Bloggs />, 
        sidebar: <Chat />,
      });
  	}
});

FlowRouter.route('/editBlog/:editId', {
	name: "editBlog",
  	action: function(params) {
  		mount(Layout, {
        header: <Nav />, 
        content:<AddEditBlog />,
        sidebar: <Chat />, 
      });
  	}
});