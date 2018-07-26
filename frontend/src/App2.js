import React, { Component } from 'react';
import $ from 'jquery';
import logo from './logo.svg';
import './App.css';

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
            lessonList: [],
            questionsList: [],
            answersList: [],
            difficulty: null,
            index: 0,
            score: 0,
            userScores: []
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
                difficulty: null
            })
        } else if(newState == "Easy"){
            this.setState({
                showLesson: true,
                showQuestion: false,
                showAboutUs: false,
                difficulty: "Easy"
            })
        } else if(newState == "Medium"){
            this.setState({
                showLesson: true,
                showQuestion: false,
                showAboutUs: false,
                difficulty: "Medium"
            })
        } else if(newState == "Hard"){
            this.setState({
                showLesson: true,
                showQuestion: false,
                showAboutUs: false,
                difficulty: "Hard"
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
                showQuestion: false
            })
        } else {
            this.setState({
                getUserDetails: true,
                showLesson: false,
                showQuestion: false,
                score: score
            })
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

    getQuestions: function(newState){
        if(newState == "Easy"){
            this.setState({
                //questionsList: [{"answer1": "dummy answer 1","answer2": "dummy answer 2", "answer3": "dummy answer 3", "answer4": "dummy answer 4", "correctOrder":"1234"}]
                questionsList: [{
                    "id": 1,
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
                }]
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

    getdatname: function(){
        document.getElementById('text').style.visibility='hidden';
        document.getElementById('first').innerHTML='HUH ' + document.getElementById('text').value +' eh? nice sounding name ya punter';
        document.getElementById('second').innerHTML= 'hey, ya want me to add ya to de list? all the cool people are on its.';
        var dataToBeSent = {
            "userName": document.getElementById('text').value,
            "score": this.state.score
        }

        this.state.userScores.push(dataToBeSent);
        this.setState({
            showHighScores: true,
            showQuestion: false,
            showLesson: false,
            getUserDetails: false
        })
    },

    renderAboutUs: function(){
        return (
            <div>
                <NavBar parentMethod={this.handleState} />
                <div className="container">
                    <h1>About us</h1>
                    <p>Our mission is (Insert generic motivational stuff here) "for the youth"</p>
                </div>

            </div>
        )
    },

    renderLesson: function(){
        return (
            <div>
                <NavBar parentMethod={this.handleState}/>
                <Lesson parentMethod={this.lessonFinish} index={this.state.index} lessonList={this.state.lessonList} difficulty={this.state.difficulty}/>
            </div>
        )
    },

    renderQuestion: function(){
        return(
            <div>
                <NavBar parentMethod={this.handleState}/>
                <Question parentMethod={this.next} index={this.state.index} questionsList={this.state.questionsList} difficulty={this.state.difficulty}/>
            </div>
        )

    },

    renderGetUserDetails: function(){
        return(
            <div>
                <NavBar parentMethod={this.handleState}/>
                <div className="container">
                    <form>
                        <div id='first'> HEY UP KIDDO, WHAT'S YA NAME? </div>
                        <div id='second'>  I'LL MAKE YOU A WINNA! </div>
                        <input id='text' className="text"/>
                        <button id='datdearbutton' onClick={this.getdatname}>YA DAT'S MA NAME, MATE!</button>
                    </form>
                </div>
            </div>
        )
    },
    renderHighScores: function(){
        return(
            <div>
                <NavBar parentMethod={this.handleState}/>
                <HighScores userScores={this.state.userScores}/>
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
    }
});
export default App;
