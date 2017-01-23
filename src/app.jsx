import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import PrimeNumberTester from './components/PrimeNumberTester.js';
import FirstNPrimesLister from './components/FirstNPrimesLister.js';
import PrimesQuizGame from './components/PrimesQuizGame.js'


import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-bootstrap/dist/react-bootstrap.js';

var Tabs = require('react-bootstrap').Tabs;
var Tab = require('react-bootstrap').Tab;

class App extends Component {
  render() {

  }
}

function TabsInstance() {
	return(
		<div>
			<Tabs defaultActiveKey={1}>
				<Tab eventKey={1} title="Prime number tester">
					<PrimeNumberTester />
				</Tab>
				<Tab eventKey={2} title="Primes Lister">
					<FirstNPrimesLister />
				</Tab>
				<Tab eventKey={3} title="Primes Quiz Game">
					<PrimesQuizGame />
				</Tab>
			</Tabs>

		</div>

	)
}

function Container() {

	return(

		<div className="container">

			<TabsInstance />
				
		</div>

	)

}

ReactDOM.render(<Container />, document.getElementById('application'));

export default App;
