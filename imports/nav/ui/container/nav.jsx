import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Nav from '../components/nav';

export default createContainer(() => {
	return {currentUser: Meteor.user()}
}, Nav);