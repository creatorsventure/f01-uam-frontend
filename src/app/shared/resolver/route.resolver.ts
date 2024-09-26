import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError, EMPTY, mergeMap, Observable } from 'rxjs';
import { CRUDService } from '../services/crud.service';
import { AlertService } from '../services/alert.service';
import { APP_NAVIGATION } from '../routes/navigation.constant';

@Injectable({ providedIn: 'root' })
export class RouteResolver implements Resolve<any> {
  constructor(
    private crudService: CRUDService,
    private router: Router,
    private alertService: AlertService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    const id: number = route.params?.id;
    const pageNme: string = route.data?.pageName;
    if (id && pageNme) {
      return this.crudService.read(pageNme, [{ key: 'id', value: id }]).pipe(
        mergeMap((object: any) => {
          if (object) {
            return object;
          }
        }),
        catchError((err) => {
          this.alertService.handleHttpErrorResp(err, route.data?.pageName);
          return null;
        })
      );
    }
    this.router.navigate([APP_NAVIGATION.error]);
    return EMPTY;
  }
}
