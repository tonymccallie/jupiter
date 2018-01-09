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
				data => { resolve(data) },
				err => {
					console.warn(['get', err]);
				}
			)
		});
	}

	place(col, elementIndex, element) {
		return new Promise(resolve => {
			this.http.put(this.rootUrl + 'place_template_element/' + element.id, {column: col, element: element, index: elementIndex}).subscribe(
				data => { resolve(data) },
				err => {
					console.warn(['place', err]);
				}
			)
		});
	}

	save(template) {
		return new Promise(resolve => {
			this.http.put(this.rootUrl + 'template/' + template.id, template).subscribe(
				data => { resolve(data) },
				err => {
					console.warn(['save', err]);
				}
			)
		});
	}

	createElement(element) {
		return new Promise(resolve => {
			this.http.post(this.rootUrl + 'template_element', element).subscribe(
				data => {
					resolve(data);
				},
				err => {
					console.warn(['createElement', err]);
				}
			)
		});
	}

}
