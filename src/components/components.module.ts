import { NgModule } from '@angular/core';
import { TreeViewComponent } from './tree-view/tree-view';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [TreeViewComponent],
	imports: [CommonModule, IonicModule.forRoot(TreeViewComponent, { mode: 'ios' })],
	exports: [TreeViewComponent]
})
export class ComponentsModule { }
