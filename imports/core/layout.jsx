import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';


export default class Layout extends Component{
  render() {
    return (
      <div className="app-root">
        <div className="header">
          {this.props.header}
        </div>
        <div className="clearfix" />  
        <div className="container">
          
            {this.props.sidebar}
          
          {this.props.content}
        </div>
        
        <div className="footer">
          {this.props.footer}
        </div>  
      </div>
    );
  }
};
