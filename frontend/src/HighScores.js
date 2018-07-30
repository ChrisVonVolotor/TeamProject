import React, { Component } from 'react';

var createReactClass = require('create-react-class');
var HighScores = createReactClass({


    render: function(){
        return (
            <div>
                <h1>HighScores</h1>

                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Score</th>

                    </tr>
                    </thead>
                    <tbody>
                    {this.props.userScores.map((item,i) => {
                        return (
                            <tr key={i}>
                                <td>{this.props.userScores[i].userName}</td>
                                <td>{this.props.userScores[i].score}</td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
});
export default HighScores;