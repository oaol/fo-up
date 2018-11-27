import { Component, OnInit } from '@angular/core';
import { Observable }     from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';

import { PermissionService } from '../../../service/service.module';
import { Page } from '../../../common/page';
import { UpmsPermission } from '../../../service/permission/upms-permission';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  page:Page<UpmsPermission>;
  pageIndex: number = 1;
  pageSize: number = 10;
  _loading = true;
  searchValue = '';


  createPath: string = '/permission/template/create';

  searchObserver;

  constructor(private permissionSerivce: PermissionService,
      private message: NzMessageService, 
    ) {}
  
  ngOnInit() {
    this.refreshData();
  }

  refreshData(reset = false) {
    let _obj = this;
    if (reset) {
      _obj.page.number = 1;
    }
    _obj._loading = true;
    _obj.permissionSerivce.getPermissionByPage(_obj.pageIndex , _obj.pageSize, "", "", _obj.searchValue)
      .subscribe(
        response => {
          _obj._loading = false;
          _obj.page = response.results;
        },
        error => {
          console.error("查询失败");
        }
    );
  }

  search() {

      if (!this.searchObserver) {
          Observable.create(observer => {
              this.searchObserver = observer;
          })//.debounceTime(500) // wait 300ms after the last event before emitting last event
            .subscribe( () => {
              // this.pageIndex = 1;
              // this.pageSize = 10;
              this._loading = false;
              this.refreshData();
            });
      }

      this.searchObserver.next(this.searchValue);
  }

  confirm(id) {
    this.permissionSerivce
    .deletePermissionByPrimaryKey(id).subscribe(
      () => {
        this.message.create("success", "删除成功！");
        this.search();
      }
    );
  }

  cancel(type, text) {
    this.message.create(type, text);
  }

}
