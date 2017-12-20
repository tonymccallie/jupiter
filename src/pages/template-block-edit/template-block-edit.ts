import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the TemplateBlockEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-template-block-edit',
	templateUrl: 'template-block-edit.html',
})
export class TemplateBlockEditPage {
	block: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public viewController: ViewController) {
		this.block = this.navParams.get('block');
	}

	close() {
		this.viewController.dismiss();
	}

	save() {
		this.viewController.dismiss();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad TemplateBlockEditPage');
	}

}
