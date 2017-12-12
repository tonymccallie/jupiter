import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//import { Http, Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
//import * as moment from 'moment';

@Injectable()
export class GreybackProvider {
	rootUrl: string = 'http://localhost/router/public/api/';
	headers: any = new Headers;
	opts: any;
	pagetreeObj: any;

	private clipboardStorage = new BehaviorSubject<any>(null);
	clipboardObs = this.clipboardStorage.asObservable();

	private pageTreeStorage = new BehaviorSubject<any[]>([]);
	pageTreeObs = this.pageTreeStorage.asObservable();

	private pageAddStorage = new BehaviorSubject<boolean>(false);
	pageAddObs = this.pageAddStorage.asObservable();

	private pageSortStorage = new BehaviorSubject<boolean>(false);
	pageSortObs = this.pageSortStorage.asObservable();

	constructor(public http: Http) {
		console.log('Hello GreybackProvider Provider');
		// this.headers.append('Accept', 'application/json');
		// this.headers.append('Content-Type', 'application/json');
		// this.headers.append('Authorization', "Basic " + btoa('patrickkemp:Three3leaf'));
		// this.opts = new RequestOptions({ headers: this.headers });
		//this.clipboard = 
		this.pageTreeObs.subscribe(tree => {
			this.pagetreeObj = tree;
		})
	}

	clipboard(data: any) {
		this.clipboardStorage.next(data);
	}

	pagetree(tree: any[]) {
		this.pageTreeStorage.next(tree);
	}

	clear() {
		this.clipboardStorage.next('');
		this.pageAddStorage.next(false);
		this.pageSortStorage.next(false);
	}

	add() {
		this.pageAddStorage.next(true);
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
		return this.http.post(this.rootUrl + 'pagetree', data).map(result => result.json());
	}

	under(parentPage) {
		var movingPage;
		movingPage = this.clipboardStorage.getValue();
		var data = {
			page: movingPage.id, parent: parentPage.id
		}
		this.clear();
		return this.http.post(this.rootUrl + 'pagetree', data).map(result => result.json());
	}

	getPageTree() {
		return this.http.get(this.rootUrl + 'pagetree').map(result => result.json());
	}

	getTemplates() {
		return this.http.get(this.rootUrl + 'templates').map(result => result.json());
	}

	// secured call
	// getCalendars() {
	// 	return this.http.get('https://secure.accessacs.com/api_accessacs_mobile/v2/10413/calendars', this.opts).map(result => result.json());
	// }

}
