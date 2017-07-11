import { Injectable } from '@angular/core';

@Injectable()
export class WordsService {
	getJsonData(): string {
		let jsonData: string = `{"key":"value"}`;
		return jsonData;
	}
}