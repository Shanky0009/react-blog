import React from 'react';
import { mount } from 'react-mounter';
// import { FlowRouter } from 'meteor/kadira:flow-router';


import Home from './components/home.jsx';
import Layout from '../../core/layout.jsx';
import Nav from '../../nav/ui/container/nav.jsx';

FlowRouter.route( '/', {
  name: 'Home',
  action() {
    mount(Layout, {
    	header: <Nav />,
    	content: <Home />,
    });
  }
});