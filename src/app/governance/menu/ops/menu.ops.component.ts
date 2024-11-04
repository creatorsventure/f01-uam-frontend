import {Component, OnInit} from '@angular/core';
import {OpsAbstract} from '../../../shared/abstract/ops.abstract';
import {ActivatedRoute} from '@angular/router';
import {CRUDService} from '../../../shared/services/crud.service';
import {FormBuilder} from '@angular/forms';
import {AppControlService} from '../../../shared/services/app.control.service';
import {AlertService} from '../../../shared/services/alert.service';
import {CONTROL_DESCRIPTION} from '../../../shared/constant/control.constant';

@Component({
    selector: 'app-menu-ops',
    templateUrl: 'menu.ops.component.html',
})
export class MenuOpsComponent extends OpsAbstract implements OnInit {
    constructor(
        public override fb: FormBuilder,
        public override activatedRoute: ActivatedRoute,
        public override crudService: CRUDService,
        public override appCtrlService: AppControlService,
        public override alertService: AlertService,
    ) {
        super(fb, activatedRoute, crudService, appCtrlService, alertService);
    }

    ngOnInit(): void {
        super.init();
        this.crudForm = this.fb.group({
            path: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.input, this.object?.path, false),
            icon: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.input, this.object?.icon),
            rootMenuId: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.numeric, this.object?.rootMenuId),
            displayPosition: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.numeric, this.object?.displayPosition),
            menuType: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.input, this.object?.menuType),
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
