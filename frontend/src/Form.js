import React, { Component } from 'react';
import $ from 'jquery';
import logo from './logo.svg';
import './App.css';
import { Navbar } from 'react-bootstrap';
import Button from './Button.js';
    
var createReactClass = require('create-react-class');
    var Form = createReactClass({

        getInitialState: function(){
            return {
                type: this.props.type,
                id: this.props.idList,
                firstNames: this.props.firstNames,
                surNames: this.props.surNames,
                accNumbers: this.props.accNumbers,
                index: this.props.index
                    }
        },

        addNewAccount: function(){
            var self = this;
            $.ajax({
                url: "http://localhost:8080/demo/add?firstname="+this.refs.firstName.value+"&surname="+this.refs.surName.value+"&accNumber="+this.refs.accNumber.value,
                type: 'POST'
            }).then(function (data) {
                    self.props.parentMethod("viewing");
            });
        },
        
        save: function(){
            var self = this;
            $.ajax({
                url: "http://localhost:8080/demo/edit?idEdit="+self.state.id[self.state.index]+"&firstname="+self.refs.firstName.value+"&surname="+self.refs.surName.value+"&accNumber="+self.refs.accNumber.value,
                type: 'POST'
            }).then(function (data) {
                self.props.parentMethod("viewing");
            });

        },
    
        renderAdding: function(){
            return (
            <form id="myForm" className="form-horizontal">
            <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="First-Name">First-name:</label>
            <div className="col-sm-10">
                <input type="text" ref="firstName" className="form-control" id="First-Name" placeholder="Enter first name" />
            </div>
            </div>
            <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="Surname">Surname:</label>
            <div className="col-sm-10"> 
                <input type="text" ref="surName"className="form-control" id="Surname" placeholder="Enter surname" />
            </div>
            </div>
            <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="AccountNumber">Account Number:</label>
            <div className="col-sm-10"> 
                <input type="text" ref="accNumber" className="form-control" id="AccountNumber" placeholder="Enter account number" />
            </div>
            </div>
            <div className="form-group"> 
            <div className="col-sm-offset-2 col-sm-10">
                <Button type="Submit" parentMethod={this.addNewAccount}/>
            </div>
            </div>
        </form>
            );
        },

        renderEditing: function(i){
            return (
                <form id="myForm" className="form-horizontal">
                <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="First-Name">First-name:</label>
                <div className="col-sm-10">
                    <input type="text" ref="firstName" className="form-control" id="First-Name" defaultValue={this.state.firstNames[i]}/>
                </div>
                </div>
                <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="Surname">Surname:</label>
                <div className="col-sm-10"> 
                    <input type="text" ref="surName"className="form-control" id="Surname" defaultValue={this.state.surNames[i]} />
                </div>
                </div>
                <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="AccountNumber">Account Number:</label>
                <div className="col-sm-10"> 
                    <input type="text" ref="accNumber" className="form-control" id="AccountNumber" defaultValue={this.state.accNumbers[i]} />
                </div>
                </div>
                <div className="form-group"> 
                    <div className="col-sm-offset-2 col-sm-10">
                        <Button type="Save" parentMethod={this.save}/>
                    </div>
                </div>
            </form>

            );
        },

        render: function() {

                if(this.state.type=="add"){
                    return this.renderAdding();
                } 
                else if(this.state.type=="edit"){
                    return this.renderEditing(this.state.index);
                } 

        }
  });
export default Form;