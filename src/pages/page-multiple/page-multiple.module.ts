import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PageMultiplePage } from './page-multiple';

@NgModule({
  declarations: [
    PageMultiplePage,
  ],
  imports: [
    IonicPageModule.forChild(PageMultiplePage),
  ],
})
export class PageMultiplePageModule {}
