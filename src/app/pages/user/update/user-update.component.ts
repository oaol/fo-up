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

import { UserService } from '../../../service/service.module';
import { User } from '../../../service/user/user';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UpdateComponent implements OnInit {

  id: number;
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

  constructor(private fb: FormBuilder,
    private service: UserService,
    private router: Router,
    private location: Location,
    private message: NzMessageService,
    private activatedRoute: ActivatedRoute,
    ) {
    this.validateForm = this.fb.group({
      userId: [this.id, [Validators.required]],
      username: ['', [Validators.required], [this.nameAsyncValidator]],
      realname: ['', [Validators.required]],
      password: ['', [Validators.required]],
      avatar: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      locked: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  };

  ngOnInit() {
    this.activatedRoute.paramMap
    .subscribe(
      paramsMap => {
        this.id = + paramsMap.get('id');
        this.getEntityById(this.id);
      }
    );
  }

  submitForm = ($event, value) => {
    $event.preventDefault();
    $event.stopPropagation();
    this.update(value);
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

  update(value) {
    this.service.update(value).subscribe(
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

  getEntityById(id: number) {
    this.service.getEntityByPrimaryKey(id).subscribe(
      data => {
        this.entity = data.results;
        for (const key in this.validateForm.controls) {
          this.validateForm.controls[key].setValue(this.entity[key]);
        }
      }
    );
  }

  goBack() {
    this.router.navigateByUrl("/user/template/page");
  }

  createMessage = (type, text) => {
    this.message.create(type, `${text}`);
  };

}
