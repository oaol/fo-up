import { Component, OnInit } from '@angular/core';
import { Observable }     from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';

import { UserService } from '../../../service/service.module';
import { Page } from '../../../common/page';
import { User } from '../../../service/user/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class ListComponent implements OnInit {

  page:Page<User>;
  pageIndex: number = 1;
  pageSize: number = 10;
  _loading = true;
  searchValue = '';


  createPath: string = '/user/template/create';

  searchObserver;

  constructor(private service: UserService,
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
    _obj.service.getEntityByPage(_obj.pageIndex , _obj.pageSize, "", "", _obj.searchValue)
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
    this.service
    .deleteByPrimaryKey(id).subscribe(
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
