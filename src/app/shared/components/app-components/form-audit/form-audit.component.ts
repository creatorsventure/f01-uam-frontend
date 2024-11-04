import {Component, Input} from '@angular/core';
import {APP_NAVIGATION} from '../../../routes/navigation.constant';

@Component({
    selector: 'app-form-audit',
    templateUrl: './form-audit.component.html',
})
export class FormAuditComponent {
    @Input()
    public object: any;

    @Input()
    public crudOps: string;

    public permissions: any = APP_NAVIGATION.permissions;
}
