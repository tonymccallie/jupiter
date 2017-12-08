import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';

import { MyApp } from './app.component';
import { SharedModule } from './shared.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GreybackProvider } from './../providers/greyback/greyback';

@NgModule({
	declarations: [
		MyApp
	],
	imports: [
		BrowserModule,
		HttpModule,
		IonicModule.forRoot(MyApp, { mode: 'ios' }),
		MomentModule,
		SharedModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		GreybackProvider,
		SharedModule
	]
})
export class AppModule { }
