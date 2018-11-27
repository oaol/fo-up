import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { NzMessageService } from 'ng-zorro-antd';

import { PermissionService } from '../../../service/service.module';
import { UpmsPermission } from '../../../service/permission/upms-permission';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

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

  constructor(private fb: FormBuilder,
    private permissionService: PermissionService,
    private router: Router,
    private location: Location,
    private message: NzMessageService,
    private activatedRoute: ActivatedRoute,
    ) {
    this.validateForm = this.fb.group({
      permissionId: [this.permissionId, [Validators.required]],
      name: ['', [Validators.required], [this.nameAsyncValidator]],
      pid: ['', [Validators.required]],
      type: ['', [Validators.required]],
      systemId: ['', [Validators.required]],
      permissionValue: ['', [Validators.required]],
      uri: ['', [Validators.required]],
      icon: [''],
      status: ['', [Validators.required]],
    });
  };

  ngOnInit() {
    this.activatedRoute.paramMap
    .subscribe(
      paramsMap => {
        this.permissionId = + paramsMap.get('permissionId');
        this.getPermissionById(this.permissionId);
      }
    );
  }

  submitForm = ($event, value) => {
    $event.preventDefault();
    $event.stopPropagation();
    this.updatePermission(value);
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

  updatePermission(value) {
    this.permissionService.updatePermission(value).subscribe(
      () => {
        for (const key in this.validateForm.controls) {
          this.validateForm.controls[key].markAsDirty();
          this.validateForm.controls[key].setValue(11);
        }
        this.createMessage("success", "保存成功！");
        this.goBack();
      }
    );
  }

  getPermissionById(permissionId: number) {
    this.permissionService.getPermissionByPrimaryKey(permissionId).subscribe(
      data => {
        this.upmsPermission = data.results;
        for (const key in this.validateForm.controls) {
          this.validateForm.controls[key].setValue(this.upmsPermission[key]);
        }
      }
    );
  }

  goBack() {
    this.router.navigateByUrl("/permission/template/page");
  }

  createMessage = (type, text) => {
    this.message.create(type, `${text}`);
  };

}
