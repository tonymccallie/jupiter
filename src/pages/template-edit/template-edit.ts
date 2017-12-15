import { TemplateProvider } from './../../providers/template/template';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
	segment: 'template-edit/:id',
	defaultHistory: ['TemplatesPage']
})
@Component({
	selector: 'page-template-edit',
	templateUrl: 'template-edit.html',
})
export class TemplateEditPage {
	template: any;
	grid: any;
	clipboard: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public templateProvider: TemplateProvider) {
		this.templateProvider.get(this.navParams.get('id')).then(template => {
			this.template = template;
		});

		this.grid = [[{ title: 'Menu', slug: 'menu', span: 12, enabled: false }], [{ title: 'Content', slug: 'content', span: 8, enabled: true }, { title: 'Sidebar', slug: 'sidebar', span: 4, enabled: false }]];
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
		this.grid[this.grid.length - 1].push({
			title: 'New Block',
			slug: 'newblock',
			span: 12,
			enabled: true
		});
	}

	addRow() {
		this.grid.push([]);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad TemplateEditPage');
	}

}
