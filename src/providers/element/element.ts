import { VariableProvider } from './../variable/variable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ElementProvider {
	rootUrl: string;

	constructor(public http: HttpClient, public variable: VariableProvider) {
		console.log('Hello ElementProvider Provider');
		this.rootUrl = variable.rootUrl;
	}

	get(elementId, type) {
		return new Promise(resolve => {
			this.http.get(this.rootUrl + type + '_element/' + elementId).subscribe(
				data => { resolve(data) },
				err => {
					console.warn(['get', err]);
				}
			)
		});
	}

	save(element, type) {
		return new Promise(resolve => {
			this.http.put(this.rootUrl + type + '_element/' + element.id, element).subscribe(
				data => { resolve(data) },
				err => {
					console.warn(['save', err]);
				}
			)
		});
	}

}
