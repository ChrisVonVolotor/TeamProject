import React, { Component } from 'react';
import $ from 'jquery';

import NavBar from './NavBar2.js';
import Lesson from './Lesson.js';
import Question from './Question.js';
import HighScores from './HighScores.js';

var createReactClass = require('create-react-class');
var App = createReactClass({

    getInitialState: function(){
        return {
            showAboutUs: true,
            showLesson: false,
            showQuestion: false,
            showHighScores: false,
            getUserDetails: false,
            addHighScore: false,
            lessonList: [],
            questionsList: [],
            answersList: [],
            difficulty: null,
            index: 0,
            score: 0,
            userScores: [],
            currUser: ""
        }
    },

    handleState: function(newState){

        this.getLessons(newState);
        this.getQuestions(newState);
        this.getAnswers(newState);

        if(newState == "AboutUs"){
            this.setState({
                showLesson: false,
                showQuestion: false,
                showAboutUs: true,
                addHighScore: false,
                difficulty: null,
                score: 0,
                index: 0
            })
        } else if(newState == "Easy"){
            this.setState({
                getUserDetails: true,
                showLesson: false,
                showQuestion: false,
                showAboutUs: false,
                difficulty: "Easy"
            })
        } else if(newState == "Medium"){
            this.setState({
                getUserDetails: true,
                showLesson: false,
                showQuestion: false,
                showAboutUs: false,
                difficulty: "Medium"
            })
        } else if(newState == "Hard"){
            this.setState({
                getUserDetails: true,
                showLesson: false,
                showQuestion: false,
                showAboutUs: false,
                difficulty: "Hard"
            })
        } else if(newState == "HighScores"){
            this.setState({
                showLesson: false,
                showQuestion: false,
                showAboutUs: false,
                difficulty: null,
                addHighScore: false,
                showHighScores: true,
                score: 0,
                index: 0
            })
        }
    },

    lessonFinish: function(){
        this.setState({
            showLesson: false,
            showQuestion: true,
            showAboutUs: false
        })
    },

    next: function(score){
        if(this.state.index+1<this.state.questionsList.length){
            this.setState({
                index: this.state.index+1,
                showLesson: true,
                showQuestion: false,
                score: this.state.score+score
            })
        } else {
            score= score +this.state.score;
            this.setState({
                getUserDetails: false,
                showHighScores: false,
                showLesson: false,
                showQuestion: false,
                addHighScore: true,
                score: score
            });
        }

    },

    getLessons: function(newState){
        if(newState == "Easy"){
            this.setState({
                lessonList: ["Easy Lesson 1", "Easy Lesson 2"]
            });
        } else if(newState == "Medium"){
            this.setState({
                lessonList: ["Medium Lesson 1", "Medium Lesson 2"]
            })
        } else if(newState == "Hard") {
            this.setState({
                lessonList: ["Hard Lesson 1", "Hard Lesson 2"]
            })
        }
    },

    sendPlayer: function(){
        var dataToBeSent = {
            "userName": this.state.currUser,
            "score": this.state.score
        }
        this.state.userScores.push(dataToBeSent);
        // var Player= {"\"playerName\"":this.state.currUser, "\"score\"":this.state.score};
        // // var JsonPlayer = JSON.parse(Player);
        // console.log(Player);
        this.setState({
            getUserDetails: false,
            showHighScores: true,
            showLesson: false,
            showQuestion: false,
            addHighScore: false
        })
    },

    getQuestions: function(newState){
        if(newState == "Easy"){
            this.setState({
                //questionsList: [{"answer1": "dummy answer 1","answer2": "dummy answer 2", "answer3": "dummy answer 3", "answer4": "dummy answer 4", "correctOrder":"1234"}]
                questionsList: [
                    {
                        "id": 1,
                        "levelDifficulty": 1,
                        "levelPosition": 1,
                        "levelNumber": "1A",
                        "levelName": "Hello World!",
                        "lesson": "within java all commands should be ended with a certain character.\n this charcter is the semi-colon the ; key. \n the computer sees this key as a end line symbol.",
                        "levelDescription": "Put a child friendly description of level here (Build Hello World)",
                        "levelCode": {
                            "question": [
                                "public class Hello{<br>&emsp;public static void main() {<br>&emsp;&emsp;System.out.println(\"Hello World\")",
                                "<br>&emsp;}<br>}",
                                "", //this is the last line ensuring there is a div at the end of the previous line.
                                ""
                            ]
                        },
                        "timer": 600,
                        "chances": 5,
                        "solution": [{
                            "answerPosition": "place1",
                            "answerCodeSnippet": ";",
                            "id": 5
                        },{
                            "answerPosition": "placeD",
                            "answerCodeSnippet": ".",
                            "id": 6
                        },{
                            "answerPosition": "place2",
                            "answerCodeSnippet": "hello",
                            "id": 7
                        },{
                            "answerPosition": "place3",
                            "answerCodeSnippet": "extra answer",
                            "id": 8
                        }
                        ]
                    },
                    {
                        "id": 2,
                        "levelDifficulty": 1,
                        "levelPosition": 1,
                        "levelNumber": "1A",
                        "levelName": "Hello World!",
                        "levelDescription": "Put a child friendly description of level here (Build Hello World)",
                        "levelCode": {
                            "question": [
                                "public class Hello{<br>&emsp;public static void main() {<br>&emsp;&emsp;System.out.println(\"Hello World\")",
                                "<br>&emsp;}<br>}",
                                "", //this is the last line ensuring there is a div at the end of the previous line.
                                ""
                            ]
                        },
                        "timer": 600,
                        "chances": 5,
                        "solution": [{
                            "answerPosition": "place1",
                            "answerCodeSnippet": ";",
                            "id": 5
                        },{
                            "answerPosition": "placeD",
                            "answerCodeSnippet": ".",
                            "id": 6
                        },{
                            "answerPosition": "place2",
                            "answerCodeSnippet": "hello",
                            "id": 7
                        },{
                            "answerPosition": "place3",
                            "answerCodeSnippet": "extra answer",
                            "id": 8
                        }
                        ]
                    }

                ]
            });
        } else if(newState == "Medium"){
            this.setState({
                questionsList: ["Medium Question 1"]
            })
        } else if(newState == "Hard") {
            this.setState({
                questionsList: ["Hard Question 1"]
            })
        }
    },


    getAnswers: function(newState){
        if(newState == "Easy"){
            this.setState({
                answersList: ["Easy Answer 1"]
            });
        } else if(newState == "Medium"){
            this.setState({
                answersList: ["Medium Answer 1"]
            })
        } else if(newState == "Hard") {
            this.setState({
                answersList: ["Hard Answer 1"]
            })
        }
    },

    getUserName: function(){
        document.getElementById('text').style.visibility='hidden';
        document.getElementById('first').innerHTML='HUH ' + document.getElementById('text').value +'? that\'s a nice name';

        this.setState({
            currUser: document.getElementById('text').value,
        })

        this.setState({
            showHighScores: false,
            showQuestion: false,
            showLesson: true,
            getUserDetails: false
        })
    },

    goToAbout: function(){
        this.setState({
            showAboutUs: true,
            showHighScores: false,
            showQuestion: false,
            showLesson: false,
            addHighScore: false,
            score: 0,
            index: 0
        })
    },

    renderAboutUs: function(){
        return (
            <div>
                <NavBar parentMethod={this.handleState} />
                <div className="container">
                    <h1 className="leaf">About us</h1>
                    <p>Our mission is (Insert generic motivational stuff here) "for the youth"</p>
                </div>
                <span className="footer"></span>

            </div>
        )
    },

    renderLesson: function(){
        return (
            <div>
                <NavBar parentMethod={this.handleState}/>
                <div className="container">
                    <Lesson parentMethod={this.lessonFinish} index={this.state.index} lessonList={this.state.questionsList} difficulty={this.state.difficulty}/>
                </div>

            </div>
        )
    },

    renderQuestion: function(){
        return(
            <div>
                <NavBar parentMethod={this.handleState}/>
                <div className="container">
                    <Question parentMethod={this.next} index={this.state.index} questionsList={this.state.questionsList} difficulty={this.state.difficulty}/>
                </div>

            </div>
        )

    },

    renderGetUserDetails: function(){
        return(
            <div>
                <NavBar parentMethod={this.handleState}/>
                <div className="container">
                    <form>
                        <div id='first'> Hey there friend, what's your name? </div>
                        <input id='text' className="text"/>
                        <button id='datdearbutton' onClick={this.getUserName}>Yes that's my name.</button>
                    </form>
                </div>

            </div>
        )
    },
    renderHighScores: function(){
        return(
            <div>
                <NavBar parentMethod={this.handleState}/>
                <div className="container">
                    <HighScores userScores={this.state.userScores}/>

                </div>

            </div>
        )
    },

    renderAskToAdd: function(){
        return(
            <div>
                <NavBar parentMethod={this.handleState}/>
                <div className="container">
                    <h3>Congratulations {this.state.currUser}. Your total score was {this.state.score} </h3>
                    <h4> Would you like to submit your score?</h4>
                    <button type="button" onClick={this.goToAbout} className="btn btn-warning">No</button>
                    <button type="button" onClick={this.sendPlayer} className="btn btn-success">Yes</button>

                </div>
            </div>
        )
    },

    render: function(){
        if(this.state.showAboutUs){
            return this.renderAboutUs();
        }
        else if(this.state.showLesson){
            return this.renderLesson();
        }
        else if(this.state.showQuestion){
            return this.renderQuestion();
        }
        else if(this.state.getUserDetails){
            return this.renderGetUserDetails();
        }
        else if(this.state.showHighScores){
            return this.renderHighScores();
        }
        else if(this.state.addHighScore){
            return this.renderAskToAdd();
        }
    }
});
export default App;
