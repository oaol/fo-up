import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { NzMessageService } from 'ng-zorro-antd';

import { PermissionService } from '../../../service/service.module';
import { UpmsPermission } from '../../../service/permission/upms-permission';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  permissionId: number;
  upmsPermission: UpmsPermission;
  types: any = [
    { "value": 1, "name": "目录" },
    { "value": 2, "name": "菜单" },
    { "value": 3, "name": "按钮" },
  ];

  status: any = [
    { "value": 1, "name": "正常" },
    { "value": 0, "name": "禁用" },
  ]

  validateForm: FormGroup;
  submitForm = ($event, value) => {
    $event.preventDefault();
    $event.stopPropagation();
    this.createPermission(value);
  };

  resetForm($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.validateForm.reset();
    for (let key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
    }
  }

  nameAsyncValidator = (control: FormControl): any => {
    return Observable.create(function (observer) {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });
  };

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  constructor(private fb: FormBuilder,
    private permissionService: PermissionService,
    private router: Router,
    private location: Location,
    private message: NzMessageService
    ) {
    this.validateForm = this.fb.group({
      name: ['1', [Validators.required], [this.nameAsyncValidator]],
      pid: ['1', [Validators.required]],
      type: ['1', [Validators.required]],
      systemId: ['1', [Validators.required]],
      permissionValue: ['upms:test:page', [Validators.required]],
      uri: ['/test', [Validators.required]],
      icon: ['user'],
      status: ['1', [Validators.required]],
    });
  };

  ngOnInit() {
  }

  createPermission(value) {
    this.permissionService.createPermission(value).subscribe(
      () => {
        for (const key in this.validateForm.controls) {
          this.validateForm.controls[key].markAsDirty();
        }
        this.createMessage("success", "保存成功！");
        this.goBack();
      }
    );
  }

  goBack() {
    // this.location.back();
    this.router.navigateByUrl("/permission/template/page");
  }

  createMessage = (type, text) => {
    this.message.create(type, `${text}`);
  };
}
