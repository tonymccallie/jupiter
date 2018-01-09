import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ElementTextPage } from './element-text';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
	declarations: [
		ElementTextPage,
	],
	imports: [
		IonicPageModule.forChild(ElementTextPage),
		ComponentsModule
	],
})
export class ElementTextPageModule { }
