import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import Login from './components/login.jsx';
import SignUp from './components/signup.jsx';
import Layout from '../../core/layout.jsx';
import Nav from '../../nav/ui/container/nav.jsx';


FlowRouter.route( '/login', {
  name: 'Login',
  action() {
    mount(Layout, {
    	header: <Nav />,
    	content: <Login/>,
    });
  }
});

FlowRouter.route( '/sign-up', {
  name: 'SignUp',
  action() {
    mount(Layout, {
    	header: <Nav />,
    	content: <SignUp/>,
    });
  }
});