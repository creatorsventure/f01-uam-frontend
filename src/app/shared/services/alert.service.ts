import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';
import { Alert, AlertType } from '../interfaces/alert.type';
import { TranslateService } from '@ngx-translate/core';
import { APIResponseType } from '../interfaces/apt.response.type';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';

  constructor(private translate: TranslateService) {}

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
    this.subject.next(new Alert({ id }));
  }

  public handleHttpErrorResp(err: any, pageName: string): void {
    if (err.type === APIResponseType.OBJECT) {
      this.error(err.object.message, false);
    } else if (err.type === APIResponseType.MESSAGE) {
      this.error(err.message, true);
    } else if (err.type === APIResponseType.LIST) {
      err.object.forEach((element) => {
        if (element && element.defaultMessage) {
          this.error(
            (element.field
              ? this.translate.instant(
                  'app.' + pageName + '.field.' + element.field
                ) + ': '
              : '') + this.translate.instant(element.defaultMessage),
            false
          );
        }
      });
    } else {
      this.error('app.error.msg-0', true);
    }
  }

  success(msg: string, translate: boolean, options?: any): void {
    this.alert(
      new Alert({
        ...options,
        type: AlertType.Success,
        header: this.translate.instant('app.general.notification.success'),
        message: translate ? this.translate.instant(msg) : msg,
      })
    );
  }

  error(msg: string, translate: boolean, options?: any): void {
    this.alert(
      new Alert({
        ...options,
        type: AlertType.Error,
        header: this.translate.instant('app.general.notification.error'),
        message: translate ? this.translate.instant(msg) : msg,
      })
    );
  }

  info(msg: string, translate: boolean, options?: any): void {
    this.alert(
      new Alert({
        ...options,
        type: AlertType.Info,
        header: this.translate.instant('app.general.notification.info'),
        message: translate ? this.translate.instant(msg) : msg,
      })
    );
  }

  warn(msg: string, translate: boolean, options?: any): void {
    this.alert(
      new Alert({
        ...options,
        type: AlertType.Warning,
        header: this.translate.instant('app.general.notification.warning'),
        message: translate ? this.translate.instant(msg) : msg,
      })
    );
  }
}
