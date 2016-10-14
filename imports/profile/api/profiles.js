import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check  } from 'meteor/check';

import './profileSchema.js';

if(Meteor.isServer) {
	Meteor.publish("users", function(){
 		return Meteor.users.find();
	});
	 Meteor.startup(function () {

	 	Meteor.methods({
		 	profilePic:function(file){
				var fs = require('fs')
				var img = "data:image/png;base64"+file;
				var ext = img.split(';')[0].match(/jpeg|png|gif/)[0];
				fs.writeFile(process.env["PWD"] + "/public/images/"+Meteor.userId()+'.'+ext, new Buffer(file), function(err) {
		      if (err) {
		        throw (new Meteor.Error(500, 'Failed to save file.', err));
		      } else {	
		        console.log('The file was saved ');
		      }
			  }); 
			}
		})
	});

	

}

Meteor.methods({
	'users.profileUpdate'(profileData){


		if(! this.userId){
			throw new Meteor.Error('not-authorized');
		}

		Meteor.users.update({_id:this.userId}, { 
			$set: { 
				profile: profileData 
			} 
		},{
			validate: false
		});
			
	},
	
	
})