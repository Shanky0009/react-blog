import { Meteor } from 'meteor/meteor';

import { CommentSchema } from './commentsSchema.js'
import { InnerCommentSchema } from './innerCommentSchema.js'

BlogsSchema = new SimpleSchema({
	"title": { 
		type: String, 
		label: "Blog Title",
	},
	"content": { 
		type: String, 
		label: "Blog Content",
	},
	"owner": { 
		type: String, 
		label: "Blog Owner ID",
		autoValue: function() {
	      	if (this.userId) {
	        	return this.userId;
	      	} else {
	        	this.unset();
	      	}
	    } 
	},
	"username": { 
		type: String, 
		label: "Blog Owners Name",
		autoValue: function() {
	      	if (this.userId) {
	      		username = Meteor.users.findOne(this.userId).username
	        	return username;
	      	} else {
	        	this.unset();
	      	}
	    } 
	},
	"comments": { 
		type: [CommentSchema], 
		label: "Blog Comments", 
		optional: true 
	},
	"blogIndex":{
		type: Number,
		label: "Blog Number",
		autoValue: function() {
			var blogIndex = this.field("blogIndex");
			if (this.isInsert) {
			  	return blogIndex.value;
			}
		} 
	},
	"blogNo":{
		type: String,
		label: "Blog Index",
		autoValue: function() {
			var blogIndex = this.siblingField("blogIndex");
			if (this.isInsert) {
				blogNo = Math.round((blogIndex.value*54321)/100);
			  	return blogNo;
			}
			
		} 
	},
	"createdAt": { 
		type: Date, 
		label: "Blog Date",
		autoValue: function() {
	      	if (this.isInsert) {
	        	return new Date();
	      	} else {
	        	this.unset();
	      	}
	    } 
	},
	"updatedAt": {
	    type: Date,
	    autoValue: function() {
	      if (this.isUpdate) {
	        return new Date();
	      }
	    },
	    denyInsert: true,
	    optional: true
	},
});

cmntRmSchema = InnerCommentSchema.pick(['blogId', 'commentId', 'blogOwner', 'owner']);
InrCmntRmSchema = InnerCommentSchema.pick(['_id','blogId', 'commentId', 'blogOwner', 'owner']);
