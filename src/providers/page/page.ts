import { VariableProvider } from './../variable/variable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class PageProvider {
	rootUrl: string;

	pagetreeObj: any;

	private clipboardStorage = new BehaviorSubject<any>(null);
	clipboardObs = this.clipboardStorage.asObservable();

	private pageTreeStorage = new BehaviorSubject<any[]>([]);
	pageTreeObs = this.pageTreeStorage.asObservable();

	private pageAddStorage = new BehaviorSubject<boolean>(false);
	pageAddObs = this.pageAddStorage.asObservable();

	private pageAddMultipleStorage = new BehaviorSubject<boolean>(false);
	pageAddMultipleObs = this.pageAddMultipleStorage.asObservable();

	private pageSortStorage = new BehaviorSubject<boolean>(false);
	pageSortObs = this.pageSortStorage.asObservable();

	constructor(public http: HttpClient, public variable: VariableProvider) {
		console.log('Hello PageProvider Provider');
		this.rootUrl = variable.rootUrl;
		this.pageTreeObs.subscribe(tree => {
			this.pagetreeObj = tree;
		})
	}

	clipboard(data: any) {
		this.clipboardStorage.next(data);
	}

	pagetree(tree: any) {
		this.pageTreeStorage.next(tree);
	}

	clear() {
		this.clipboardStorage.next('');
		this.pageAddStorage.next(false);
		this.pageSortStorage.next(false);
		this.pageAddMultipleStorage.next(false);
	}

	add() {
		this.pageAddStorage.next(true);
	}

	multiple() {
		this.pageAddMultipleStorage.next(true);
	}

	sort() {
		this.pageSortStorage.next(true);
	}

	after(parentPage) {
		var movingPage;
		movingPage = this.clipboardStorage.getValue();
		var data = {
			page: movingPage.id, parent: parentPage.parent_id, neighbor: parentPage.id
		}
		this.clear();
		//return this.http.post(this.rootUrl + 'pagetree', data).map(result => result.json());
		return new Promise(resolve => {
			this.http.post(this.rootUrl + 'pagetree', data).subscribe(
				data => {resolve(data)},
				err => {
					console.warn(['after',err]);
				}
			);
		});
	}

	under(parentPage) {
		var movingPage;
		movingPage = this.clipboardStorage.getValue();
		var data = {
			page: movingPage.id, parent: parentPage.id
		}
		this.clear();
		//return this.http.post(this.rootUrl + 'pagetree', data).map(result => result.json());
		return new Promise(resolve => {
			this.http.post(this.rootUrl + 'pagetree', data).subscribe(
				data => {resolve(data)}, 
				err => {
					console.warn(['under',err]);
				}
			);
		});
	}

	get(pageId) {
		return new Promise(resolve => {
			this.http.get(this.rootUrl + 'page/' + pageId).subscribe(
				data => {resolve(data)},
				err => {
					console.warn(['get',err]);
				}
			)
		});
	}

	getPageTree() {
		//return this.http.get(this.rootUrl + 'pagetree').map(result => result.json());
		return new Promise(resolve => {
			this.http.get(this.rootUrl + 'pagetree').subscribe(
				data => {resolve(data)}, 
				err => {
					console.warn(['getPageTree',err]);
				}
			);
		});
	}

	create(page) {
		return new Promise(resolve => {
			this.http.post(this.rootUrl + 'page', page).subscribe(
				data => {resolve(data)},
				err => {
					console.warn(['create',err]);
				});
		});
	}

	createMultiple(page) {
		return new Promise(resolve => {
			this.http.post(this.rootUrl + 'pages', page).subscribe(
				data => {resolve(data)},
				err => {
					console.warn(['create',err]);
				});
		});
	}
}
