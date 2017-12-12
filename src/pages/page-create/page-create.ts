import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GreybackProvider } from '../../providers/greyback/greyback';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//declare var Jodit: any;
//import * as Jodit from  'jodit/src';
//import { Jodit } from 'jodit';

@IonicPage()
@Component({
	selector: 'page-page-create',
	templateUrl: 'page-create.html',
})
export class PageCreatePage {
	editor: any;
	parent: any;
	templates: any[];

	formPageCreate: FormGroup;
	submitAttempt: boolean = false;

	constructor(public navCtrl: NavController, public navParams: NavParams, public greybackProvider: GreybackProvider, public formBuilder: FormBuilder) {
		this.parent = navParams.get('page');
		this.greybackProvider.getTemplates().subscribe(templates => {
			//this.pagetree = pagetree;
			this.templates = templates;
		});
		this.formPageCreate = formBuilder.group({
			title: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
			parent_id: [null],
			template_id: [null],
			hidden: [0]
		});
	}

	save() {
		this.submitAttempt = true;
		if(!this.formPageCreate.valid) {
			console.log(['invalid',this.formPageCreate.value]);
		} else {
			console.log(['valid',this.formPageCreate.value]);
		}
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad PageCreatePageXX');
		//this.editor = Jodit('#editor');
		//this.editor.setEditorValue('<p>Start</p>');
	}

}
