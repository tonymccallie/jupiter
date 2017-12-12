import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any = 'DashboardPage';

	pages: any[];

	constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
		this.initializeApp();

		// used for an example of ngFor and navigation
		this.pages = [
			{
				title: 'Dashboard', children: [
					{ title: 'Dashboard', component: 'DashboardPage', icon: 'ios-speedometer-outline' }
				]
			},
			{
				title: 'Pages', children: [
					{ title: 'Pages', component: 'PagesPage', icon: 'ios-paper-outline' },
					{ title: 'Templates', component: 'TemplatesPage', icon: 'ios-options-outline' }
				]
			},
			{
				title: 'Media', children: [
					{ title: 'Pictures', component: 'ImagesPage', icon: 'ios-camera-outline' },
					{ title: 'Video', component: 'VideosPage', icon: 'ios-film-outline' },
					{ title: 'Audio', component: 'AudioPage', icon: 'ios-volume-up-outline' },
					{ title: 'Documents', component: 'DocsPage', icon: 'ios-filing-outline' },
				]
			},
			{
				title: 'Plugins', children: [
					{ title: 'Posts', component: 'PostsPage', icon: 'ios-create-outline' },
					{ title: 'Forms', component: 'FormsPage', icon: 'ios-list-box-outline' },
					{ title: 'Podcast', component: 'PodcastsPage', icon: 'ios-mic-outline' },
					{ title: 'Organization', component: 'OrganizationPage', icon: 'ios-people-outline' }
				]
			},
			{
				title: 'Development', children: [
					{ title: 'Test', component: 'TestPage', icon: 'ios-create-outline' }
				]
			}
		];

	}

	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	openPage(page) {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		this.nav.setRoot(page.component);
	}
}
