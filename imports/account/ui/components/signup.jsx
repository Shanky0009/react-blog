import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


export default class SignUp extends Component {
	constructor(props) {
    	super(props);
  		this.handleSubmit=this.handleSubmit.bind(this);
  	}

  	handleSubmit(event){
  		event.preventDefault();

  		const username = this.refs.username.value.trim();
		const email = this.refs.email.value.trim();
		const password = this.refs.password.value.trim();
		const profile = '';
		const chats = [];
		console.log(email, password, username);

		Accounts.createUser({username, email, password, profile}, function (err) {
			if(!err){
				const userId= Meteor.userId();
				// Accounts.sendVerificationEmail(userId);
			}

			FlowRouter.go('/');
		});

		

		this.refs.username.value='';
		this.refs.email.value='';
		this.refs.password.value='';
  	}

	render(){
		return(
			<div className="container">
				<div className="row">
					<div id="signInTitle">
						<h2>Join Bloggers' Blog</h2>
					</div>
					<div id="signUp" className="col-sm-3">
						<form className="sign" onSubmit={this.handleSubmit}>
							<div className="form-group">
							    <label htmlFor="username">Username:</label>
							    <input type="text" className="form-control" name="username" ref="username" id="username" placeholder="Enter Username" />
						 	</div>
							<div className="form-group">
							    <label htmlFor="email">Email address:</label>
							    <input type="email" className="form-control" name="email" ref="email" id="email" placeholder="Enter Email Id" />
						 	</div>
						 	<div className="form-group">
							    <label htmlFor="pwd">Password:</label>
							    <input type="password" className="form-control" name="password" ref="password" id="pwd" placeholder="Enter passsword" />
							</div>
							<input type="submit" className="btn btn-default" value="Sign Up" />
						</form>
					</div>
					<div className="clearfix"></div>
				  	<div id="signInAcnt">
					  	Already have an account?
				  		<a href="/login">Login here!</a>
						  	
					</div>
					<div className="clearfix"></div>
				</div>
			</div>		
		);
	}
}
