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
	@Input() content: any;
	@Output() onChange = new EventEmitter<any>();

	editor: any;

	constructor() {
		console.log('Jodit constructor');
	}

	ngAfterViewInit() {
		console.log('Jodit ngAfterViewInit');
		var parent = this;

		setTimeout(() => {
			this.editor = new Jodit('#' + this.elementId, {});
			//this.editor.events.on('change', this.change());
			this.editor.events.on('change', function () {
				parent.content = parent.editor.getEditorValue();
				parent.onChange.emit(parent.content);
			});
			//this.editor.editor.addEventListener('keyup',this.onEditorKeyup.emit(this.editor.getEditorValue()));
			// this.editor.editor.addEventListener('keyup',function() {
			// 	console.log('KEYSYYUP');
			// });
			this.editor.setEditorValue(this.content);
		});

	}

	ngOnInit() {
		//console.log('Jodit ngOnInit');
	}

	ngOnDestroy() {
		this.editor.destruct();
	}
}
