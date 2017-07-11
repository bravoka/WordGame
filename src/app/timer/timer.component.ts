import { Component } from '@angular/core';



@Component({
	selector: 'game-timer',
	templateUrl: './timer.component.html',
	styleUrls: [
		'./timer.component.css'
	]

})
export class TimerComponent {
	// timeStart: number = 5;
	// refresh: number = 1000;
	// timeFinish: number = 0;
	// resetTime: number = 5;

	// public DoWork(): void {
	// 	this.timeStart--;
	// }

	// SimpleCountdown(): void {
	// 	let _myInterval: any;
	// 	_myInterval = setInterval(() => { 
	// 		// console.log("blah" + _myInterval);
	// 		this.timeStart > this.timeFinish ? this.timeStart-- : clearInterval(_myInterval);
	// 		// console.log("blah" + _myInterval);

	// 	}, 1000);
	// }

	// Reset(): void {
	// 	this.timeStart = this.resetTime;
	// 	return;
	// }
}

