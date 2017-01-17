import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import isPrime from './CommonFunctions.js';

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

			<div className="FirstNPrimesLister">
				<input type="text" name="firstNPrimes" value={this.firstNPrimes} onChange={this.setFirstNPrimes}/>
				<button onClick={this.showNPrimes}>Show</button>
				<div id="firstNPrimes"></div>
			</div>

		)
	}

});

export default FirstNPrimesLister;