import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class VariableProvider {
	rootUrl: string = 'http://localhost/router/public/api/';

	plugins: Object = {
		"PageController:menu": {
			title: "Site Menu"
		},
		":": {
			title: "Unknown"
		}
	}

	constructor(public http: HttpClient) {
		console.log('Hello VariableProvider Provider');
	}

}
