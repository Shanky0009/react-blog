import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';

import { Blogs } from '../../api/blogs.js';
import InnerComments from './innerComment';


export default class Comments extends Component{

	constructor(props) {
    	super(props);
    	this.deleteComment = this.deleteComment.bind(this);
    	this.handleInnerComment = this.handleInnerComment.bind(this)
  	}

  	deleteComment(){
  		if (Meteor.userId()){
			Meteor.call('blogs.removeComment', 
				this.props.comments.blogId, 
				this.props.comments._id, 
				this.props.comments.blogOwner, 
				this.props.comments.owner
			);
		}
  	}

  	handleInnerComment(event){
  		event.preventDefault();

		const comment = this.refs.comment.value.trim();
		const blogId = this.refs.blogId.value.trim();
		if(blogId!=''){
			blogOwner = Blogs.findOne(blogId).username;
		} 		
		
		if(comment && Meteor.userId()) {
			Meteor.call('blogs.innerComment', comment, this.props.comments._id, this.props.comments.owner, blogId, blogOwner);
		}

		this.refs.comment.value = '';
		this.refs.blogId.value = '';
  	}

  	renderInnerComments(){
  		let innerComment = this.props.comments.innerComment;

		if(innerComment!=undefined){
			return innerComment.map((innerComments) => {
				commentOwner = () => {
					 if(Meteor.user().username == innerComments.owner || Meteor.user().username == innerComments.blogOwner || Meteor.user() == innerComments.commentOwner)
						return true
					else
						return false		
					}
				return(
					<InnerComments key = {innerComments._id} innerComments = {innerComments} commentOwner = {commentOwner()}/>
				)
			});
		}  
  	}

	render(){
		return(
			<li className="list-group-item list-group-item-info">
				<span>
					<div id="infoComnt">
						<h5 className="ownerName">{this.props.comments.owner} says </h5>
						<h5>: {this.props.comments.comment}</h5>
						{ this.props.commentOwner ?
							<button type="button" onClick={this.deleteComment} className="deleteCmnt btn btn-link btn-xs">
			    				<span className="glyphicon glyphicon-remove"></span>
			  				</button>
			  			:
			  				''	
			  			}	
					</div>

					<div className="clearfix"></div>
					<div className="inner-comment">
						{this.props.comments.innerComment ?
							<ul>
								{this.renderInnerComments()}
							</ul>
						:
							''
						}			
					</div>	
							
				</span>
				<form className="inner-comment" onSubmit={this.handleInnerComment}>
					<input type="hidden" ref="blogId" value={this.props.comments.blogId} />
					<textarea className="form-control" ref="comment" placeholder="Enter your comment"></textarea>
					<input type="submit" name="submit" value="comment" />
				</form>
				<div className="clearfix"></div>
			</li>
			
		)
	}
}

// {this.props.comments.comment.innercomment ?
// 						<div className='innerComment'>
// 							{this.props.comments.comment.innercomment.map((comments) => {
// 								return(
// 									<li className="list-group-item list-group-item-danger">
// 										<div id="infoInnerComnt">
// 											<h5 className="ownerInnerName">{owner} says </h5>
// 											<h5>: {comment}</h5>
// 											{this.props.commentOwner}
// 												<button type="button" className="deleteInnerCmnt btn btn-link btn-xs">
// 								    				<span className="glyphicon glyphicon-remove"></span>
// 								  				</button>
// 								  			:
// 								  				''	
// 								  			}	
// 										</div>
// 										<div className="clearfix"></div>
// 									</li>
// 								)
// 							})}
// 						</div>
// 					:
// 						''		
// 					}