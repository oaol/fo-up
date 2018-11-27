import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN, NzFormItemComponent } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { NgxPermissionsModule } from 'ngx-permissions';


import { RouterModule, PreloadAllModules, NoPreloading } from "@angular/router";
import { appRoutes } from "./app.routes";
import { IndexComponent } from "./pages/home/index/index.component";
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/home/header/header.component';

import { FooterComponent } from './pages/home/footer/footer.component';
import { BreadcrumbComponent } from './pages/home/breadcrumb/breadcrumb.component';


registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgxPermissionsModule.forRoot(),
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
