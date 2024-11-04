import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, map, Observable, throwError} from 'rxjs';
import {APIResponseType, IAPIResponse} from '../interfaces/apt.response.type';
import {environment} from '../../../environments/environment';
import {API_METHOD} from '../routes/navigation.constant';
import {IPagination} from '../interfaces/Pagination.type';
import {ParamType} from '../interfaces/Param.type';

@Injectable({providedIn: 'root'})
export class CRUDService {
    private endPoint: string;

    constructor(private http: HttpClient) {
        this.endPoint = environment.uamApiURL;
    }

    public create(pageName: string, dto: any): Observable<boolean> {
        return this.http
            .post<IAPIResponse>(this.endPoint + pageName, dto)
            .pipe(
                map((apiResponse) => {
                    if (
                        apiResponse.status &&
                        apiResponse.type === APIResponseType.OBJECT_ONE
                    ) {
                        return true;
                    }
                }),
                catchError((err) => {
                    return throwError(() => err);
                })
            );
    }

    public update(pageName: string, dto: any): Observable<boolean> {
        return this.http
            .put<IAPIResponse>(this.endPoint + pageName, dto)
            .pipe(
                map((apiResponse) => {
                    if (
                        apiResponse.status &&
                        apiResponse.type === APIResponseType.OBJECT_ONE
                    ) {
                        return true;
                    }
                }),
                catchError((err) => {
                    return throwError(() => err);
                })
            );
    }

    public readAll(
        pageName: string,
        paginationDto: IPagination
    ): Observable<IPagination> {
        return this.http
            .post<IAPIResponse>(
                this.endPoint + pageName + API_METHOD.all,
                paginationDto
            )
            .pipe(
                map((apiResponse) => {
                    if (
                        apiResponse.status &&
                        apiResponse.type === APIResponseType.OBJECT_LIST
                    ) {
                        return apiResponse.object as IPagination;
                    }
                }),
                catchError((err) => {
                    return throwError(() => err);
                })
            );
    }

    public read(pageName: string, inputParams?: ParamType[]): Observable<any> {
        let params: HttpParams = new HttpParams();
        if (inputParams) {
            for (const param of inputParams) {
                params = params.append(param.key, param.value);
            }
        }
        return this.http
            .get<IAPIResponse>(this.endPoint + pageName, {
                params,
            })
            .pipe(
                map((apiResponse) => {
                    if (
                        apiResponse.status &&
                        apiResponse.type === APIResponseType.OBJECT_ONE
                    ) {
                        return apiResponse.object;
                    }
                }),
                catchError((err) => {
                    return throwError(() => err);
                })
            );
    }

    public delete(pageName: string, id: any): Observable<boolean> {
        const params = new HttpParams().append('id', id);
        return this.http
            .delete<IAPIResponse>(this.endPoint + pageName, {
                params,
            })
            .pipe(
                map((apiResponse) => {
                    if (
                        apiResponse.status &&
                        apiResponse.type === APIResponseType.OBJECT_ONE
                    ) {
                        return true;
                    }
                }),
                catchError((err) => {
                    return throwError(() => err);
                })
            );
    }

    public changeStatus(
        pageName: string,
        id: any,
        status: any
    ): Observable<boolean> {
        const params = new HttpParams().append('id', id).append('status', status);
        return this.http
            .get<IAPIResponse>(
                this.endPoint + pageName + API_METHOD.changeStatus, {
                    params,
                }
            )
            .pipe(
                map((apiResponse) => {
                    if (
                        apiResponse.status &&
                        apiResponse.type === APIResponseType.OBJECT_ONE
                    ) {
                        return true;
                    }
                }),
                catchError((err) => {
                    return throwError(() => err);
                })
            );
    }

    public getData(
        urlSuffix: string,
        inputParams?: ParamType[]
    ): Observable<any> {
        let params: HttpParams = new HttpParams();
        if (inputParams) {
            for (const param of inputParams) {
                params = params.append(param.key, param.value);
            }
        }
        return this.http
            .get<IAPIResponse>(this.endPoint + urlSuffix, {
                params,
            })
            .pipe(
                map((apiResponse) => {
                    if (
                        apiResponse.status &&
                        apiResponse.type === APIResponseType.OBJECT_ONE
                    ) {
                        return apiResponse.object;
                    }
                }),
                catchError((err) => {
                    return throwError(() => err);
                })
            );
    }
}
