import { Component, OnInit } from '@angular/core';
import { WordObject } from '../WordObject';
import { Router } from '@angular/router';
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

	constructor(
		private wordService: WordService, 
		private router: Router) { }

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
			if (this.selectionsIteration == this.wordObject.length) {

				this.ResultsView("Good job!");
			}
			else {
				this.newRound();
				return;
				// Need to reset everything or go to a new page after this.
			}
		}
		else {
			this.roundsPlayed++;
			console.log("Incorrect guess: " + guess);
			this.isClickedArray[index] = true;
			this.buttonClass[index]='choiceButtonClosed';
			
			if (this.selectionsIteration == this.wordObject.length) {
				alert("Game over");
				this.ResultsView("Nice try!");
				return;
			}

			return;
		} 
	} 

	ResultsView(message: string): void {
		alert("Game over. " + message);
		this.router.navigate(['/view-results']);

	}

	newRound(): void {
		

		this.isClickedArray = [ false, false, false, false ];

		this.buttonClass = [ "choiceButtonOpen", "choiceButtonOpen", "choiceButtonOpen", "choiceButtonOpen" ];

		this.currentWord = this.wordObject[this.selectionsIteration];
	
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
			if (this.timeStart == 0) {
				this.ResultsView("Time Expired");
			}
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
