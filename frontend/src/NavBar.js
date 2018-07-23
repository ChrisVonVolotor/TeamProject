import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


var createReactClass = require('create-react-class');
    var NavBar = createReactClass({

        handleClick1: function() {
            this.props.parentMethod("viewing");
        },  

        handleClick2: function(){
            this.props.parentMethod("adding");
        },

        render: function(){
            return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">AccountApp</a>
                </div>
                <ul className="nav navbar-nav">
                    <li className="active" onclick="active(this)"><a href="#">Dashboard</a></li>
                    <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#">Accounts
                        <span className="caret" /></a>
                    <ul className="dropdown-menu">
                        <li><a href="#" onClick={this.handleClick1}>Get Accounts</a></li>
                        <li><a href="#" onClick={this.handleClick2}>Add Accounts</a></li>
                    </ul>
                    </li>
                </ul>
                </div>
            </nav>
            );
        }
    });
export default NavBar;