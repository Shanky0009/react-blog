import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';

import { Blogs } from '../../api/blogs.js';
import Comments from './comments';

export default class Blog extends Component {
	
	constructor(props) {
    	super(props);
    	this.handleComment = this.handleComment.bind(this);
    	this.handleDeleteBlog = this.handleDeleteBlog.bind(this);
  	}

  	handleComment(event){
  		event.preventDefault();

  		const comment = this.refs.comment.value.trim();
		const blogOwner = Blogs.findOne(this.props.blog._id).username;

		if(comment && Meteor.userId()){
			Meteor.call('blogs.comment', comment, this.props.blog._id, blogOwner);
		}

		this.refs.comment.value = '';
  	}
	
	handleDeleteBlog(){
		if(Meteor.userId()){
			Meteor.call('blogs.remove', this.props.blog._id);
		}
	}

	renderComments(){
		let comment = Blogs.findOne(this.props.blog._id).comments;	

		if(comment!=undefined){
			return comment.map((comments) => {
				return(
					<Comments key={comments._id} comments={comments} commentOwner={comments.blogOwner}/>
				)
			});
		}   	
	    
	}

	render(){
		return(
			<div className="row">
			  	<div className="col-sm-2"></div>
		  		<div className="col-sm-8">
			  		<li className="list-group-item list-group-item-success">
			  			
			  				<div className="blogData">
			  					<div id="title" className="text">
									<h2>
										<a href={'/blogs/'+this.props.blog._id} className="blogView">{this.props.blog.title}</a>
									</h2>
									<p>Blog Index : {this.props.blog.blogIndex}</p>
									<p>Blog No. : {this.props.blog.blogNo}</p>
									<button type="button" onClick={this.handleDeleteBlog} className="delete btn btn-link">
					    				<span className="glyphicon glyphicon-remove"></span>
					  				</button>
									<a href={"/editBlog/"+this.props.blog._id} >
										<button className="edit btn btn-link glyphicon glyphicon-edit">
											Edit
										</button>
									</a>
								</div>

								<div className="clearfix"></div>

								<div id="info">
									<strong>By: <a href={"/profile/"+this.props.blog.username}>{this.props.blog.username}</a> </strong>
									<p> On: {this.props.date.day}, {this.props.date.month} {this.props.datedate}, {this.props.date.year}</p>
									<p> At: {this.props.date.hour}:{this.props.date.minute}</p>
								</div>

								<div className="clearfix"></div>

								<div id="content">
									<h4>{this.props.blog.content}</h4>
								</div>

								<div className="clearfix"></div>
									{this.props.currentUser ? 
										<div id="comment">
											{this.props.blog.comments ?
												<ul>
													{this.renderComments()}
												</ul>
											:
												''
											}		
											<form className="new-comment" onSubmit={this.handleComment}>
												<textarea className="form-control" ref="comment" name="comment" placeholder="Enter your comment"></textarea>
												<input type="submit" name="submit" value="Comment" />
											</form>
										</div>
									:
										''
									}
							</div>			
						
		  			</li>
		  		</div>
		  		<div className="clearfix"></div>
		  		<div className="col-sm-2"></div>
			</div>
		);
	}
}

Blog.PropTypes = {
	blog: PropTypes.object.isRequired
};

// {this.props.oneBlog ?
// :	
// 							<div className="blogData">
// 								<a id="blogInfo" href={'/blogs/'+this.props.blog._id}>
// 				  					<div id="title" className="text">
// 					  					<h2>
// 											{this.props.blog.title}
// 										</h2>
// 									</div>

// 									<div className="clearfix"></div>

// 									<div id="info">
// 										<strong>By: {this.props.blog.username} </strong>
// 										<p> On: {this.props.date.day}, {this.props.date.month} {this.props.date.date}, {this.props.date.year}</p>
// 										<p> At: {this.props.date.hour}:{this.props.date.minute}</p>
// 									</div>

// 									<div className="clearfix"></div>

// 									<div id="content">
// 										<h4>{this.props.blog.content}</h4>
// 										<h4>Read More..</h4>
// 									</div>
// 				  				</a>
// 				  			</div>		
// 		  				}	