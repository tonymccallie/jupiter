import { PageProvider } from './../../providers/page/page';
import { TemplateProvider } from './../../providers/template/template';
import { VariableProvider } from './../../providers/variable/variable';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-element-list',
	templateUrl: 'element-list.html',
})
export class ElementListPage {
	@ViewChild('elementSlider') elementSlider: any;
	pluginMenu: any[];
	plugins: any;
	element: any;
	elements: any[] = [];
	showBack: boolean = false;
	provider: any;

	config: any;
	configBuilder: Object = {
		options: [],
		show: false,
		advanced: [
			{
				title: 'Custom Template',

			}
		],
		view: '',
		start: null,
		stop: null
	};

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public variableProvider: VariableProvider,
		public viewController: ViewController,
		public templateProvider: TemplateProvider,
		public pageProvider: PageProvider
	) {
		this.pluginMenu = this.variableProvider.pluginMenu;
		this.plugins = this.variableProvider.plugins;
		this.element = this.navParams.get('element');
		if (this.element.page_id) {
			this.provider = this.pageProvider;
		} else {
			this.provider = this.templateProvider;
		}
	}

	slideTo(index) {
		this.elementSlider.slideTo(index);
	}

	close() {
		this.viewController.dismiss();
	}

	next(plugin) {
		this.elements = plugin.children;
		this.slideTo(1);
		this.showBack = true;
	}

	back() {
		this.slideTo(0);
		this.showBack = false;
	}

	create(plugin) {
		//location, order, controller, action, config

		this.element.controller = plugin.controller;
		this.element.action = plugin.action;
		this.provider.createElement(this.element).then(element => {
			this.viewController.dismiss({page: plugin.page, element: element });
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ElementListPage');
	}

}