import { TemplateProvider } from './../../providers/template/template';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-templates',
	templateUrl: 'templates.html',
})
export class TemplatesPage {
	templates: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public templateProvider: TemplateProvider) {
		this.templateProvider.list().then(templates => {
			this.templates = templates;
		})
	}

	edit(template) {
		this.navCtrl.push('TemplateEditPage', { id: template.id });
	}

	add() {
		this.navCtrl.push('TemplateCreatePage');
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad TemplatesPage');
	}

}
