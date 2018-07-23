import React, { Component } from 'react';
import $ from 'jquery';
import logo from './logo.svg';
import './App.css';
import Form from './Form.js';
import Table from './Table.js';
import NavBar from './NavBar.js';
import { Navbar,Accordion,Button,ButtonToolBar,Collapse,Dropdown,DropdownButton,DropdownMenu,DropdownToggle,FormGroup,MenuItem,Nav,NavbarCollapse,NavbarBrand,NavDropdown,NavItem,NavbarHeader,Row } from 'react-bootstrap';


var createReactClass = require('create-react-class');
var App = createReactClass({

    getInitialState: function(){
        return {
            currState: "adding",
            dataMounted: false,
            id: [],
            firstNames: [],
            surNames: [],
            accNumbers:[],
            indexToEdit: ""
        }
    },

    handleState: function(newState){
        this.setState({
            id: [],
            firstNames: [],
            surNames: [],
            accNumbers: [],
            dataMounted: false
        });
        this.loadAccountsFromServer();
        if(newState=="adding"){
            this.setState({
                currState: ""
            });
            this.setState({
                currState: "adding"
            });
        }
        else if(newState=="viewing"){
            this.setState({
                currState: ""
            });
            this.setState({
                currState: "viewing"
            });
        }
        else if(newState=="editing"){
            this.setState({
                currState: ""
            });
            this.setState({
                currState: "editing"
            });
        }
    },

    getIndexToEdit: function(i){
        this.setState({
            indexToEdit: i
        });
    },

    reset: function(){
        this.setState({
            id: [],
            firstNames: [],
            surNames: [],
            accNumbers: []
        });
    },

    loadAccountsFromServer: function () {
      var self = this;
      $.ajax({
          url: "http://localhost:8080/demo/all",
      dataType: 'json'
      }).then(function (data) {        
      for(var i=0; i<data.length; i++){

        self.state.id.push(data[i].id);
        self.state.firstNames.push(data[i].firstName);
        self.state.surNames.push(data[i].surName);
        self.state.accNumbers.push(data[i].accNumber);
      }
      self.setState({dataMounted: true});
      });
    },

    render: function(){

        if(this.state.currState=="adding"){
            return (
                <div>
                    <NavBar parentMethod={this.handleState} />
                    <Form type="add" idList={this.state.id} firstNames={this.state.firstNames} surNames={this.state.surNames} accNumbers={this.state.accNumbers} parentMethod={this.handleState}/>
                </div>
            )
        }
        else if(this.state.currState=="viewing"){
            return (
                <div>
                    <NavBar parentMethod={this.handleState}/>
                    <Table idList={this.state.id} firstNames={this.state.firstNames} surNames={this.state.surNames} accNumbers={this.state.accNumbers} parentMethod={this.handleState} getIndexToEdit={this.getIndexToEdit}/>
                </div>
            )
        }
        else if(this.state.currState=="editing"){
            return (
                <div>
                    <NavBar parentMethod={this.handleState}/>
                    <Form type="edit" index={this.state.indexToEdit} idList={this.state.id} firstNames={this.state.firstNames} surNames={this.state.surNames} accNumbers={this.state.accNumbers} parentMethod={this.handleState}/>
                </div>
            )
        } else {
            return null;
        }
    }
});
export default App;
