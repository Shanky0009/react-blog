import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class Profile extends Component{

	constructor() {
		super();
		this.state = {
          subscription: {
            users: Meteor.subscribe('users')
          }
        }
	}

	componentWillUnmount() {
		this.state.subscription.users.stop();
   }

	render(){
		return(
			<div className="row">
				<div className="container">
					{this.props.user ?
						<header>
							<div>
								<h3>User Profile</h3>
							</div>
							<div className="profilePic">
								<img src={"/images/"+this.props.user._id+'.png'} alt="user" />	
							</div>
					
							<h1>Username: {this.props.user.username}</h1>
						
							<h2>Email Id: {this.props.user.address}</h2>

							{this.props.user.profile ?
								<div className="profileInfo">
									<h3>First Name: {this.props.user.profile.first_Name}</h3>							    
									<h3>Last Name: {this.props.user.profile.last_Name}</h3>							    
								    <h3>Phone No: {this.props.user.profile.phonNo}</h3>							    			    	
									<h3>City: {this.props.user.profile.city}</h3>							    				  				    	
									<h3>Country: {this.props.user.profile.country}</h3>
								</div>	
							:
								<div className="profileInfo">
									<h3>First Name: </h3>							    
									<h3>Last Name: </h3>							    
								    <h3>Phone No: </h3>							    			    	
									<h3>City: </h3>							    				  				    	
									<h3>Country: </h3>
								</div>		
							}
							
						</header>
					:
						''
					}		
				</div>        						    	
			</div>
		)
	}
}