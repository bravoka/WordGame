import { Component, OnInit } from '@angular/core';
import { WordObject } from '../WordObject';

import { WordService } from '../services/words.service';

@Component({
	selector: 'playboard',
	templateUrl: './game.component.html',
	styleUrls: [
		'./game.component.css'
	],
	providers: [
		WordService
	]
})
export class GameComponent implements OnInit {

	shuffledSequence: number[] = [];
	
	selectionsIteration: number = 0;

	jsonData: any;
	
	wordTarget: string;
	
	correctWord: string;

	playerPoints: number = 0;
	
	roundsPlayed: number = 0;

	wordObject: WordObject[] = [];
	
	rawJson: string;

	currentWord: WordObject;

	isClickedArray: boolean[] = [ false, false, false, false];

	buttonClass: string[] = [ "choiceButtonOpen", "choiceButtonOpen", "choiceButtonOpen", "choiceButtonOpen" ]

	constructor(private wordService: WordService) { }

	ngOnInit(): void {
		this.getWordsObject();
		this.currentWord = this.wordObject[0];
		console.log(this.currentWord);
	}

	getWordsObject(): void {
		this.wordObject = this.wordService.getWordsObject();
	}

	/// TODO: Make wordArray into a wordObject so that it can have word.Text and word.AlreadyClicked
	playerGuess(guess: string, index: number): void {
		if (guess == this.currentWord.Solution) {
			this.playerPoints++;
			this.roundsPlayed++;
			this.selectionsIteration++;
			if (this.selectionsIteration != this.wordObject.length) {
				this.newRound();
				return;
			}
			else {
				alert("Game over");
				// Need to reset everything or go to a new page after this.
			}
		}
		else {
			this.roundsPlayed++;
			console.log("Incorrect guess: " + guess);
			this.isClickedArray[index] = true;
			this.buttonClass[index]='choiceButtonClosed';
			return
		} 
	} 

	newRound(): void {
		

		this.isClickedArray = [ false, false, false, false ];

		this.buttonClass = [ "choiceButtonOpen", "choiceButtonOpen", "choiceButtonOpen", "choiceButtonOpen" ];

		this.currentWord = this.wordObject[this.selectionsIteration];
	
	}
	active: boolean = true;
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

			this.timeStart > this.timeFinish ? this.timeStart-- : clearInterval(_myInterval);

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
