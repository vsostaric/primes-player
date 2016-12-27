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

	checkAnswer: function(ans) {
		if(ans === 1) {
			this.setState({
				numOfCorrect: this.state.numOfCorrect += 1
			});
			
		} else {
			this.setState({
				numOfWrong: this.state.numOfWrong += 1
			});
		}

	},

	Question: function(props) {

		//generates questions and correct option must call checkAnswer with 1, other with -1
		return(
			<div>
				<span>Is 55 prime?</span>
				<span><button class="answer-option correct" onClick={function() { props.checkAnswer(1) }}>Yes?</button></span>
				<span><button class="answer-option" onClick={function() {props.checkAnswer(-1)}}>No?</button></span>
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
