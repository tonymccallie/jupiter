import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesPage } from './pages';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    PagesPage,
  ],
  imports: [
	IonicPageModule.forChild(PagesPage),
	ComponentsModule
  ],
})
export class PagesPageModule {}