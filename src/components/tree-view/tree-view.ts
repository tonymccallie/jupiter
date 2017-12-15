import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PageProvider } from './../../providers/page/page';

@Component({
	selector: 'tree-view',
	templateUrl: 'tree-view.html'
})
export class TreeViewComponent {

	@Input('pages') pages: any[];
	clipboard: any;
	pageAdd: boolean;
	pageMultiple: boolean;
	pageSort: boolean;

	constructor(public navCtrl: NavController, public navParams: NavParams, public pageProvider: PageProvider) {

	}

	ngOnInit() {
		console.log('ngOnInit TreeViewComponent');
		this.pageProvider.clipboardObs.subscribe(data => {
			this.clipboard = data;
		});

		this.pageProvider.pageAddObs.subscribe(data => {
			this.pageAdd = data;
		});

		this.pageProvider.pageAddMultipleObs.subscribe(data => {
			this.pageMultiple = data;
		});

		this.pageProvider.pageSortObs.subscribe(data => {
			this.pageSort = data;
		});
	}

	clip(page) {
		//this.pages[this.pages.indexOf(page)].clipped = 'med';
		//console.log(this.pages);
		this.pageProvider.clipboard(page);
	}

	add(page) {
		//, { animate: false }
		this.navCtrl.push('PageCreatePage', { page: page });
	}

	multiple(page) {
		this.navCtrl.push('PageMultiplePage', { page: page });
	}

	under(page) {
		this.pageProvider.under(page).then(result => {
			console.log(result);
			this.pageProvider.pagetree(result);
		});
	}

	after(page) {
		this.pageProvider.after(page).then(result => {
			console.log(result);
			this.pageProvider.pagetree(result);
		});
	}

	edit(page) {
		this.navCtrl.push('PageEditPage', { 'id': page.id });
	}
}
