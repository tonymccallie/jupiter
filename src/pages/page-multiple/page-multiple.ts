import { PageProvider } from './../../providers/page/page';
import { TemplateProvider } from './../../providers/template/template';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
	selector: 'page-page-multiple',
	templateUrl: 'page-multiple.html',
})
export class PageMultiplePage {
	parent: any;
	templates: any;

	formPageCreate: FormGroup;
	submitAttempt: boolean = false;

	constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public templateProvider: TemplateProvider, public pageProvider: PageProvider) {
		this.parent = navParams.get('page');
		this.templateProvider.list().then(templates => {
			//this.pagetree = pagetree;
			this.templates = templates;
		});
		this.formPageCreate = formBuilder.group({
			title: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
			parent_id: [null],
			template_id: [null, Validators.required],
			hidden: [0]
		});
	}

	save() {
		if(!this.formPageCreate.valid) {
			this.submitAttempt = true;
			console.log(['invalid',this.formPageCreate.value]);
		} else {
			console.log(['valid',this.formPageCreate.value]);
			this.pageProvider.createMultiple(this.formPageCreate.value).then(result => {
				this.pageProvider.clear();
				this.navCtrl.setRoot('PagesPage');
			});
		}
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad PageMultiplePage');
	}

}
