import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PageTreePage } from './page-tree';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
	declarations: [
		PageTreePage,
	],
	imports: [
		IonicPageModule.forChild(PageTreePage),
		ComponentsModule
	],
})
export class PageTreePageModule { }
