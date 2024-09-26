#!/usr/local/bin/bash

#Run project using bash 5 above. E.g. [bash ./generate.sh]
clear
echo "Please enter root path"
read -r rootPath
echo "Please enter the root folder name:"
read -r folderName
clear
echo "================================================================================================================="
echo "Selected Path: $rootPath"
echo "Selected Folder: $folderName"
echo "================================================================================================================="

declare -a folders=("index" "list" "ops" "model" "route" "module")

for i in "${folders[@]}"; do
  folderPath="$rootPath/$folderName/$i"
  echo "Module: $folderName Component: $i"
  if [[ "$i" == "index" ]]; then
    mkdir -p "$folderPath"
    echo '<app-module-index [acRoute]="acRoute"></app-module-index>' >"$folderPath/$folderName-$i.component.html"
    echo "import {Component, OnInit} from '@angular/core';import {ActivatedRoute} from '@angular/router';@Component({ selector: 'app-$folderName-$i',templateUrl: './$folderName-$i.component.html',styles: []})export class ${folderName^}IndexComponent implements OnInit {constructor(public acRoute:ActivatedRoute) {}  ngOnInit(): void {}}" >"$folderPath/$folderName-$i.component.ts"
  elif [[ "$i" == "list" ]]; then
    mkdir -p "$folderPath"
    echo $'<div nz-row nzJustify="end"><div nz-col><nz-space><nz-space-item><input [(ngModel)]="pagination.searchValue" class="search-input-size"  nz-input placeholder="{{\'app.pagination.searchValue\' | translate}}" nzSize="small"/></nz-space-item><nz-space-item><nz-select id="searchSelect" [(ngModel)]="pagination.searchField"><nz-option nzValue="" nzLabel="{{\'app.pagination.searchField\' | translate}}"></nz-option><nz-option nzValue="id" nzLabel="{{\'app.pagination.id\' | translate}}"></nz-option><nz-option nzValue="name" nzLabel="{{\'app.user-page.field.name\' | translate}}"></nz-option></nz-select></nz-space-item><nz-space-item><button nz-button nzType="primary" nzSize="small" (click)="search()"><i nz-icon nzType="search"></i></button></nz-space-item></nz-space></div></div><app-module-data-table [endPoint]="endPoint" [pagination]="pagination"></app-module-data-table>' >"$folderPath/$folderName-$i.component.html"
    echo "import {Component, OnInit} from '@angular/core';import {ActivatedRoute} from '@angular/router';@Component({  selector: 'app-$folderName-$i',  templateUrl: './$folderName-$i.component.html',  styles: []})export class ${folderName^}ListComponent extends ListAbstract implements OnInit {   constructor(protected service: CrudService,protected alertService: AlertService,protected activatedRoute: ActivatedRoute,private sessionService: SessionService) {    super(activatedRoute, service, alertService);  }  ngOnInit(): void {   super.init();  }}" >"$folderPath/$folderName-$i.component.ts"
  elif [[ "$i" == "ops" ]]; then
    mkdir -p "$folderPath"
    echo $'<nz-spin [nzSpinning]="isLoading">  <form nz-form nzLayout="horizontal" [formGroup]="curdForm" (ngSubmit)="createOrUpdate()">    <app-form-general [curdForm]="curdForm" [curdOps]="curdOps" [object]="object"></app-form-general>  <!-- Module Specific Fields - Start --> <div nz-row [nzGutter]="24"><div nz-col [nzSpan]="8"><nz-form-item><div nz-col [nzSpan]="8"></div><div nz-col [nzSpan]="16"></div></nz-form-item></div></div> <!-- Module Specific Fields - End -->  <app-form-audit [object]="object" [curdOps]="curdOps"></app-form-audit>    <app-form-submit-buttons [curdOps]="curdOps" [curdForm]="curdForm"></app-form-submit-buttons>  </form></nz-spin>' >"$folderPath/$folderName-$i.component.html"
    echo "import {Component, OnInit} from '@angular/core';import {ActivatedRoute, Router} from '@angular/router';import {FormBuilder} from '@angular/forms';import {TranslateService} from '@ngx-translate/core';@Component({selector: 'app-$folderName-$i', templateUrl: './$folderName-$i.component.html', styles: []})export class ${folderName^}OpsComponent extends OpsAbstract implements OnInit {  constructor(public fb: FormBuilder,              public router: Router,              public activatedRoute: ActivatedRoute,              public acService: AppComponentService,              public alertService: AlertService,              public service: CrudService,              public translate: TranslateService  ) {    super(fb, router, activatedRoute, acService, alertService, service);  }  ngOnInit(): void {    super.init();  this.curdForm = this.fb.group({}); }  customCreateValidations(): boolean {    return true;  }  customPostFailureOps(): void {  }  customPostSuccessOps(): void {  }  customUpdateValidations(): boolean {    return true;  }}" >"$folderPath/$folderName-$i.component.ts"
  elif [[ "$i" == "model" ]]; then
    mkdir -p "$folderPath"
    echo "export interface ${folderName^} extends GenericModelType {}" >"$folderPath/$folderName-$i.component.ts"
  elif [[ "$i" == "route" ]]; then
    mkdir -p "$folderPath"
    echo "import {NgModule} from '@angular/core';import {RouterModule, Routes} from '@angular/router';import {${folderName^}IndexComponent} from '../index/$folderName-index.component';import {${folderName^}ListComponent} from '../list/$folderName-list.component';import {${folderName^}OpsComponent} from '../ops/$folderName-ops.component';const pageNameAndEndPoint = {  pageName: APP_NAVIGATION_CONSTANTS.ANG.MODULE_${folderName^^},  endPoint: APP_NAVIGATION_CONSTANTS.API.MODULE_${folderName^^}};export const routes: Routes = [  {    path: '',    component: ${folderName^}IndexComponent,    data: {      title: 'app.' + APP_NAVIGATION_CONSTANTS.ANG.MODULE_${folderName^^} + '.name',      description: 'app.' + APP_NAVIGATION_CONSTANTS.ANG.MODULE_${folderName^^} + '.description',      icon: 'menu',      ...pageNameAndEndPoint    },    children: [      {        path: '',        component: ${folderName^}ListComponent,        data: {          title: 'app.buttons.all',          ...pageNameAndEndPoint        }      },      {        path: APP_NAVIGATION_CONSTANTS.ANG.ROUTE_ADD,        component: ${folderName^}OpsComponent,        data: {          title: 'app.buttons.add',          curdOps: APP_CURD_CONSTANTS.CREATE,          ...pageNameAndEndPoint        }      },      {        path: APP_NAVIGATION_CONSTANTS.ANG.ROUTE_VIEW,        component: ${folderName^}OpsComponent,        data: {          title: 'app.buttons.view',          curdOps: APP_CURD_CONSTANTS.READ,          ...pageNameAndEndPoint        },        resolve: {          object: RouteResolver        },      },      {        path: APP_NAVIGATION_CONSTANTS.ANG.ROUTE_EDIT,        component: ${folderName^}OpsComponent,        data: {          title: 'app.buttons.edit',          curdOps: APP_CURD_CONSTANTS.UPDATE,          ...pageNameAndEndPoint        },        resolve: {          object: RouteResolver        },      }    ]  }];@NgModule({  imports: [RouterModule.forChild(routes)],  exports: [RouterModule]})export class ${folderName^}RouteModule {}" >"$folderPath/$folderName-$i.module.ts"
  elif [[ "$i" == "module" ]]; then
    echo "import {NgModule} from '@angular/core';import {${folderName^}IndexComponent} from './index/$folderName-index.component';import {${folderName^}ListComponent} from './list/$folderName-list.component';import {${folderName^}OpsComponent} from './ops/$folderName-ops.component';import {${folderName^}RouteModule} from './route/$folderName-route.module';@NgModule({  declarations: [${folderName^}IndexComponent, ${folderName^}ListComponent, ${folderName^}OpsComponent],  imports: [    SharedModule,    ${folderName^}RouteModule  ]})export class ${folderName^}Module {}" >"$rootPath/$folderName/$folderName.$i.ts"
  else
    echo "Invalid folder option found"
  fi
done
