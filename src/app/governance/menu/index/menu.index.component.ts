import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-menu-index',
    templateUrl: 'menu.index.component.html',
})
export class MenuIndexComponent implements OnInit {
    constructor(public acRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
    }
}
