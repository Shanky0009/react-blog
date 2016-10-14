export const InnerCommentSchema = new SimpleSchema({
	"comment": { 
		type: String, 
		label: "Blog Comment" 
	},
	"_id": { 
		type: String, 
		label: "Comment ID" 
	},
	"commentId": { 
		type: String, 
		label: "Comment ID" 
	},
	"commentOwner": { 
		type: String, 
		label: "Comment Owner Name" 
	},
	"blogId": { 
		type: String, 
		label: "Blog ID" 
	},
	"blogOwner": { 
		type: String, 
		label: "Blog Owner Name" 
	},
	"owner": { 
		type: String, 
		label: "Comment Owner Name",
		autoValue: function() {
	      	if (this.userId) {
	      		username = Meteor.users.findOne(this.userId).username
	        	return username;
	      	} else {
	        	this.unset();
	      	}
	    }  
	},
	"createdAt": { 
		type: Date, 
		label: "Comment Date",
		autoValue: function() {
	      	if (this.isInsert) {
	        	return new Date();
	      	} else {
	        	this.unset();
	      	}
	    }  
	},
});