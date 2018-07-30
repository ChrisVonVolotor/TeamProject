import React, { Component } from 'react';
import Draggable from 'react-draggable';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Button from "./Button";
import Timer from './Timer.js';

var createReactClass = require('create-react-class');
var Question = createReactClass({

    getInitialState: function(){
        return {
            isAnswered: false,
            correct: false,
            showAnswer: false,
            score: 0,
            attempts: 0
        }
    },

    handleClick: function(){
        this.props.parentMethod(this.state.score);
    },

    isCorrect: function(){
        var isCorrect = true;
    var answers = this.props.questionsList[this.props.index].solution;
        for (var i=0; i< answers.length;i++) {
            if (answers[i].answerPosition != "placeD"){
                if(document.getElementById(answers[i].answerPosition).innerHTML != "\u2003"+answers[i].answerCodeSnippet+"\u2003"){
                    isCorrect = false;
                    console.log("There was a mismatch with your answers");
                    this.setState({
                        attempts: this.state.attempts+1
                    })
                }
            }
        }
        if(isCorrect && this.state.attempts<10){
            this.setState({
                correct: true,
                isAnswered: true,
                score: (this.state.score+10)-this.state.attempts
            })
        } else if(isCorrect){
            this.setState({
                correct: true,
                isAnswered: true,
                score: 1
            })
        }
    },

    compareAnswer: function(){

    },

    allowDrop: function(event){
        event.preventDefault();
    },

    // allowDrop: function(event){
    //     event.preventDefault();
    // },

    drag: function(event){
        event.dataTransfer.setData("text", event.target.id);
    },

    drop: function(event) {
    event.preventDefault();
    if( "place" == event.target.className) {
        var data = event.dataTransfer.getData("text");
        event.target.innerHTML = "&emsp;"+document.getElementById(data).innerHTML+"&emsp;";
    }
    if("missing" == event.target.className){
        event.target.value = event.dataTransfer.getData("text");
    }
    },

    renderQuestion: function(){
        const html = this.props.questionsList[this.props.index].levelCode
        return (
            <div>
                <div>Number of attempts: {this.state.attempts}</div>
                <div>Your score: {this.state.score}</div>

                <div style={{align: "left"}}>
                    {this.props.questionsList[this.props.index].solution.map((item,i) => {
                        var idName = "drag";
                        return <span className="dragItem" key={i} id={idName+(i+1)} draggable="true" onDragStart={this.drag}>{ReactHtmlParser(item.answerCodeSnippet)}</span>
                    })
                    }
                </div>

                <br></br>
                    {/*<Draggable><div>{this.props.questionsList[this.props.index].answer1}</div></Draggable><br></br>*/}
                    {/*<Draggable><div>{this.props.questionsList[this.props.index].answer2}</div></Draggable><br></br>*/}
                    {/*<Draggable><div>{this.props.questionsList[this.props.index].answer3}</div></Draggable><br></br>*/}
                    {/*<Draggable><div>{this.props.questionsList[this.props.index].answer4}</div></Draggable><br></br>*/}
                    {/*<div dangerouslySetInnerHTML={this.setQuestion()}></div>*/}

                <div style={{align: "center"}}>
                    {this.props.questionsList[this.props.index].levelCode.question.map((item,i) => {
                        var idName = "place";
                        if (i < this.props.questionsList[this.props.index].levelCode.question.length - 1) {
                            return <span key={i}>{ReactHtmlParser(item)}
                                <span id={idName+(i+1)} className="place" onDrop={this.drop} onDragOver={this.allowDrop} style={{border: "solid"}}>&emsp;</span></span>
                        } else {
                            return <span key={i}>
                            {ReactHtmlParser(item)}
                        </span>
                        }
                    })
                    }
                </div>




                <br></br>
                    <button type="button" onClick={this.isCorrect} className="btn btn-success">Submit</button>
                    <button type="button" onClick={this.handleButtonClick} className="btn btn-success">Hint</button>
                <Timer ref={this.child}/>
            </div>
        )
    },


    renderCorrect: function(){
        return (
            <div>
                <div>Number of attempts: {this.state.attempts}</div>
                <div>Your score: {this.state.score}</div>

                {this.props.questionsList[this.props.index].solution.map((item,i) => {
                    var idName = "drag";
                    return <div key={i} id={idName+(i+1)} draggable="true" onDragStart={this.drag} className="drag">{ReactHtmlParser(item.answerCodeSnippet)}</div>
                })
                }
                <br></br>
                {this.props.questionsList[this.props.index].levelCode.question.map((item,i) => {
                    var idName = "place";
                    if (i < this.props.questionsList[this.props.index].levelCode.question.length - 1) {
                        return <span key={i}>{ReactHtmlParser(item)}
                            <span id={idName+(i+1)} className="place" onDrop={this.drop} onDragOver={this.allowDrop} style={{border: "solid"}}>&emsp;</span></span>
                    } else {
                        return <span key={i}>
                            {ReactHtmlParser(item)}
                        </span>
                    }
                })
                }
                <h1>You're correct!</h1>
                <br></br>
                <button type="button" onClick={this.handleClick} className="btn btn-success">Next</button>

            </div>
        )
    },

    render: function(){
        if(!this.state.isAnswered){
            return this.renderQuestion();
        } else if(this.state.showAnswer){
            return this.renderResult()
        } else if(this.state.correct){
            return this.renderCorrect();
        }
    }
});
export default Question;