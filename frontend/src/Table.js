import React, { Component } from 'react';
import $ from 'jquery';
import logo from './logo.svg';
import './App.css';
import Button from './Button.js';
import { Navbar } from 'react-bootstrap';

var createReactClass = require('create-react-class');
    var Table = createReactClass({

        getInitialState: function(){
            return {
                id: this.props.idList,
                firstNames: this.props.firstNames,
                surNames: this.props.surNames,
                accNumbers: this.props.accNumbers
            }
        },

        editRow: function(i){
            this.props.parentMethod("editing");
            this.props.getIndexToEdit(i);
        },

        removeRow: function(i){
            var self = this;
            $.ajax({
                url: "http://localhost:8080/demo/remove?idRemove="+i,
                type: 'POST'
            }).then(function (data) {
                self.props.parentMethod("viewing");
            });
        },

        render: function(){

            return (
                <div className="container">
                    <h2>Current Accounts</h2>           
                    <table className="table">
                    <thead>
                        <tr>
                        <th>First_name</th>
                        <th>Surname</th>
                        <th>Account Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.id.map((item,i) => {
                    return <tr>
                        <td>{this.state.firstNames[i]}</td>
                        <td>{this.state.surNames[i]}</td>
                        <td>{this.state.accNumbers[i]}</td>
                        <td><Button type="Edit" ref="test" index={i} parentMethod={this.editRow}/></td>
                        <td><Button type="Remove" index={this.state.id[i]} parentMethod={this.removeRow} /></td>
                        </tr>
                        })
                    }
                    </tbody>
                    </table>
                </div>
        
            );
        },

    });
export default Table;