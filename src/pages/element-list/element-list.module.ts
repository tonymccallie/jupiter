import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ElementListPage } from './element-list';

@NgModule({
  declarations: [
    ElementListPage,
  ],
  imports: [
    IonicPageModule.forChild(ElementListPage),
  ],
})
export class ElementListPageModule {}
