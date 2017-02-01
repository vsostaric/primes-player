import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import isPrime from './CommonFunctions.js';

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var Button = require('react-bootstrap').Button;


var PrimesQuizGame = React.createClass({

	checkIsNumberPrime: isPrime,

	checkAnswer: function(ans) {
		if(ans) {
			this.setState({
				numOfCorrect: this.state.numOfCorrect += 1
			});

		} else {
			this.setState({
				numOfWrong: this.state.numOfWrong += 1
			});
		}

		this.askQuestion();

	},

	generateRandomNumber: function(lower, upper, isPrime) {

		var generatedNumber;
		var numberNotGenerated = true;

		do {

			generatedNumber = Math.floor(Math.floor((Math.random() * upper) + lower));
			if(this.checkIsNumberPrime(generatedNumber) === isPrime) {
				numberNotGenerated = false;
			}
		} while(numberNotGenerated);

		return generatedNumber;

	},

	generateRandomBoolean: function() {

		return Math.floor(Math.random()*2) > 0;

	},

	Question: function(props) {

		//generates questions and correct option must call checkAnswer with 1, other with -1

		var shuffle = function (array) {
		  var currentIndex = array.length, temporaryValue, randomIndex;

		  // While there remain elements to shuffle...
		  while (0 !== currentIndex) {

		    // Pick a remaining element...
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;

		    // And swap it with the current element.
		    temporaryValue = array[currentIndex];
		    array[currentIndex] = array[randomIndex];
		    array[randomIndex] = temporaryValue;
		  }

		  return array;
		};

		var questionTypes = ["identifyPrime", "identifyNonPrime", "isNumberPrime"];
		var questionTypeIndex = Math.floor((Math.random() * questionTypes.length));

		var question;
		var answerOptions = [];
		var indexOfCorrect;

		if(questionTypeIndex === 0) {
			question = 'Click on Prime number';
			var correctValue = this.generateRandomNumber(0,50,true);
			var options =
				[correctValue, this.generateRandomNumber(0,50,false), this.generateRandomNumber(0,50,false)];

			answerOptions = shuffle(options);
			indexOfCorrect = answerOptions.indexOf(correctValue);

		} else if(questionTypeIndex === 1) {
			question = 'Click on Non Prime number';

			var correctValue = this.generateRandomNumber(0,50,false);
			var options =
				[correctValue, this.generateRandomNumber(0,50,true), this.generateRandomNumber(0,50,true)];
			answerOptions = shuffle(options);
			indexOfCorrect = answerOptions.indexOf(correctValue);
		} else if(questionTypeIndex === 2) {

			var isPrime = this.generateRandomBoolean();
			var correctValue;

			var questionNumeber = this.generateRandomNumber(0,50,isPrime);

			if(isPrime) {
				correctValue = 'Yes';
				indexOfCorrect = 0;
			} else {
				correctValue = 'No';
				indexOfCorrect = 1;
			}

			question = 'Is ' + questionNumeber + ' prime?';
			var answerOptions = ['Yes', 'No' ];
		}

		return(
			<div>
				<span>{question}</span>

						{
							answerOptions.map(function(opt, index) {
								return(
									<Row>
										<Col sm={4}>
											<Button
												bsSize="large"
												class="answer-option"
												onClick={function() { props.checkAnswer((index === indexOfCorrect)) }}
												block>
													{opt}
											</Button>
										</Col>
									</Row>
								)
							})
						}

			</div>
		)

	},

	askQuestion: function() {
		ReactDOM.render(<this.Question checkAnswer={function(ans) {this.checkAnswer(ans)}.bind(this)}/>, document.getElementById('question'));
		//event handler which checks buttons with class answer-options
	},

	startGame: function() {
		this.setState({
				numOfCorrect: 0,
				numOfWrong: 0
			});
		this.askQuestion();
	},

	getInitialState: function() {
		return {
			numOfCorrect: 0,
			numOfWrong: 0
		}
	},

	render: function() {
		return(

			<div className="PrimesQuizGame">
				<div id="question"></div>
				<div>
					<button onClick={this.startGame}>Start!</button>
					<span>
						<div>Correct : {this.state.numOfCorrect}</div>
						<div>Wrong : {this.state.numOfWrong}</div>
					</span>
				</div>
			</div>

		)
	}

});

export default PrimesQuizGame;
