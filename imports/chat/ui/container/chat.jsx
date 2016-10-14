import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Chat from '../components/chat';
import { Chats } from '../../api/chats.js';

Meteor.subscribe('chats');

export default createContainer(() => {
	return {
		users: Meteor.users.find().fetch(),
		currentUser: Meteor.user()
	}
}, Chat);