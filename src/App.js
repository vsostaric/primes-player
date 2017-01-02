import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './componentCss/PrimeNumberTester.css';

import PrimeNumberTester from './PrimeNumberTester.js';
import FirstNPrimesLister from './FirstNPrimesLister.js';
import PrimesQuizGame from './PrimesQuizGame.js'

class App extends Component {
  render() {

  }
}

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

export default App;
