import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check  } from 'meteor/check';

import './blogsSchema.js';

export const Blogs = new Mongo.Collection('blogs'); 

Blogs.attachSchema( BlogsSchema );

if(Meteor.isServer) {
	Meteor.publish('blogs', function blogPublication(){
		return Blogs.find({});
	});
}


Meteor.methods({
	'blogs.insert'(title, content, blogId, userId, blogIndex){

		blogData = {
			title: title,
			content:content,
			blogIndex:blogIndex
		}
		
		if(blogId == '') {
			Blogs.insert( blogData, { validate: false }, function(error, result) {
				
				if(error){
					throw Meteor.Error("Invalid Data");
				}
			});
		} else if (userId==Blogs.findOne(blogId).owner) {
			Blogs.update(blogId, { $set: {title : title, content : content} }, { validate: false }, function(error, result) {
				
				if(error){
					throw Meteor.Error("Invalid Data");
				}
			});
		}

		if(! this.userId){
			throw new Meteor.Error('not-authorized');
		}
		
	},
	'blogs.comment'(comment, blogId, blogOwner){
		Blogs.update(blogId, { 
			$push: {
				comments: {
					comment: comment, 
					_id: Math.random(), 
					blogId:blogId, 
					blogOwner:blogOwner, 
				}  
			}
		},{ 
			validate: false 
		});
	},
	'blogs.innerComment'(text, commentId, commentOwner, blogId, blogOwner){
		
		Blogs.update({_id:blogId, 'comments._id':commentId },{ 
			$push: {
				'comments.$.innerComment': {
					comment: text, 
					_id: Math.random(), 
					commentId:commentId,
					commentOwner: commentOwner, 
					blogId:blogId, 
					blogOwner:blogOwner, 
				} 
			}
		},{ 
			validate: false 
		});
	},
	'blogs.remove'(blogId){
		check(blogId, String);

		const blog = Blogs.findOne(blogId);

		if(blog.private && blog.owner !== this.userId){
			throw new Meteor.Error('not-authorized');
		}

		if(blog.owner == this.userId){
			Blogs.remove(blogId);
		}	
	},
	'blogs.removeComment'(blogId, commentId, blogOwner, owner){

		removeInfo = {
			blogId : blogId,
			commentId : commentId,
			blogOwner : blogOwner,
			owner : owner,
		}

		isValid = cmntRmSchema.namedContext("myContext").validate(removeInfo);

		if(isValid){
			if(Meteor.user().username==owner || Meteor.user().username==blogOwner) {
				Blogs.update(blogId, { 
					$pull: {
						comments: { 
							_id: commentId 
						} 
					} 
				});
			}
		}
			

	},
	'blogs.removeInnerComment'(innerCommentId, commentId, blogId, blogOwner, owner){
		
		removeInfo = {
			_id : innerCommentId,
			blogId : blogId,
			commentId : commentId,
			blogOwner : blogOwner,
			owner : owner,
		}

		isValid = InrCmntRmSchema.namedContext("myContext").validate(removeInfo);
		
		if(isValid){
			if(Meteor.user().username==owner || Meteor.user().username==blogOwner) {
				Blogs.update({_id:blogId,'comments._id':commentId},{ 
					$pull: {
						'comments.$.innerComment':{
							_id:innerCommentId
						} 
					} 
				});
			}
		}
	},
})