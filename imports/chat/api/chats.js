import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check  } from 'meteor/check';

import './chatsSchema.js';

export const Chats = new Mongo.Collection('chats'); 

Chats.attachSchema( ChatsSchema );

if(Meteor.isServer) {
	Meteor.publish('chats', function chatPublication(){
		return Chats.find({});
	});
}

Meteor.methods({
	'users.chat'(chatMessage, user, currentUser){
		if(! this.userId){
			throw new Meteor.Error('not-authorized');
		}
		
		let userId1=currentUser._id;
		let userId2=user._id;
		let chats = Chats.findOne({ _id: { $in: [userId1+userId2, userId2+userId1] } });

		let talks={
			chatMessage:chatMessage,
		};

		chatData = {
			_id:userId1+userId2,
			userId1 : userId1,
			userId2 : userId2,
			talks : talks,
		}


		if(chats!=undefined){

			Chats.update({_id:chats._id},{ $push: { talks: talks } } ,{ validate: false });
		} else {

			Chats.insert({ 
				_id: userId1+userId2,
				userId1:userId1,
				userId2:userId2,
				talks:[talks],
			},{ 
				validate: false 
			});	
		}
	},
})