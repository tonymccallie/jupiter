import {
	Component,
	OnDestroy,
	AfterViewInit,
	EventEmitter,
	Input,
	Output
} from '@angular/core';
declare var Jodit: any;

@Component({
	selector: 'jodit',
	templateUrl: 'jodit.html'
})
export class JoditComponent implements AfterViewInit, OnDestroy {
	@Input() elementId: String;
	@Output() onEditorKeyup = new EventEmitter<any>();

	editor;

	ngAfterViewInit() {
		this.editor = new Jodit('#' + this.elementId, {});
	}

	ngOnDestroy() {
		this.editor.destruct();
	}
}
