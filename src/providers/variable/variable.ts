import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class VariableProvider {
	rootUrl: string = 'http://localhost/router/public/api/';
	constructor(public http: HttpClient) {
		console.log('Hello VariableProvider Provider');
		
	}

}
