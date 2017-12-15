import { PageProvider } from './../../providers/page/page';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
	segment: 'page-edit/:id',
	defaultHistory: ['PageTreePage']
})
@Component({
	selector: 'page-page-edit',
	templateUrl: 'page-edit.html',
})
export class PageEditPage {
	page: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public pageProvider: PageProvider) {
		this.pageProvider.get(this.navParams.get('id')).then(page => {
			this.page = page;
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad PageEditPage');
	}

}
