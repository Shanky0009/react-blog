import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';


export default class InnerComments extends Component{

	constructor(props) {
    	super(props);
    	this.deleteComment = this.deleteComment.bind(this);

  	}

  	deleteComment(){
  		if (Meteor.userId()){
			Meteor.call('blogs.removeInnerComment', 
				this.props.innerComments._id,
				this.props.innerComments.commentId,
				this.props.innerComments.blogId, 	 
				this.props.innerComments.blogOwner, 
				this.props.innerComments.owner
			);
		}
  	}

	render(){
		return(
			<li className="list-group-item list-group-item-danger">
				<div id="infoInnerComnt">
					<h5 className="ownerInnerName">
						<a href={"/profile/"+this.props.innerComments.owner}>{this.props.innerComments.owner} </a> 
						says 
					</h5>
					<h5>: {this.props.innerComments.comment}</h5>
					{this.props.innerComments.commentOwner ?
						<button type="button" onClick={this.deleteComment} className="deleteInnerCmnt btn btn-link btn-xs">
		    				<span className="glyphicon glyphicon-remove"></span>
		  				</button>
		  			:
		  				''	
		  			}	
				</div>
				<div className="clearfix"></div>
			</li>		
		)
	}
}