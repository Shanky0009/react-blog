import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { FlowRouter } from 'meteor/kadira:flow-router';

import Profiles from '../../api/profiles.js';

export default class Profile extends Component{
	
	constructor() {
		super();
		this.state = {
          subscription: {
            users: Meteor.subscribe('users')
          }
        }
        this.handleUpdate=this.handleUpdate.bind(this);
        this.uplaodPic=this.uplaodPic.bind(this);
	}

	componentWillUnmount() {
		this.state.subscription.users.stop();
  	}

  	uplaodPic(event){
  		event.preventDefault();
  		var file = new FormData;
  		let imgFile=event.target.files[0];

  		file=imgFile;

  		var FileReader = require('filereader')

		var reader = new window.FileReader()

        reader.addEventListener("load", function(){
        	var buffer = new Uint8Array(reader.result)
            Meteor.call("profilePic", buffer)

        })

        reader.onerror = function(event){    
            alert(event.target.error.code); 
        }

        reader.readAsArrayBuffer(file)
	
  	}

  	handleUpdate(event){
		event.preventDefault();
		
		const profileData ={
			proPic : this.refs.proPic.value.trim(),
			first_Name : this.refs.fName.value.trim(),
			last_Name : this.refs.lName.value.trim(),
			phonNo : this.refs.phNo.value.trim(),
			city : this.refs.city.value.trim(),
			country: this.refs.country.value.trim(),
		}

		Meteor.call('users.profileUpdate', profileData );
		let username = this.props.currentUser.username
		let path = "/profile/";
		let profileUrl= path+username;
		FlowRouter.go(profileUrl);

		this.refs.fName.value = "";
		this.refs.lName.value = "";
		this.refs.phNo.value = "";
		this.refs.city.value = "";
		this.refs.country.value = "";
	}

	render(){
		return(
			<div className="row">
				<div className="col-sm-2"></div>
				<div className="col-sm-8">
				<h3>User Profile</h3>
					{this.props.currentUser ?
						<form className="profileData" onSubmit={this.handleUpdate}>
							<div className="form-group">
								<label htmlFor="pic">Upload Pic:</label>
								<input className="profilePic" type="file" ref="proPic" id="pic" name="pic" onChange={this.uplaodPic} />
								{/*<img src={this.props.currentUser.proPic} alt="Profile Pic" />*/}
							</div>
							{this.props.currentUser.profile ?
								<div className="proUpdate">
									<div className="form-group">
									    <label htmlFor="fName">First Name:</label>
									    	<input type="text" ref="fName" className="form-control" id="fName" name="fName" placeholder="Enter First Name" defaultValue={this.props.currentUser.profile.first_Name} />				    
									</div>
									<div className="form-group">
									    <label htmlFor="lName">Last Name:</label>
									  		<input type="text" ref="lName" className="form-control" id="lName" name="lName" placeholder="Enter Last Name" defaultValue={this.props.currentUser.profile.last_Name} />
									</div>
									<div className="form-group">
									    <label htmlFor="phNo">Phone No:</label>
								    		<input type="text" ref="phNo" className="form-control" id="phNo" name="phNo" placeholder="Enter Phone Number" defaultValue={this.props.currentUser.profile.phonNo} />
									</div>
									<div className="form-group">
									    <label htmlFor="city">City:</label>
								    		<input type="text" ref="city" className="form-control" id="pwd" name="city" placeholder="Enter City" defaultValue={this.props.currentUser.profile.city} />
									</div>

									<div className="form-group">
									    <label htmlFor="country">Country:</label>
								    		<input type="text" ref="country" className="form-control" id="country" name="country" placeholder="Enter Country"  defaultValue={this.props.currentUser.profile.country} />
									</div>
									<input type="submit" className="btn btn-default" value="Save" />
								</div>	
							:
								<div className="proUpdate">
									<div className="form-group">
									    <label htmlFor="fName">First Name:</label>
									    	<input type="text" ref="fName" className="form-control" id="fName" name="fName" placeholder="Enter First Name" />				    
									</div>
									<div className="form-group">
									    <label htmlFor="lName">Last Name:</label>
									  		<input type="text" ref="lName" className="form-control" id="lName" name="lName" placeholder="Enter Last Name"  />
									</div>
									<div className="form-group">
									    <label htmlFor="phNo">Phone No:</label>
								    		<input type="text" ref="phNo" className="form-control" id="phNo" name="phNo" placeholder="Enter Phone Number" />
									</div>
									<div className="form-group">
									    <label htmlFor="city">City:</label>
								    		<input type="text" ref="city" className="form-control" id="pwd" name="city" placeholder="Enter City" />
									</div>

									<div className="form-group">
									    <label htmlFor="country">Country:</label>
								    		<input type="text" ref="country" className="form-control" id="country" name="country" placeholder="Enter Country" />
									</div>
									<input type="submit" className="btn btn-default" value="Save" />
								</div>	
							}	
						</form>
					:
						''
					}		
				</div>	
			</div>
		)
	}
}