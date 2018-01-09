import { ElementProvider } from './../../providers/element/element';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';

@IonicPage({
	segment: 'element-text/:type/:id'
})
@Component({
	selector: 'page-element-text',
	templateUrl: 'element-text.html',
})
export class ElementTextPage {
	type: string;
	element: any;
	advanced: boolean = false;
	mode: string = "content";
	start_date: string;
	start_time: string;
	stop_date: string;
	stop_time: string;
	curYear: number;

	constructor(public navCtrl: NavController, public navParams: NavParams, public elementProvider: ElementProvider) {
		//console.log(this.navParams);
		console.log('ElementTextPage constructor')
		this.type = this.navParams.get('type');
		this.elementProvider.get(this.navParams.get('id'), this.type).then(element => {
			console.log("set element");
			this.element = element;
			if (this.element.start) {
				var start = moment(this.element.start).toDate();
				this.start_date = start.toISOString();
				this.start_time = start.toISOString();;
			}
			if (this.element.stop) {
				var stop = moment(this.element.stop).toDate();
				this.stop_date = stop.toISOString();
				this.stop_time = stop.toISOString();;
			}
		});
		this.curYear = moment().year();
	}

	change(event) {
		this.element.content[0].body = event;
	}

	save() {
		if (this.start_date) {
			if(this.start_time) {
				this.element.start = moment(this.start_date).format('YYYY-MM-DD') + ' ' + moment(this.start_time).format('HH:mm:ss');
			} else {
				this.element.start = this.start_date;
			}
		}
		if (this.stop_date) {
			if(this.stop_time) {
				this.element.stop = moment(this.stop_date).format('YYYY-MM-DD') + ' ' + moment(this.stop_time).format('HH:mm:ss');
			} else {
				this.element.stop = this.stop_date;
			}
		}

		this.elementProvider.save(this.element, this.type).then(result => {
			switch (this.type) {
				case 'template':
					this.navCtrl.setRoot("TemplateEditPage", { id: this.element.template_id });
					break;
				default:
					this.navCtrl.setRoot("PageEditPage", { id: this.element.page_id });
					break;
			}
		});
	}

	info() {
		this.advanced = (this.advanced) ? false : true;
	}

	clear() {
		this.start_date = null;
		this.start_time = null;
		this.stop_date = null;
		this.stop_time = null;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ElementTextPage');
	}

}
