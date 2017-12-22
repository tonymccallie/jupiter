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
	contentClipboard: any[];
	contentPast: Object = {
		row: null,
		col: null,
		child: null
	};
	plugins: any;
	blockDelete: boolean = false;
	blockMove: boolean = false;
	layoutChanged: boolean = false;
	archive: any[] = [];

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
		this._buildTemplate().then(data => {
			this.formTemplateEdit = this.formBuilder.group({
				title: [this.template.title, Validators.compose([Validators.required, Validators.minLength(1)])],
				file: [this.template.file, Validators.compose([Validators.required, Validators.minLength(1)])],
				id: this.template.id
			});
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad TemplateEditPage');
	}

	_buildTemplate() {
		return new Promise(resolve => {
			this.templateProvider.get(this.navParams.get('id')).then(template => {
				this.plugins = this.variableProvider.plugins;
				this.template = template;
				this.grid = JSON.parse(this.template.json);
				this.archive = [];
				this.template.elements.forEach(element => {
					let bolFound = false;
					this.grid.forEach(row => {
						row.forEach(col => {
							if (element.location == col.slug) {
								if (!col.children) {
									col.children = [];
								}
								col.children.push(element);
								bolFound = true;
							}
						});
					});
					if (!bolFound) {
						this.archive.push(element);
					}
				});
				resolve(true);
			})
		});
	}

	slideTo(index) {
		this.templateSlider.slideTo(index);
	}

	grow(col) {
		this.layoutChanged = true;
		if (col.span < 12) {
			col.span++;
		}
	}

	shrink(col) {
		this.layoutChanged = true;
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
		this.layoutChanged = true;
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
		this.layoutChanged = true;
	}

	addRow() {
		this.grid.push([]);
		this.layoutChanged = true;
	}

	deleteRow(rowIndex) {
		this.grid.splice(rowIndex, 1);
		this.layoutChanged = true;
	}

	editBlock(block) {
		let blockModal = this.modalController.create('TemplateBlockEditPage', { block: block });

		blockModal.present();
		this.layoutChanged = true;
	}

	grabBlock(rowIndex, colIndex) {
		this.layoutClipboard = this.grid[rowIndex].splice(colIndex, 1);
	}

	placeBlock(rowIndex) {
		this.grid[rowIndex].push(this.layoutClipboard[0]);
		this.layoutClipboard = null;
		this.layoutChanged = true;
	}

	addElement(rowIndex, colIndex, col) {
		let element = {
			template_id: this.template.id,
			location: col.slug
		};
		let blockModal = this.modalController.create('ElementListPage', { element: element });
		blockModal.onDidDismiss(result => {
			if (result) {
				this._buildTemplate().then(data => {
					this.navCtrl.push(result.page, { element: result.element, id: result.element.id });
				});
			} else {
				console.log('NOPE');
			}
		});
		blockModal.present();
		this.layoutChanged = true;
	}

	editElement(element) {
		this.navCtrl.push(this.plugins[element.controller + ":" + element.action].page, { element: element, id: element.id });
	}

	grabElement(rowIndex, colIndex, childIndex) {
		this.contentClipboard = this.grid[rowIndex][colIndex].children.splice(childIndex, 1);
		this.contentPast = {
			row: rowIndex,
			col: colIndex,
			child: childIndex
		};
	}

	cancelElement() {
		let element = this.contentClipboard.pop();
		if (this.contentPast['row']) {
			this.grid[this.contentPast['row']][this.contentPast['col']].children.push(element);
		} else {
			this.archive.push(element);
		}
	}

	grabArchiveElement(archiveIndex) {
		this.contentClipboard = this.archive.splice(archiveIndex, 1);
		this.contentPast = {
			row: null,
			col: null,
			child: null
		};
	}

	placeElement(col, elementIndex) {
		this.templateProvider.place(col, elementIndex, this.contentClipboard[0]).then(data => {
			this._buildTemplate().then(data => {
				this.slideTo(0);
				this.contentClipboard = [];
			});
		});
	}

	saveTemplate() {
		if (!this.formTemplateEdit.valid) {
			this.submitAttempt = true;
			this.slideTo(2);
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
				this._buildTemplate().then(data => {
					this.slideTo(0);
					this.layoutChanged = false;
				});
			});
		}
	}

}
