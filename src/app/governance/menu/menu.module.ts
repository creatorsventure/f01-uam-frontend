import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {MenuIndexComponent} from './index/menu.index.component';
import {MenuRouteModule} from './route/menu.route.module';
import {MenuListComponent} from './list/menu.list.component';
import {MenuOpsComponent} from './ops/menu.ops.component';

@NgModule({
    imports: [SharedModule, MenuRouteModule],
    exports: [],
    declarations: [MenuIndexComponent, MenuListComponent, MenuOpsComponent],
    providers: [],
})
export class MenuModule {
}
