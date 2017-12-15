import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VariableProvider } from '../variable/variable';

@Injectable()
export class TemplateProvider {
	rootUrl: string;
	constructor(public http: HttpClient, public variable: VariableProvider) {
		console.log('Hello TemplateProvider Provider');
		this.rootUrl = variable.rootUrl;
	}

	list() {
		//return this.http.get(this.rootUrl + 'templates').map(result => result.json());
		return new Promise(resolve => {
			this.http.get(this.rootUrl + 'templates').subscribe(
				data => { resolve(data) },
				err => {
					console.warn(['getTemplates', err]);
				}
			);
		});
	}

	get(templateId) {
		return new Promise(resolve => {
			this.http.get(this.rootUrl + 'template/' + templateId).subscribe(
				data => {resolve(data)},
				err => {
					console.warn(['get',err]);
				}
			)
		});
	}

}
