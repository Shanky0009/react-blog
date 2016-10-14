import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

import { Blogs } from '../../api/blogs.js';
import Blog from './blog';


export default class Bloggs extends Component{

	// constructor(props) {
 //    	super(props);
 //  	}
	
	renderBlogs(){
		let blogs = this.props.blogs;	   	
		let oneBlog = this.props.oneBlog;
	    return blogs.map((blog) => {
	    	let date = () => {
				const data = Blogs.findOne(blog._id).createdAt;
				let date = new Date(data)
				
					let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
					let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
					let hour = date.getHours();
					let dates = {
					    day: days[date.getDay()],
					    date: date.getDate(),
					    month: months[date.getMonth()],
					    year: date.getFullYear(),
					    hour: hour,
					    minute: date.getMinutes()
					};
					return dates;
			}
	    	return (
	      		<Blog key={blog._id} blog={blog} date={date()} oneBlog={oneBlog} currentUser={this.props.currentUser}/>
	    	)
		});
	}

	render(){
		return(
			<div className="blogs">
					<div className="blog-list">
						<ul className="list-group">
							{this.renderBlogs()}
						</ul>
					</div>	 
			</div>		
		)
	}
}