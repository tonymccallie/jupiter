import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemplateEditPage } from './template-edit';

@NgModule({
  declarations: [
    TemplateEditPage,
  ],
  imports: [
    IonicPageModule.forChild(TemplateEditPage),
  ],
})
export class TemplateEditPageModule {}
