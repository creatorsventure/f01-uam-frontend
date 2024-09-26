import {Routes} from '@angular/router';
import {APP_NAVIGATION} from './navigation.constant';

export const COMMON_LAYOUT_ROUTES: Routes = [
    {
        path: APP_NAVIGATION.dashboard,
        loadChildren: () =>
            import('../../dashboard/dashboard.module').then((m) => m.DashboardModule),
        data: {
            headerDisplay: 'none',
        },
    },
    {
        path: APP_NAVIGATION.governance,
        loadChildren: () =>
            import('../../governance/menu/menu.module').then((m) => m.MenuModule),
        data: {
            parent: APP_NAVIGATION.governance,
            title: 'app.page.' + APP_NAVIGATION.governance + '.name',
        },
    },
];
