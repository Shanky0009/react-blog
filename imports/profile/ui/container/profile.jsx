import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data';

import { Profiles } from '../../api/profiles.js';
import Profile from '../components/profile';

Meteor.subscribe("users");

export default createContainer(() => {
	
	if(Meteor.users.findOne({username:FlowRouter.getParam("profileName")}) != undefined){
		return {
			user: Meteor.users.findOne({username:FlowRouter.getParam("profileName")}),
			currentUser: Meteor.user()
		}
	}
	
}, Profile);