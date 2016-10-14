import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Blogs } from '../../api/blogs.js';
import Bloggs from '../components/blogs';

Meteor.subscribe('blogs');

export default createContainer(() => {
	if(FlowRouter.getParam("blogId")){
		oneBlog = true;
		blogs = [Blogs.findOne(FlowRouter.getParam("blogId"))];
	} else {
		oneBlog = false;
		blogs = Blogs.find({}, { sort: { createdAt: -1} }).fetch()
	}
	
	return {
			blogs,
			oneBlog,
			currentUser: Meteor.user()
	}
}, Bloggs);