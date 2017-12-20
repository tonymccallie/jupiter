import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-template-info',
	templateUrl: 'template-info.html',
})
export class TemplateInfoPage {
	template: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public viewController: ViewController) {
		this.template = this.navParams.get('template');
	}

	close() {
		this.viewController.dismiss();
	}

	save() {
		this.viewController.dismiss({ template: this.template });
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad TemplateInfoPage');
	}

}
