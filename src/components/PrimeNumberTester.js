import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import isPrime from './CommonFunctions.js';

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
				primeTestResult: ' Not even a number!'
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
			<div className="PrimeNumberTester">
				<div>Enter number:</div>
				<input type="text" className="input-lg" name="primeTestInput" onChange= {this.checkInput} />
				<this.PrimeTestOutput primeTestResult= {this.state.primeTestResult} />
			</div>
		)
	}

});

export default PrimeNumberTester