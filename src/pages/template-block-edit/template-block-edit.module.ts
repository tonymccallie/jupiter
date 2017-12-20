import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemplateBlockEditPage } from './template-block-edit';

@NgModule({
  declarations: [
    TemplateBlockEditPage,
  ],
  imports: [
    IonicPageModule.forChild(TemplateBlockEditPage),
  ],
})
export class TemplateBlockEditPageModule {}
