import {CommonModule} from '@angular/common';
import {provideHttpClient} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {AppComponentsModule} from './components/app-components/app-components.module';
import {SearchPipe} from './pipes/search.pipe';
import {ThemeConstantService} from './services/theme-constant.service';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzNotificationModule} from 'ng-zorro-antd/notification';

const antdModule = [
    NzSpaceModule,
    NzSelectModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzCardModule,
    NzNotificationModule
];

@NgModule({
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzIconModule,
        SearchPipe,
        TranslateModule,
        AppComponentsModule,
        ...antdModule,
    ],
    imports: [
        RouterModule,
        CommonModule,
        NzIconModule,
        NzToolTipModule,
        TranslateModule.forChild(),
        ...antdModule,
    ],
    declarations: [SearchPipe],
    providers: [ThemeConstantService, provideHttpClient()],
})
export class SharedModule {
}
