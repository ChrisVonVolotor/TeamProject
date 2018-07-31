import React, { Component } from 'react';
import $ from 'jquery';

import NavBar from './NavBar2.js';
import Lesson from './Lesson.js';
import Question from './Question.js';
import HighScores from './HighScores.js';
import bee from './bee.png';

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
            currUser: "",
            email: ""
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

    updateEmail: function(){
        this.setState({
            email: document.getElementById("email").value
        })
    },

    sendPlayer: function(){

        if(this.state.email!="" && !this.state.email.match("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")){
            document.getElementById("emailMessage").style.visibility = "visible";
        }else{
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
        }

    },

    postScore: function(){
        var self = this;
        $.ajax({
            url: "http://localhost:8080/demo/add?firstname="+this.refs.firstName.value+"&surname="+this.refs.surName.value+"&accNumber="+this.refs.accNumber.value,
            type: 'POST'
        }).then(function (data) {
            self.props.parentMethod("viewing");
        });
    },

    getHighScores: function(){

        $.ajax({
            url: "http://localhost:8080/something/scores/json/",
            dataType: 'json'
        }).then(function (data) {
            this.setState({
                userScores: data
            });
        });
    },

    getFromAPI: function(difficulty){

        var url = "";

        if(difficulty == "Easy"){
            url = "http://localhost:8080/something/questions/json/1";
        } else if(difficulty == "Medium"){
            url = "http://localhost:8080/something/questions/json/2";
        } else if(difficulty == "Hard"){
            url = "http://localhost:8080/something/questions/json/3";
        }

        $.ajax({
            url: url,
            dataType: 'json'
        }).then(function (data) {
            this.setState({
                questionsList: data
            });
        });
    },


    getQuestions: function(newState){
        if(newState == "Easy"){

            this.getFromAPI(newState);

            this.setState({
                //questionsList: [{"answer1": "dummy answer 1","answer2": "dummy answer 2", "answer3": "dummy answer 3", "answer4": "dummy answer 4", "correctOrder":"1234"}]
                questionsList: [
                    {
                        "id": 1,
                        "levelDifficulty": 1,
                        "levelPosition": 1,
                        "levelNumber": "1A",
                        "levelName": "Hello World!",
                        "lesson": "Within java all statements should be ended with a semi-colon.\n This is the ; key. \n This tells java that this is the end of the our statement.",
                        "levelDescription": "Put a child friendly description of level here (Build Hello World)",
                        "levelCode": {
                            "question": [
                                "String colour = \"Red\"",
                                ""
                            ]
                        },
                        "timer": 600,
                        "chances": 5,
                        "solution": [{
                            "answerPosition": "place1",
                            "answerCodeSnippet": ";",
                        },{
                            "answerPosition": "placeD",
                            "answerCodeSnippet": ".",
                        },{
                            "answerPosition": "placeD",
                            "answerCodeSnippet": ":",
                        }
                        ]
                    },
                    {
                        "id": 2,
                        "levelDifficulty": 1,
                        "levelPosition": 1,
                        "levelNumber": "1A",
                        "levelName": "Hello World!",
                        "lesson": "something something",
                        "levelDescription": "Put a child friendly description of level here (Build Hello World)",
                        "levelCode": {
                            "question": [
                                "public class Hello{<br>&emsp;public static void main() {<br>&emsp;&emsp;System.out.println(\"Hello World\")",
                                "<br>&emsp;}<br>}",

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
                            "answerPosition": "placeD",
                            "answerCodeSnippet": "hello",
                            "id": 7
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
                <div className="footerText">
                    <div className="leaf">
                        <h1 className="header">About us</h1>
                    </div>
                    <p>Our mission is (Insert generic motivational stuff here) "for the youth"</p>
                </div>
                <img className="bee" src={bee} alt="Logo" />
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
                <img className="bee" src={bee} alt="Logo" />
                <span className="footer"></span>

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
                <img className="bee" src={bee} alt="Logo" />

                <span className="footer"></span>

            </div>
        )

    },

    renderGetUserDetails: function(){
        return(
            <div>
                <NavBar parentMethod={this.handleState}/>
                <div className="container">
                    <div>
                        <h1>&nbsp;Guide</h1><br/>
                        <p>Hey there, you're about to get started with our exercises that are designed to teach you the basic principles of coding in small easy steps. Before each question there will be a lesson which you should pay close attention to as it may just help you in answering the question.<br/><br/> Each question is worth 10 points but for every attempt you get wrong you'll lose a point. Don't worry, the lowest you can get is 1 point for each question so there is always a point to play for. Good luck and just maybe we'll see your name on our highscores.</p>
                    </div>
                    <form>
                        <div id='first'>&nbsp; Before we start, could you tell me your name? </div><br></br>
                            <input className="textbox inline" id='text'/>
                                <button className="btn btn-success"   id='datdearbutton' onClick={this.getUserName}>Submit</button>
                    </form>
                </div>
                <img className="bee" src={bee} alt="Logo" />

                <span className="footer"></span>

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
                <img className="bee" src={bee} alt="Logo" />

                <span className="footer"></span>

            </div>
        )
    },

    renderAskToAdd: function(){
        return(
            <div>
                <NavBar parentMethod={this.handleState}/>
                <div className="container">
                    <h1>&nbsp;Congratulations {this.state.currUser}. Your total score was {this.state.score} </h1><br/><br/>
                    <span> Would you like to submit your score? Optionally, type in an email address if you would like to receive an email with your score</span><br/><br/>
                        Email: <input type="email" onChange={this.updateEmail} id="email" className="textbox inline" />&nbsp;<span id="emailMessage" className="emailMessage alert alert-danger">Email address is not valid</span>

                    <br/><br/>
                    <button type="button" onClick={this.goToAbout} className="btn btn-success">No</button>
                    <button type="button" onClick={this.sendPlayer} className="btn btn-success">Yes</button>
                </div>

                <img className="bee" src={bee} alt="Logo" />

                <span className="footer"></span>

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
