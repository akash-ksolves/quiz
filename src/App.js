import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import qBank from './components/QuestionBank';
import Question from './components/Question';
import Score from './components/Score';

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			questionBank: qBank,
			currentQuestion: 0,
			selectedOption: '',
			score: 0,
			quizEnd: false,
		};

		this.handleOptionChange = this.handleOptionChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	handleOptionChange(e) {
		this.setState({
			selectedOption: e.target.value,
		});
	}

	handleFormSubmit(e) {
		e.preventDefault();
		this.checkAnswer();
		this.handleNextQuestion();
	}

	checkAnswer() {
		const { questionBank, currentQuestion, selectedOption } = this.state;

		if (selectedOption === questionBank[currentQuestion].answer) {
			this.setState((prev) => ({ score: prev.score + 1 }));
		}
	}

	handleNextQuestion() {
		const { questionBank, currentQuestion } = this.state;
		if (currentQuestion + 1 < questionBank.length) {
			this.setState((prev) => ({
				currentQuestion: prev.currentQuestion + 1,
				selectedOption: '',
			}));
		} else {
			this.setState({
				quizEnd: true,
			});
		}
	}

	render() {
		const {
			questionBank,
			currentQuestion,
			quizEnd,
			score,
			selectedOption,
		} = this.state;
		return (
			<div className="App d-flex flex-colomn align-items-center justify-content-center">
				<h1 className="app-title">Quiz App</h1>
				{!quizEnd ? (
					<Question
						question={questionBank[currentQuestion]}
						selectedOption={selectedOption}
						onOptionChange={this.handleOptionChange}
						onSubmit={this.handleFormSubmit}
					/>
				) : (
					<Score
						score={score}
						onNextQuestion={this.handleNextQuestion}
						className="score"
					/>
				)}
			</div>
		);
	}
}
