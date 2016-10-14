import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class Login extends Component {
	constructor(props) {
    	super(props);
  		this.handleSubmit=this.handleSubmit.bind(this)
  	}

  	handleSubmit(event){
  		event.preventDefault();

		const email = this.refs.email.value.trim();
		const password = this.refs.password.value.trim();

		Meteor.loginWithPassword(email, password, function(){
			FlowRouter.go('/');
		});

		this.refs.email.value='';
		this.refs.password.value='';
  	}

	render(){
		return(
			<div className="container">
				<div className="row" >
					<div id="loginTitle">
						<h2>Login to Bloggers' Blog</h2>
					</div>
				  	<div id="login">
					  	<form className="log" onSubmit={this.handleSubmit}>
							<div className="form-group">
							    <label htmlFor="email">Email address: </label>
							    <input 
							    	type="email" 
							    	className="form-control" 
							    	id="email"
							    	ref="email"
							    	placeholder="Enter Email Id" 
							    />
						 	</div>
						 	<div className="form-group">
							    <label htmlFor="pwd">Password: </label>
							    <input 
							    	type="password" 
							    	className="form-control" 
							    	name="password" 
							    	id="pwd"
							    	ref="password" 
							    	placeholder="Enter passsword" 
							    />
							 </div>
							<input 
								type="submit" 
								className="btn btn-default" 
								value="Login" 
							/>
						</form>
				 	 </div>
				  	<div className="clearfix"></div>
				  	<div id="createAcnt">
					  	New to Bloggers' Blog?
					  		<a href="/sign-up">Create Account Now</a>
					  	
				  	</div>
				  	<div className="clearfix"></div>
				</div>
			</div>			
		);
	}
}
