import {Injectable} from '@angular/core';
import {filter, Observable, Subject} from 'rxjs';
import {Alert, AlertType} from '../interfaces/alert.type';
import {TranslateService} from '@ngx-translate/core';
import {APIResponseType} from '../interfaces/apt.response.type';

@Injectable({providedIn: 'root'})
export class AlertService {
    private subject = new Subject<Alert>();
    private defaultId = 'default-alert';

    constructor(private translate: TranslateService) {
    }

    // enable subscribing to alerts observable
    onAlert(id = this.defaultId): Observable<Alert> {
        return this.subject.asObservable().pipe(filter((x) => x && x.id === id));
    }

    // main alert method
    alert(alert: Alert): void {
        alert.id = alert.id || this.defaultId;
        this.subject.next(alert);
    }

    // clear alerts
    clear(id = this.defaultId): void {
        this.subject.next(new Alert({id}));
    }

    public alertHttpErrorResp(err: any, pageName: string): void {
        if (err?.error?.type === APIResponseType.MESSAGE_ACTUAL) {
            this.error(err?.error?.object.message, false);
        } else if (err?.error?.type === APIResponseType.MESSAGE_CODE) {
            this.error(err?.error?.message, true);
        } else if (err?.error?.type === APIResponseType.MESSAGE_CODE_LIST) {
            err?.error?.object.forEach((element) => {
                if (element && element.defaultMessage) {
                    this.error(
                        (element.field
                            ? this.translate.instant(
                            'app.page.' + pageName + '.label.' + element.field
                        ) + ': '
                            : '') + this.translate.instant(element.defaultMessage),
                        false
                    );
                }
            });
        } else {
            console.error('Error:AlertService:handleHttpErrorResp: ', err);
            this.error('app.message.generic.refer-console', true);
        }
    }

    public publishStatus(status: boolean, translate: boolean = true): void {
        if (status) {
            this.success('app.message.success.000', translate);
        } else {
            this.error('app.message.error.000', translate);
        }
    }

    success(msg: string, translate: boolean, options?: any): void {
        this.alert(
            new Alert({
                ...options,
                type: AlertType.Success,
                header: this.translate.instant('app.message.generic.success'),
                message: translate ? this.translate.instant(msg) : msg,
            })
        );
    }

    error(msg: string, translate: boolean, options?: any): void {
        this.alert(
            new Alert({
                ...options,
                type: AlertType.Error,
                header: this.translate.instant('app.message.generic.error'),
                message: translate ? this.translate.instant(msg) : msg,
            })
        );
    }

    info(msg: string, translate: boolean, options?: any): void {
        this.alert(
            new Alert({
                ...options,
                type: AlertType.Info,
                header: this.translate.instant('app.message.generic.info'),
                message: translate ? this.translate.instant(msg) : msg,
            })
        );
    }

    warn(msg: string, translate: boolean, options?: any): void {
        this.alert(
            new Alert({
                ...options,
                type: AlertType.Warning,
                header: this.translate.instant('app.message.generic.warning'),
                message: translate ? this.translate.instant(msg) : msg,
            })
        );
    }
}
