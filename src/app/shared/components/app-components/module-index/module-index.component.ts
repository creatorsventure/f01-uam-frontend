import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APP_NAVIGATION} from '../../../routes/navigation.constant';

@Component({
    selector: 'app-module-index',
    templateUrl: './module-index.component.html',
})
export class ModuleIndexComponent implements OnInit {
    @Input()
    public acRoute: ActivatedRoute;

    @Input()
    public addButtonDisplay = true;

    @Input()
    public listButtonDisplay = true;

    private pageName: string;
    private parent: string;

    ngOnInit(): void {
        this.acRoute.data.subscribe(
            (data: { endPoint: string; pageName: string; parent: string }) => {
                if (data) {
                    this.pageName = data.pageName;
                    this.parent = data.parent;
                }
            }
        );
    }

    constructor(private router: Router) {
    }

    redirectToListPage(): void {
        this.router.navigateByUrl(this.parent + '/' + this.pageName);
    }

    redirectToAddPage(): void {
        this.router.navigateByUrl(
            this.parent + '/' + this.pageName + '/' + APP_NAVIGATION.permissions.add
        );
    }
}
