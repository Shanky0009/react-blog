import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';


export default class Nav extends Component {
	constructor(props) {
    	super(props);
    	this.handleLogout = this.handleLogout.bind(this);
   	}


  	handleLogout(){
  		Meteor.logout();
  		FlowRouter.go('/');
  	}

	render(){
		return(
			<nav className="navbar navbar-inverse">
				<div className="container-fluid" >
				    <div className="navbar-header">
				      <a className="home navbar-brand" href="/">Welcome to Bloggers Blog!!</a>
				    </div>
			    		{this.props.currentUser ?
			    			<ul className="nav navbar-nav navbar-right">
								<li>
									<a href="/blogs" className="blog">
										<span className="glyphicon glyphicon-xbt"></span> 
										Blogs
									</a>
								</li>
								<li>
									<a href="/addBlog" className="addBlog">
										<span className="glyphicon glyphicon-pencil"></span> 
										Add Blog
									</a>
								</li>
								<li>
									<a href={"/profile/"+this.props.currentUser.username} className="profile">
										<span className="glyphicon glyphicon-user" /> 
										Profile
									</a>
								</li>
								<li>
									<a href="/setting" className="setting">
										<span className="glyphicon glyphicon-user" /> 
										Setting
									</a>
								</li>
					      		<li>
					      			<a href="#" onClick={this.handleLogout} className="logout">
					      				<span className="glyphicon glyphicon-log-in" /> 
					      				Logout
					      			</a>
					      		</li>
					      	</ul>	
				   
						:	
							<ul className="nav navbar-nav navbar-right">
								<li>
									<a href="/blogs" className="blog">
										<span className="glyphicon glyphicon-blog" />
										Blog
									</a>
								</li>
								<li><a href="/sign-up" className="signUp"><span className="glyphicon glyphicon-user" /> Sign Up</a></li>
					      		<li><a href="/login" className="login"><span className="glyphicon glyphicon-log-in" /> Login</a></li>
			      			</ul>
			      		}
				</div>
			</nav>		
		);
	}
}