import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//declare var Jodit: any;
//import * as Jodit from  'jodit/src';
import { Jodit } from 'jodit';

@IonicPage()
@Component({
	selector: 'page-page-create',
	templateUrl: 'page-create.html',
})
export class PageCreatePage {
	editor: any;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad PageCreatePage');
		this.editor = Jodit('#editor');
		//this.editor.setEditorValue('<p>Start</p>');
	}

}
