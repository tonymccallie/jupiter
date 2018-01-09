import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//3rd party
import { MomentModule } from 'angular2-moment';
//local
import { MyApp } from './app.component';
import { SharedModule } from './shared.module';
import { GreybackProvider } from './../providers/greyback/greyback';
import { PageProvider } from '../providers/page/page';
import { HttpClientModule } from '@angular/common/http';
import { VariableProvider } from '../providers/variable/variable';
import { TemplateProvider } from '../providers/template/template';
import { ElementProvider } from '../providers/element/element';

@NgModule({
	declarations: [
		MyApp
	],
	imports: [
		BrowserModule,
		HttpModule,
		IonicModule.forRoot(MyApp, { mode: 'ios' }),
		MomentModule,
		SharedModule,
		HttpClientModule
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
		SharedModule,
		PageProvider,
		VariableProvider,
		TemplateProvider,
    ElementProvider
	]
})
export class AppModule { }
