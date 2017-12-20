import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemplateInfoPage } from './template-info';

@NgModule({
  declarations: [
    TemplateInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(TemplateInfoPage),
  ],
})
export class TemplateInfoPageModule {}
