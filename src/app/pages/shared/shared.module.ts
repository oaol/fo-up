import { NgModule, ModuleWithProviders } from '@angular/core';

import { NgZorroAntdModule } from "ng-zorro-antd";
import { NgxPermissionsModule } from 'ngx-permissions';

// export module
export { NgZorroAntdModule } from "ng-zorro-antd";

@NgModule({
  exports: [
    NgZorroAntdModule,
    NgxPermissionsModule
  ],
  imports: [
  ]
})
export class SharedModule {
}
