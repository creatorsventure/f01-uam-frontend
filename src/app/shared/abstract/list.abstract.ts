import { ActivatedRoute } from '@angular/router';
import { IPagination, Pagination } from '../interfaces/Pagination.type';
import { AlertService } from '../services/alert.service';
import { CRUDService } from '../services/crud.service';

export abstract class ListAbstract {
  public paginationDto: IPagination;
  public pageName: string | null = null;

  protected constructor(
    protected activatedRoute: ActivatedRoute,
    protected service: CRUDService,
    protected alertService: AlertService
  ) {}

  protected init(): void {
    this.activatedRoute.data.subscribe((data) => {
      if (data) {
        if (data.pageName) {
          this.pageName = data.pageName;
        }
      }
    });
    this.paginationDto = new Pagination(
      false,
      1,
      10,
      null,
      '',
      '',
      null,
      null,
      0
    );
  }

  public search(): void {
    if (this.paginationDto.searchField && this.paginationDto.searchValue) {
      this.paginationDto.loading = true;
      this.service.readAll(this.pageName, this.paginationDto).subscribe({
        next: (responseObj) => {
          this.paginationDto = responseObj;
        },
        error: (err) => {
          this.paginationDto.loading = false;
        },
        complete: () => console.info('Search operation completed.'),
      });
    } else {
      this.alertService.info('app.error.msg-10', true);
    }
  }
}
