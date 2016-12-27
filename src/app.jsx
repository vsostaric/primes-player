import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function isPrime(number) {
	if(number <= 7) {
		if(number == 1 || number == 3 || number == 5 || number == 7) {
			return true;
		} else {
			return false;
		}
	}

	if(
		number % 2 === 0 ||
		number % 3 === 0 ||
		number % 5 === 0 ||
		number % 7 === 0
		) {
		return false
	} 
	return true;
}

var PrimeNumberTester = React.createClass({

	checkIsNumberPrime: isPrime,

	checkInput: function(e) {

		var inputNumber = e.target.value;

		if(inputNumber === '' || inputNumber === undefined) {

			this.setState( {
				primeTestResult: ''
			});

		} else if(isNaN(inputNumber)) {

			this.setState( {
				primeTestResult: ' Not even a fucking number!'
			});
			
		} else {

			if(this.checkIsNumberPrime(inputNumber)) {
				this.setState( {
					primeTestResult: ' is prime'
				});
			} else {
				this.setState( {
					primeTestResult: ' is not prime'
				});
			}
		}

		this.forceUpdate(this.state);
		
	},

	PrimeTestOutput: function(props) {
		return(

			<span>{props.primeTestResult}</span>

		);

	},

	getInitialState: function() {
		return {
			primeTestResult: ''
		}
	},

	render: function() {
		return(
			<div>
				<div>Enter number:</div>
				<input type="text" name="primeTestInput" onChange= {this.checkInput} />
				<this.PrimeTestOutput primeTestResult= {this.state.primeTestResult} />
			</div>
		)
	}

});

var FirstNPrimesLister = React.createClass({

	checkIsNumberPrime: isPrime,

	setFirstNPrimes: function(e) {

		this.setState({
			firstNPrimes: e.target.value
		});
		
	},

	showNPrimes: function() {
		ReactDOM.render(<this.FirstNPrimes firstNPrimes={this.state.firstNPrimes}/>, document.getElementById('firstNPrimes'));
	},

	FirstNPrimes: function(props) {

		var returnTable = '';

		var primesCounted = 0;
		var iterator = 0;
		while(primesCounted < props.firstNPrimes) {
			if(this.checkIsNumberPrime(iterator)) {
				returnTable += ' ' + iterator;
				primesCounted++;
			}
			iterator++;	
		}

		return(
			<div>
				<span>The first {props.firstNPrimes} primes :</span>
				<div>{returnTable}</div>
			</div>
		);
	},

	getInitialState: function() {
		return {
			firstNPrimes: 0
		}
	},

	render: function() {
		return(

			<div>
				<input type="text" name="firstNPrimes" value={this.firstNPrimes} onChange={this.setFirstNPrimes}/>
				<button onClick={this.showNPrimes}>Show</button>
				<div id="firstNPrimes"></div>
			</div>

		)
	}

});

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

		var questionTypes = ["identifyPrime", "identifyNonPrime"];
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
		}
		
		return(
			<div>
				<span>{question}</span>
					<span>
					{
						answerOptions.map(function(opt, index) {
							return(

								<button class="answer-option" onClick={function() { props.checkAnswer((index === indexOfCorrect)) }}>{opt}</button>

							)
						})
					}

					</span>

			</div>
		)

	},

	askQuestion: function() {
		ReactDOM.render(<this.Question checkAnswer={function(ans) {this.checkAnswer(ans)}.bind(this)}/>, document.getElementById('question'));
		//event handler which checks buttons with class answer-options
	},

	getInitialState: function() {
		return {
			numOfCorrect: 0,
			numOfWrong: 0
		}
	},

	render: function() {
		return(

			<div>
				<span id="question"></span>
				<button onClick={this.askQuestion}>Start!</button>
				<span>
					<div>Correct : {this.state.numOfCorrect}</div>
					<div>Wrong : {this.state.numOfWrong}</div>
				</span>
			</div>

		)
	}

});

function Container() {
	return(
		<div>

			<PrimeNumberTester />
				
			<FirstNPrimesLister />

			<PrimesQuizGame />

		</div>

	)
}

ReactDOM.render(<Container />, document.getElementById('container'));
