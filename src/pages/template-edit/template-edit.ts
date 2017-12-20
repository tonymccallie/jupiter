import { VariableProvider } from './../../providers/variable/variable';
import { TemplateProvider } from './../../providers/template/template';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage({
	segment: 'template-edit/:id',
	defaultHistory: ['TemplatesPage']
})
@Component({
	selector: 'page-template-edit',
	templateUrl: 'template-edit.html',
})
export class TemplateEditPage {
	@ViewChild('templateSlider') templateSlider: any;

	template: any;
	grid: any;
	gridJson: string;
	clipboard: any;
	mode: string = "content";
	layoutClipboard: any;
	contentClipboard: any;
	plugins: any;
	blockDelete: boolean = false;
	blockMove: boolean = false;

	/*
	Modes:
		content: add/remove/move elements
		layout: add/remove/resize/move blocks
		info: edit template info
	*/

	formTemplateEdit: FormGroup;
	submitAttempt: boolean = false;

	constructor(
		public navCtrl: NavController,
		public modalController: ModalController,
		public navParams: NavParams,
		public templateProvider: TemplateProvider,
		public formBuilder: FormBuilder,
		public variableProvider: VariableProvider,
		public alertController: AlertController
	) {
		this.templateProvider.get(this.navParams.get('id')).then(template => {
			this.plugins = variableProvider.plugins;
			this.template = template;
			this.grid = JSON.parse(this.template.json);
			this.template.elements.forEach(element => {
				this.grid.forEach(row => {
					row.forEach(col => {
						if (element.location == col.slug) {
							if (!col.children) {
								col.children = [];
							}
							col.children.push(element);
						}
					});
				});
			});

			this.formTemplateEdit = formBuilder.group({
				title: [this.template.title, Validators.compose([Validators.required, Validators.minLength(1)])],
				file: [this.template.file, Validators.compose([Validators.required, Validators.minLength(1)])],
				id: this.template.id
			});
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad TemplateEditPage');
	}

	slideTo(index) {
		this.templateSlider.slideTo(index);
	}

	grow(col) {
		if (col.span < 12) {
			col.span++;
		}
	}

	shrink(col) {
		if (col.span > 3) {
			col.span--;
		}
	}

	addBlock() {
		let block = {
			title: 'New Block',
			slug: 'newblock',
			descr: '',
			span: 12,
			enabled: true,
			children: []
		};
		this.grid[this.grid.length - 1].push(block);
		this.editBlock(block);
	}

	deleteBlock(rowIndex, colIndex) {
		let alert = this.alertController.create({
			title: 'Confirm Delete',
			message: 'Are you sre you want to delete this block?',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel'
				},
				{
					text: 'Delete',
					handler: () => {
						this.grid[rowIndex].splice(colIndex, 1);
					}
				}
			]
		});
		alert.present();
	}

	addRow() {
		this.grid.push([]);
	}

	deleteRow(rowIndex) {
		this.grid.splice(rowIndex, 1);
	}

	editBlock(block) {
		let blockModal = this.modalController.create('TemplateBlockEditPage', { block: block });

		// blockModal.onDidDismiss(data => {
		// 	if(data) {
		// 		//block = data.block;
		// 		console.log('YES');
		// 	} else {
		// 		console.log('NOPE');
		// 	}
		// });

		blockModal.present();
	}

	grabBlock(rowIndex, colIndex) {
		this.layoutClipboard = this.grid[rowIndex].splice(colIndex, 1);
	}

	placeBlock(rowIndex) {
		this.grid[rowIndex].push(this.layoutClipboard[0]);
		this.layoutClipboard = null;
	}

	saveTemplate() {
		if (!this.formTemplateEdit.valid) {
			this.submitAttempt = true;
		} else {
			let data = this.formTemplateEdit.value;
			let jsonObj = this.grid;
			jsonObj.forEach(row => {
				row.forEach(col => {
					col.children = null;
				});
			})
			data.json = JSON.stringify(jsonObj);
				this.templateProvider.save(data).then(result => {
					this.navCtrl.setRoot('TemplateEditPage', { id: data.id });
				});
		}
	}

}
