import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GreybackProvider } from '../../providers/greyback/greyback';

@IonicPage()
@Component({
	selector: 'page-page-tree',
	templateUrl: 'page-tree.html',
})
export class PageTreePage {

	rootUrl: string;
	pagetree: any[];
	clipboard: any;
	pageAdd: boolean;
	pageSort: boolean;

	constructor(public navCtrl: NavController, public navParams: NavParams, public greybackProvider: GreybackProvider) {
		console.log('constructor PageTreePage');
		this.rootUrl = greybackProvider.rootUrl;
		this.greybackProvider.getPageTree().subscribe(pagetree => {
			//this.pagetree = pagetree;
			this.greybackProvider.pagetree(pagetree);
		});

		this.clipboard = this.greybackProvider.clipboard;
	}

	refresh() {
		this.pagetree = [];
		this.greybackProvider.getPageTree().subscribe(pagetree => {
			this.pagetree = pagetree;
		});
	}

	sort() {
		this.greybackProvider.sort();
	}

	clear() {
		this.greybackProvider.clear();
	}

	add() {
		this.greybackProvider.add();
	}

	clip() {
		console.log('me');
	}

	ngOnInit() {
		console.log('ngOnInit PageTreePage');
		this.greybackProvider.clipboardObs.subscribe(data => {
			this.clipboard = data;
		});
		this.greybackProvider.pageTreeObs.subscribe(tree => {
			this.pagetree = tree;
		});
		this.greybackProvider.pageAddObs.subscribe(data => {
			this.pageAdd = data;
		});
		this.greybackProvider.pageSortObs.subscribe(data => {
			this.pageSort = data;
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad PageTreePage');
	}

}
