import { Component, OnInit } from '@angular/core';


@Component({
	selector: 'playboard',
	templateUrl: './game.component.html',
	styleUrls: [
		'./game.component.css'
	]
})
export class GameComponent implements OnInit {


	rawJson: string = `
	{
		"difficulty": "beginner",
		"selections": [
			{
				"target": "relentless",
				"answer": "persisting",
				"words": [
					"hopeless",
					"brave",
					"persisting",
					"rushed" 
				]
			},
			{
				"target": "amsterdam",
				"answer": "holland",
				"words": [
					"holland",
					"germany",
					"slovakia",
					"prague"
				]
			},
			{
				"target": "ag",
				"answer": "silver",
				"words": [
					"gold",
					"argon",
					"silver",
					"arsenic"
				]
			},
			{
				"target": "candid",
				"answer": "frank",
				"words": [
					"hidden",
					"elusive",
					"obtrusive",
					"frank"
				]
			}
		]
	}`
	constructor() {


		this.jsonData = JSON.parse(this.rawJson); 

		for (let i = 0; i < this.jsonData.selections.length; i++) {
			this.shuffledSequence.push(i); // change this to raw sequence later?
		}

		// Fisher-Yates
		let n = this.jsonData.selections.length, i, j;
		while (n > 0) {
			j = Math.floor(Math.random() * n);
			n--;
			i = this.shuffledSequence[n];
			this.shuffledSequence[n] = this.shuffledSequence[j];
			this.shuffledSequence[j] = i;
		}

		this.correctWord = this.jsonData.selections[this.shuffledSequence[0]].answer;

		this.wordTarget = this.jsonData.selections[this.shuffledSequence[0]].target;

		for (let seed of this.jsonData.selections[this.shuffledSequence[0]].words) {
			this.wordObject.push(new WordObject(seed));
			console.log(seed);
		}
	}

	
	// how does this work?
	ngOnInit() {
		// let initial = 2;
		// for (let seed of this.jsonData.selections[initial].words) {
		// 	this.wordObject.push(new WordObject(seed));
		// 	console.log(seed);
		// }
	}

	shuffledSequence: number[] = [];
	selectionsIteration: number = 0;

	jsonData: any;
	wordTarget: string;
	correctWord: string;

	playerPoints: number = 0;
	roundsPlayed: number = 0;

	wordObject: WordObject[] = [];

	/// TODO: Make wordArray into a wordObject so that it can have word.Text and word.AlreadyClicked
	playerGuess(guess: string): void {
		if (guess == this.correctWord) {
			this.playerPoints++;
			this.roundsPlayed++;
			this.selectionsIteration++;
			if (this.selectionsIteration != this.shuffledSequence.length) {
				this.newRound();
				return;
			}
			else {
				alert("Game over");
			}
		}
		else {
			this.roundsPlayed++;
			console.log("Incorrect guess: " + guess);
			
			// this.newRound();
			// this.isClickedOnce = true;
			return
		} 
	} 

	newRound(): void {
		this.correctWord = this.jsonData.selections[this.shuffledSequence[this.selectionsIteration]].answer;
		this.wordTarget = this.jsonData.selections[this.shuffledSequence[this.selectionsIteration]].target;
		this.wordObject = [];

		for (let i of this.jsonData.selections[this.shuffledSequence[this.selectionsIteration]].words) {
			this.wordObject.push(new WordObject(i));
		}

	}
	active: boolean = false;
	timeStart: number = 5;
	refresh: number = 1000;
	timeFinish: number = 0;
	resetTime: number = 5;

	public DoWork(): void {
		this.timeStart--;
		// this.active = true;
	}

	SimpleCountdown(): void {
		this.active = true;
		let _myInterval: any;
		_myInterval = setInterval(() => { 
			// console.log("blah" + _myInterval);
			this.timeStart > this.timeFinish ? this.timeStart-- : clearInterval(_myInterval);
			// console.log("blah" + _myInterval);

		}, 1000);
	}

	Reset(): void {
		this.timeStart = this.resetTime;
		return;
	}

	// playerGuess(guess: string): boolean {
	// 	if (this.wordArray.indexOf(correctWord) > -1) {
	// 		return true;
	// 	} 
	// } 
}

class WordObject {
	Solution: string;
	IsClicked: boolean = false;
	Class: string = "choiceButtonOpen";

	constructor(solution: string) {
		this.Solution = solution;
	}
}