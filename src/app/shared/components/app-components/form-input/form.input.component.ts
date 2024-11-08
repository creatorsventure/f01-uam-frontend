import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {APP_NAVIGATION} from '../../../routes/navigation.constant';
import {AppControlService} from '../../../services/app.control.service';
import {Control} from '../../../interfaces/control.type';

@Component({
    selector: 'app-form-input',
    templateUrl: 'form.input.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormInputComponent),
            multi: true,
        },
    ],
})
export class FormInputComponent implements ControlValueAccessor, OnInit {
    @Input()
    public parentForm: FormGroup;
    @Input()
    controlName: string;
    @Input()
    pageName: string;
    @Input()
    control: Control;
    @Input()
    isRequired = true;
    @Input()
    isHideLabel = false;
    @Input()
    isDisabled = false;
    @Input()
    crudOps: string;

    public controlValue: string;
    public changed: (value: string) => void;
    public touched: () => void;
    public permissions: any = APP_NAVIGATION.permissions;

    constructor(public appCtrlService: AppControlService) {
    }

    ngOnInit(): void {
    }

    public getFormField(): FormControl {
        return this.parentForm?.get(this.controlName) as FormControl;
    }

    public onChange(event: Event): void {
        const value: string = (event.target as HTMLInputElement).value;
        this.changed(value);
    }

    writeValue(value: any): void {
        this.controlValue = value;
    }

    registerOnChange(fn: any): void {
        this.changed = fn;
    }

    registerOnTouched(fn: any): void {
        this.touched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }
}
