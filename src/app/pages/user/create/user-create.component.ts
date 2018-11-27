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

import { UserService } from '../../../service/service.module';
import { User } from '../../../service/user/user';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class CreateComponent implements OnInit {

  permissionId: number;
  entity: User;

  sex: any = [
    { "value": 1, "name": "男"},
    { "value": 0, "name": "女" },
  ]
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
    private service: UserService,
    private router: Router,
    private location: Location,
    private message: NzMessageService
    ) {
    this.validateForm = this.fb.group({
      username: ['1', [Validators.required], [this.nameAsyncValidator]],
      realname: ['1', [Validators.required]],
      avatar: ['1', [Validators.required]],
      phone: ['1', [Validators.required]],
      email: ['111@up.com', [Validators.required]],
      sex: ['', [Validators.required]],
      locked: [''],
      password: ['123456', [Validators.required]],
    });
  };

  ngOnInit() {
  }

  createPermission(value) {
    this.service.create(value).subscribe(
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
    this.router.navigateByUrl("/user/template/page");
  }

  createMessage = (type, text) => {
    this.message.create(type, `${text}`);
  };
}
