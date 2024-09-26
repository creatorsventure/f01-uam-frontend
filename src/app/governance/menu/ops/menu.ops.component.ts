import {Component, OnInit} from '@angular/core';
import {OpsAbstract} from '../../../shared/abstract/ops.abstract';
import {ActivatedRoute} from '@angular/router';
import {CRUDService} from '../../../shared/services/crud.service';
import {AlertService} from '../../../shared/services/alert.service';
import {FormBuilder} from '@angular/forms';
import {AppControlService} from '../../../shared/services/app.control.service';
import {ControlType} from '../../../shared/enums/control.enum';

@Component({
    selector: 'app-menu-ops',
    templateUrl: 'menu.ops.component.html',
})
export class MenuOpsComponent extends OpsAbstract implements OnInit {
    constructor(
        public override fb: FormBuilder,
        public override activatedRoute: ActivatedRoute,
        public override crudService: CRUDService,
        public override alertService: AlertService,
        public override appCtrlService: AppControlService
    ) {
        super(fb, activatedRoute, crudService, alertService, appCtrlService);
    }

    ngOnInit(): void {
        super.init();
        this.crudForm = this.fb.group({
            path: this.appCtrlService.generateFormControl(
                ControlType.input,
                this.object?.path
            ),
        });
    }

    override customUpdateValidations(): boolean {
        return true;
    }

    override customCreateValidations(): boolean {
        return true;
    }

    override customPostSuccessOps(): void {
    }

    override customPostFailureOps(): void {
    }
}
