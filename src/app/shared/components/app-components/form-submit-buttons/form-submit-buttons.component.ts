import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {updateFormPristineAndUntouched} from '../../../utils/utils';
import {APP_NAVIGATION} from '../../../routes/navigation.constant';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-form-submit-buttons',
    templateUrl: './form-submit-buttons.component.html',
})
export class FormSubmitButtonsComponent {
    @Input()
    public crudForm: FormGroup;

    @Input()
    public crudOps: string;

    @Input()
    public pageName: string;

    @Input()
    public parent: string;

    public permissions: any = APP_NAVIGATION.permissions;

    constructor(public router: Router, private route: ActivatedRoute) {
    }

    reset(): void {
        updateFormPristineAndUntouched(this.crudForm);
    }

    redirectToListPage(): void {
        this.router.navigate(['../../'], {relativeTo: this.route, skipLocationChange: true});
    }

}
