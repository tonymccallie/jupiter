import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';

@NgModule({
	declarations: [
		
	],
	imports: [
		MomentModule, IonicModule
	],
	exports: [
		MomentModule
	]
})
export class SharedModule { }
