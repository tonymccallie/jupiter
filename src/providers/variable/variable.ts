import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class VariableProvider {
	rootUrl: string = 'http://localhost/router/public/api/';

	pluginMenu: any[] = [
		{
			title: 'Advanced',
			icon: 'ios-chatboxes-outline',
			children: [
				{
					title: "Site Menu",
					controller: "PageController",
					action: "menu",
					page: "ElementMenuPage"
				},
				{
					title: "Branch Menu",
					controller: "PageController",
					action: "branch",
					page: "ElementMenuPage"
				},
				{
					title: "Sitemap",
					controller: "PageController",
					action: "sitemap",
					page: "ElementMenuPage"
				}
			]
		},
		{
			title: 'Posts',
			icon: 'ios-chatboxes-outline',
			children: [
				{
					title: "Latest Posts",
					controller: "PostController",
					action: "latest",
					page: ""
				}
			]
		},
		{
			title: 'Forms',
			icon: 'ios-chatboxes-outline',
			children: [
				{
					title: "Form",
					controller: "FormController",
					action: "view",
					page: ""
				}
			]
		},
		{
			title: 'Gallery',
			icon: 'ios-chatboxes-outline',
			children: [
				{
					title: "Random Image",
					controller: "GalleryController",
					action: "random",
					page: ""
				},
				{
					title: "Gallery Listing",
					controller: "GalleryController",
					action: "listing",
					page: ""
				},
				{
					title: "Slider/Carousel",
					controller: "GalleryController",
					action: "slider",
					page: ""
				},
				{
					title: "Thumbnails",
					controller: "GalleryController",
					action: "listing",
					page: ""
				}
			]
		},
		{
			title: 'Documents',
			icon: 'ios-chatboxes-outline',
			children: [
				{
					title: "Folder View",
					controller: "DocumentController",
					action: "folder",
					page: ""
				}
			]
		},
	]

	plugins: Object = {};

	constructor(public http: HttpClient) {
		this.pluginMenu.forEach(category => {
			category.children.forEach(plugin => {
				this.plugins[plugin.controller + ':' + plugin.action] = {
					title: plugin.title,
					icon: category.icon,
					page: plugin.page
				}
			})
		});
		//hard coded
		this.plugins[':'] = {
			title:'Unknown',
			icon: 'ios-help-outline',
			page:''
		};
		this.plugins['ContentController:text'] = {
			title:'Text',
			icon: 'ios-create-outline',
			page:'ElementTextPage'
		};
		this.plugins['ImageController:image'] = {
			title:'Image',
			icon: 'ios-camera-outline',
			page:''
		};
		this.plugins['VideoController:image'] = {
			title:'Video',
			icon: 'ios-film-outline',
			page:''
		};
	}

}
