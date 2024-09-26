import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ControlType} from '../enums/control.enum';
import {APP_NAVIGATION} from '../routes/navigation.constant';
import {AlertService} from '../services/alert.service';
import {AppControlService} from '../services/app.control.service';
import {CRUDService} from '../services/crud.service';
import {
    publishStatus,
    updateFormDirtyAndValueAndValidity,
    updateFormPristineAndUntouched,
} from '../utils/utils';

export abstract class OpsAbstract {
    public object: any | null = null;
    public pageName: string | null = null;
    public controlType = ControlType;
    public crudForm: FormGroup;
    public crudOps: string | null = null;

    protected constructor(
        public fb: FormBuilder,
        public activatedRoute: ActivatedRoute,
        public crudService: CRUDService,
        public alertService: AlertService,
        public appCtrlService: AppControlService
    ) {
    }

    protected init(): void {
        this.activatedRoute.data.subscribe(
            (data: { pageName: string; crudOps: string; object: any }) => {
                if (data) {
                    if (data.pageName) {
                        this.pageName = data.pageName;
                    }
                    if (data.crudOps) {
                        this.crudOps = data.crudOps;
                    }
                    if (data.object) {
                        this.object = data.object;
                    }
                }
            }
        );
    }

    abstract customUpdateValidations(): boolean;

    abstract customCreateValidations(): boolean;

    abstract customPostSuccessOps(): void;

    abstract customPostFailureOps(): void;

    createOrUpdate(finalObject?: any): void {
        updateFormDirtyAndValueAndValidity(this.crudForm);
        if (this.crudForm.valid) {
            if (
                this.crudOps === APP_NAVIGATION.permissions.add &&
                this.customCreateValidations()
            ) {
                this.crudService
                    .create(
                        this.pageName,
                        finalObject ? finalObject : this.crudForm.value
                    )
                    .subscribe({
                        next: (status) => {
                            this.customPostSuccessOps();
                            publishStatus(this.alertService, status, this.crudForm, false);
                        },
                        error: (err) => {
                            this.customPostFailureOps();
                            this.alertService.handleHttpErrorResp(err, this.pageName);
                        },
                        complete: () => {
                            console.info('Create operation completed.');
                        },
                    });
            } else if (
                this.crudOps === APP_NAVIGATION.permissions.edit &&
                this.customUpdateValidations()
            ) {
                this.crudService
                    .update(
                        this.pageName,
                        finalObject ? finalObject : this.crudForm.value
                    )
                    .subscribe({
                        next: (status) => {
                            this.customPostSuccessOps();
                            publishStatus(this.alertService, status, this.crudForm, false);
                        },
                        error: (err) => {
                            this.customPostFailureOps();
                            this.alertService.handleHttpErrorResp(err, this.pageName);
                        },
                        complete: () => {
                            console.info('Update operation completed.');
                        },
                    });
            } else {
                console.error(
                    'Invalid update/create flag or failure of custom validations.'
                );
            }
        } else {
            console.error('Invalid Control: ', this.findInvalidControls());
        }
    }

    findInvalidControls(): any {
        const invalid = [];
        const controls = this.crudForm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(name);
            }
        }
        return invalid;
    }

    reset(): void {
        updateFormPristineAndUntouched(this.crudForm);
    }
}
