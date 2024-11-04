import {Component, Input, OnInit} from '@angular/core';
import {IPagination} from '../../../interfaces/Pagination.type';
import {CRUDService} from '../../../services/crud.service';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {API_METHOD} from '../../../routes/navigation.constant';
import {AlertService} from '../../../services/alert.service';

@Component({
    selector: 'app-module-datatable',
    templateUrl: 'module.datatable.component.html',
})
export class ModuleDatatableComponent implements OnInit {
    constructor(
        private service: CRUDService,
        private alertService: AlertService,
    ) {
    }

    @Input()
    pageName: string;

    @Input()
    paginationDto: IPagination;

    @Input()
    public resendMailOption: boolean;

    ngOnInit(): void {
    }

    public refreshDatatable(): void {
        this.paginationDto.loading = true;
        this.service.readAll(this.pageName, this.paginationDto).subscribe({
            next: (responseObj) => {
                this.paginationDto = responseObj;
            },
            error: (err) => {
                this.paginationDto.loading = false;
            }
        });
    }

    public changeStatus(id: number, inStatus: boolean): void {
        this.service.changeStatus(this.pageName, id, inStatus).subscribe({
            next: (status) => {
                if (status) {
                    this.alertService.success('app.message.success.000', true);
                    this.refreshDatatable();
                }
            },
            error: (err) => {
                this.alertService.alertHttpErrorResp(err, null);
            }
        });
    }

    public delete(id: number): void {
        this.service.delete(this.pageName, id).subscribe({
            next: (status) => {
                if (status) {
                    this.alertService.success('app.message.success.000', true);
                    this.refreshDatatable();
                }
            },
            error: (err) => {
                this.alertService.alertHttpErrorResp(err, null);
            }
        });
    }

    public resendActivationMail(id: number): void {
        this.service
            .read(this.pageName + API_METHOD.resendActivationMail, [
                {key: 'id', value: id},
            ])
            .subscribe({
                next: (status) => {
                    if (status) {
                        this.alertService.success('app.message.success.000', true);
                        this.refreshDatatable();
                    }
                },
                error: (err) => {
                    this.alertService.alertHttpErrorResp(err, null);
                }
            });
    }

    public onQueryParamsChanged(params: NzTableQueryParams): void {
        this.paginationDto.pageSize = params.pageSize;
        this.paginationDto.pageIndex = params.pageIndex;
        const currentSort = params.sort.find((item) => item.value !== null);
        this.paginationDto.sortField = (currentSort && currentSort.key) || null;
        this.paginationDto.sortOrder = (currentSort && currentSort.value) || null;
        this.paginationDto.result = [];
        this.refreshDatatable();
    }
}
