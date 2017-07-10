import { Component } from '@angular/core';



@Component({
	selector: 'playboard',
	templateUrl: './game.component.html',
	styleUrls: [
		'./game.component.css'
	]
})
export class GameComponent {
	wordTarget: string = "Relentless";
	correctWord: string = "Persisting";
	wordArray: string[] = ["Hopeless", "Brave", "Persisting", "Rushed"];
	playerPoints: number = 0;
	roundsPlayed: number = 0;
	isClickedOnce: boolean = false;

	wordObject: WordObject[] = [new WordObject("Hopeless"), new WordObject("Brave"), new WordObject("Persisting"), new WordObject("Rushed")];



	/// TODO: Make wordArray into a wordObject so that it can have word.Text and word.AlreadyClicked
	playerGuess(guess: string): void {
		console.log(guess);
		if (guess == this.correctWord) {
			this.playerPoints++;
			this.roundsPlayed++;
			this.newRound();
			return;
		}
		else {
			this.roundsPlayed++;
			// this.newRound();
			// this.isClickedOnce = true;
			return
		} 
	} 

	newRound(): void {
		this.correctWord = "Holland";
		this.wordTarget = "Amsterdam";
		this.wordObject = [new WordObject("Holland"), new WordObject("Germany"), new WordObject("Slovakia"), new WordObject("Prague")];

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

	constructor(solution: string) {
		this.Solution = solution;
		this.IsClicked = false;
	}
}