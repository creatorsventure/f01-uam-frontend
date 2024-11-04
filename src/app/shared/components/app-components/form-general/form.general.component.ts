import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {APP_NAVIGATION} from '../../../routes/navigation.constant';
import {AppControlService} from '../../../services/app.control.service';
import {CONTROL_DESCRIPTION} from '../../../constant/control.constant';

@Component({
    selector: 'app-form-general',
    templateUrl: 'form.general.component.html',
})
export class FormGeneralComponent implements OnInit {
    @Input()
    public parentForm: FormGroup;

    @Input()
    pageName: string;

    @Input()
    public crudOps: string;

    @Input()
    public object: any;

    public id: FormControl;
    public name: FormControl;
    public description: FormControl;
    public status: FormControl;
    public permissions: any = APP_NAVIGATION.permissions;
    public control = CONTROL_DESCRIPTION;

    constructor(public appCtrlService: AppControlService) {
    }

    ngOnInit(): void {
        this.id = new FormControl(this.object?.id);
        this.parentForm.addControl('id', this.id);

        this.name = new FormControl(this.object?.name, [
            Validators.required,
            Validators.minLength(this.control.input.minLength),
            Validators.maxLength(this.control.input.maxLength),
            Validators.pattern(this.control.input.pattern),
        ]);
        this.parentForm.addControl('name', this.name);

        this.description = new FormControl(this.object?.description, [
            Validators.required,
            Validators.minLength(this.control.input.minLength),
            Validators.maxLength(this.control.input.maxLength),
            Validators.pattern(this.control.inputSpecial.pattern),
        ]);
        this.parentForm.addControl('description', this.description);

        this.status = new FormControl(this.object?.status, [Validators.required]);
        this.parentForm.addControl('status', this.status);
    }

    public getFormField(controlName: string): FormControl {
        return this.parentForm?.get(controlName) as FormControl;
    }
}
