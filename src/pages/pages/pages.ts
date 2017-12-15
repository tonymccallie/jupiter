import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PageProvider } from './../../providers/page/page';

@IonicPage()
@Component({
	selector: 'page-pages',
	templateUrl: 'pages.html',
})
export class PagesPage {

	rootUrl: string;
	pagetree: any;
	clipboard: any;
	pageAdd: boolean;
	pageSort: boolean;

	constructor(public navCtrl: NavController, public navParams: NavParams, public pageProvider: PageProvider) {
		console.log('constructor PageTreePage');
		this.rootUrl = pageProvider.rootUrl;
		// this.pageProvider.getPageTree().then(pagetree => {
		// 	//this.pagetree = pagetree;
		// 	this.pageProvider.pagetree(pagetree);
		// });

		this.clipboard = this.pageProvider.clipboard;
	}

	refresh() {
		this.pagetree = [];
		this.pageProvider.getPageTree().then(pagetree => {
			this.pagetree = pagetree;
		});
	}

	sort() {
		this.pageProvider.sort();
	}

	clear() {
		this.pageProvider.clear();
	}

	add() {
		this.pageProvider.add();
	}

	multiple() {
		this.pageProvider.multiple();
	}

	addRoot() {
		this.navCtrl.push('PageCreatePage', { page: {title:'Top Level',id:null} });
	}

	clip() {
		console.log('me');
	}

	ngOnInit() {
		console.log('ngOnInit PageTreePage');
		this.pageProvider.clipboardObs.subscribe(data => {
			this.clipboard = data;
		});
		this.pageProvider.pageTreeObs.subscribe(tree => {
			this.pagetree = tree;
		});
		this.pageProvider.pageAddObs.subscribe(data => {
			this.pageAdd = data;
		});
		this.pageProvider.pageSortObs.subscribe(data => {
			this.pageSort = data;
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad PageTreePage');
		this.refresh();
	}

}