import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
	segment: 'element-text/:id'
})
@Component({
	selector: 'page-element-text',
	templateUrl: 'element-text.html',
})
export class ElementTextPage {
	element: any;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.element = this.navParams.get('element');
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ElementTextPage');
	}

}
