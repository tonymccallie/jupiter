import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { TreeViewComponent } from './tree-view/tree-view';
import { JoditComponent } from './jodit/jodit';

@NgModule({
	declarations: [
		TreeViewComponent,
		JoditComponent
	],
	imports: [
		CommonModule,
		IonicModule.forRoot(TreeViewComponent, { mode: 'ios' })
	],
	exports: [
		TreeViewComponent,
		JoditComponent
	]
})
export class ComponentsModule { }
