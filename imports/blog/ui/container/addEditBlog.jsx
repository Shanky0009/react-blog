import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Blogs } from '../../api/blogs.js';
import AddEditBlog from '../components/addEditBlog';

export default createContainer(() => {
	if(FlowRouter.getParam("editId")){
		blog = Blogs.findOne(FlowRouter.getParam("editId"))
	} else {
		blog = null;
	}
	return {
			blog,
			currentUser: Meteor.user()
	}
}, AddEditBlog);