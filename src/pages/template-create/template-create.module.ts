import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemplateCreatePage } from './template-create';

@NgModule({
  declarations: [
    TemplateCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(TemplateCreatePage),
  ],
})
export class TemplateCreatePageModule {}
