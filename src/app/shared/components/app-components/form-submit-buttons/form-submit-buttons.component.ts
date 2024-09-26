import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {updateFormPristineAndUntouched} from '../../../utils/utils';
import {APP_NAVIGATION} from '../../../routes/navigation.constant';

@Component({
    selector: 'app-form-submit-buttons',
    templateUrl: './form-submit-buttons.component.html',
})
export class FormSubmitButtonsComponent {
    @Input()
    public crudForm: FormGroup;

    @Input()
    public crudOps: string;

    public permissions: any = APP_NAVIGATION.permission;

    reset(): void {
        updateFormPristineAndUntouched(this.crudForm);
    }
}
