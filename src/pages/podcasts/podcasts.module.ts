import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PodcastsPage } from './podcasts';

@NgModule({
  declarations: [
    PodcastsPage,
  ],
  imports: [
    IonicPageModule.forChild(PodcastsPage),
  ],
})
export class PodcastsPageModule {}
