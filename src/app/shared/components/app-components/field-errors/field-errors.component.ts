import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {logAllErrorsInFormControl} from '../../../utils/utils';

@Component({
    selector: 'app-field-errors',
    templateUrl: './field-errors.component.html',
})
export class FieldErrorsComponent implements OnInit {
    @Input()
    public control: FormControl;

    @Input()
    public controlName: string;

    constructor() {
    }

    ngOnInit(): void {
        // logAllErrorsInFormControl(this.control, this.controlName);
    }
}

