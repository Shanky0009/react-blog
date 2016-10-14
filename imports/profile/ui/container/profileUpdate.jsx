import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data';

import { Profiles } from '../../api/profiles.js';
import ProfileUpdate from '../components/profileUpdate';

Meteor.subscribe("users");

export default createContainer(() => {
	
	return {
		currentUser: Meteor.user()
	}
}, ProfileUpdate);