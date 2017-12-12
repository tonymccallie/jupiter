import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GreybackProvider } from '../../providers/greyback/greyback';

@Component({
	selector: 'tree-view',
	templateUrl: 'tree-view.html'
})
export class TreeViewComponent {

	@Input('pages') pages: any[];
	clipboard: any;
	pageAdd: boolean;
	pageSort: boolean;

	constructor(public navCtrl: NavController, public navParams: NavParams, public greybackProvider: GreybackProvider) {

	}

	ngOnInit() {
		console.log('ngOnInit TreeViewComponent');
		this.greybackProvider.clipboardObs.subscribe(data => {
			this.clipboard = data;
		});

		this.greybackProvider.pageAddObs.subscribe(data => {
			this.pageAdd = data;
		});

		this.greybackProvider.pageSortObs.subscribe(data => {
			this.pageSort = data;
		});
	}

	clip(page) {
		//this.pages[this.pages.indexOf(page)].clipped = 'med';
		//console.log(this.pages);
		this.greybackProvider.clipboard(page);
	}

	add(page) {
		//, { animate: false }
		this.navCtrl.push('PageCreatePage', { page: page });
	}

	under(page) {
		this.greybackProvider.under(page).subscribe(result => {
			console.log(result);
			this.greybackProvider.pagetree(result);
		});
	}

	after(page) {
		this.greybackProvider.after(page).subscribe(result => {
			console.log(result);
			this.greybackProvider.pagetree(result);
		});
	}
}
