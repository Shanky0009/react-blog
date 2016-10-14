import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Blogs } from '../../api/blogs.js';

Meteor.subscribe('blogs');

export default class AddEditBlog extends Component{

	constructor(props) {
    	super(props);
    	this.handleSubmit=this.handleSubmit.bind(this);
    	
  	}
	
	handleSubmit(event){
		event.preventDefault();


		const title = this.refs.title.value.trim();
		const content = this.refs.content.value.trim();
		const blogIndex = this.refs.blogIndex.value.trim();

		if(this.props.blog != null){
			blogId = this.props.blog._id;
		} else {
			blogId = '';
		}
		
		if(content && title && Meteor.userId()) {
			Meteor.call('blogs.insert', title, content, blogId, Meteor.userId(), blogIndex, function(){
				FlowRouter.go('/blogs');
			});
		}

		this.refs.title.value = '';
		this.refs.content.value = '';
		this.refs.blogIndex.value = '';
	}

	render(){
		return(
			<div className="addEditBlog">
				{this.props.currentUser ?
					<div className="form-group">
						{this.props.blog ?
							<form className="new-blog" onSubmit={this.handleSubmit}>
								<input type="text" name="heading" ref="title" className="form-control" placeholder="Enter blog heading" defaultValue={this.props.blog.title} />
					  			<textarea className="form-control" ref="content" name="text" rows="5" id="comment" placeholder="Type to add new blog" defaultValue={this.props.blog.content}></textarea>
					  			<input type="submit" className="btn btn-default" />
							</form>
						:
							<form className="new-blog" onSubmit={this.handleSubmit}>
								<input type="text" name="blogIndex" ref="blogIndex" className="form-control" placeholder="Enter your blog index" />
								<input type="text" ref="title" className="form-control"  placeholder="Enter new blog" />
					  			<textarea className="form-control" ref="content" rows="5" id="comment" placeholder="Type to add new blog" ></textarea>
					  			<input type="hidden" name="blogId"  />
					  			<input type="submit" className="btn btn-default" value="POST" />
							</form>
						}		
					</div>
				:
						<div className="jumbotron">
						  	<h1>Login to start Blogging!</h1>
						</div>
				}
			</div>		
		)
	}
}