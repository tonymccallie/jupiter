import { Component,Input } from '@angular/core';
import { GreybackProvider } from '../../providers/greyback/greyback';

@Component({
	selector: 'tree-view',
	templateUrl: 'tree-view.html'
})
export class TreeViewComponent {

	@Input('pages') pages: any[];
	clipboard: any;

	constructor(public greybackProvider: GreybackProvider) {
		
	}

	ngOnInit() {
		console.log('ngOnInit TreeViewComponent');
		this.greybackProvider.clipboardObs.subscribe(data => {
			this.clipboard = data;
		});
	}

	clip(page) {
		//this.pages[this.pages.indexOf(page)].clipped = 'med';
		//console.log(this.pages);
		this.greybackProvider.clipboard(page);
	}

	under(page) {
		this.greybackProvider.under(page).subscribe(result => {
			console.log(result);
			this.greybackProvider.pagetree(result);
		});
	}

	after(page) {
		this.greybackProvider.after(page).subscribe(result => {
			console.log(result);
			this.greybackProvider.pagetree(result);
		});
	}
}
