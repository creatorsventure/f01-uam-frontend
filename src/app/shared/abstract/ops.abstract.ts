import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {APP_NAVIGATION} from '../routes/navigation.constant';
import {AppControlService} from '../services/app.control.service';
import {CRUDService} from '../services/crud.service';
import {updateFormDirtyAndValueAndValidity, updateFormPristineAndUntouched} from '../utils/utils';
import {AlertService} from '../services/alert.service';
import {CONTROL_DESCRIPTION} from '../constant/control.constant';

export abstract class OpsAbstract {
    public object: any | null = null;
    public pageName: string | null = null;
    public control = CONTROL_DESCRIPTION;
    public crudForm: FormGroup;
    public crudOps: string | null = null;

    protected constructor(
        public fb: FormBuilder,
        public activatedRoute: ActivatedRoute,
        public crudService: CRUDService,
        public appCtrlService: AppControlService,
        public alertService: AlertService,
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
                            if (status) {
                                this.customPostSuccessOps();
                            }
                        },
                        error: (err) => {
                            this.customPostFailureOps();
                            this.alertService.alertHttpErrorResp(err, this.pageName);
                        },
                        complete: () => {
                            this.alertService.publishStatus(true);
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
                            if (status) {
                                this.customPostSuccessOps();
                            }
                        },
                        error: (err) => {
                            this.customPostFailureOps();
                            this.alertService.alertHttpErrorResp(err, this.pageName);
                        },
                        complete: () => {
                            this.alertService.publishStatus(true);
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
