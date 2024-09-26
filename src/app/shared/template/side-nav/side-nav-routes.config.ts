import { SideNavInterface } from '../../interfaces/side-nav.type';
import { APP_NAVIGATION } from '../../routes/navigation.constant';
export const ROUTES: SideNavInterface[] = [
  {
    path: '',
    title: 'Dashboard',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'dashboard',
    submenu: [],
  },
  {
    path: '',
    title: 'app.page.' + APP_NAVIGATION.governance + '.name',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'compass',
    submenu: [
      {
        path: APP_NAVIGATION.governance + '/' + APP_NAVIGATION.permission,
        title: 'app.page.' + APP_NAVIGATION.permission + '.name',
        iconType: 'nzIcon',
        icon: 'api',
        iconTheme: '',
        submenu: [],
      },
      {
        path: APP_NAVIGATION.governance + '/' + APP_NAVIGATION.menu,
        title: 'app.page.' + APP_NAVIGATION.menu + '.name',
        iconType: 'nzIcon',
        icon: 'menu',
        iconTheme: '',
        submenu: [],
      },
      {
        path: APP_NAVIGATION.governance + '/' + APP_NAVIGATION.organization,
        title: 'app.page.' + APP_NAVIGATION.organization + '.name',
        iconType: 'nzIcon',
        icon: 'bank',
        iconTheme: '',
        submenu: [],
      },
      {
        path: APP_NAVIGATION.governance + '/' + APP_NAVIGATION.accessRole,
        title: 'app.page.' + APP_NAVIGATION.accessRole + '.name',
        iconType: 'nzIcon',
        icon: 'flag',
        iconTheme: '',
        submenu: [],
      },
      {
        path: APP_NAVIGATION.governance + '/' + APP_NAVIGATION.dataRole,
        title: 'app.page.' + APP_NAVIGATION.dataRole + '.name',
        iconType: 'nzIcon',
        icon: 'database',
        iconTheme: '',
        submenu: [],
      },
      {
        path: APP_NAVIGATION.governance + '/' + APP_NAVIGATION.user,
        title: 'app.page.' + APP_NAVIGATION.user + '.name',
        iconType: 'nzIcon',
        icon: 'user',
        iconTheme: '',
        submenu: [],
      },
    ],
  },
];
