ChatTalksSchema = new SimpleSchema({
	"userName": { 
		type: String, 
		label: "Messengers Name",
		autoValue: function() {
	      	if (this.userId) {
	      		username = Meteor.users.findOne(this.userId).username
	        	return username;
	      	} else {
	        	this.unset();
	      	}
	    }  
	},
	"chatMessage": { 
		type: String, 
		label: "Chat Message" 
	},
	"createdAt": { 
		type: Date, 
		label: "Message Date",
		autoValue: function() {
	      	if (this.isInsert) {
	        	return new Date();
	      	} else if(this.isUpdate){
	      		return new Date();
	      	} else {	
	        	this.unset();
	      	}
	    }  
	},
})

ChatsSchema = new SimpleSchema({
	"_id": { 
		type: String, 
		label: "Chat ID" 
	},
	"userId1": { 
		type: String, 
		label: "User ! iD" 
	},
	"userId2": { 
		type: String, 
		label: "User 2 ID" 
	},
	"talks": { 
		type: [ChatTalksSchema], 
		label: "Chat Messages" 
	},
	"createdAt": { 
		type: Date, 
		label: "Chat Start Date",
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

