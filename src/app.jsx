import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './componentCss/PrimeNumberTester.css';

import PrimeNumberTester from './PrimeNumberTester.js';
import FirstNPrimesLister from './FirstNPrimesLister.js';
import PrimesQuizGame from './PrimesQuizGame.js'


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
				<Tab eventKey={1} title="first">
					<PrimeNumberTester />
				</Tab>
				<Tab eventKey={2} title="second">
					<FirstNPrimesLister />
				</Tab>
				<Tab eventKey={3} title="third">
					<PrimesQuizGame />
				</Tab>
			</Tabs>

		</div>

	)
}

var Container = React.createClass({
	getInitialState: function() {
		return {
			key: "1"
		}
	},
	handleSelect: function () {
  		alert('selected ');
	},
	render: function() {

		return(

		<div className="container">

			<TabsInstance />
			
		</div>

	)

	}
})

ReactDOM.render(<Container />, document.getElementById('application'));

export default App;
