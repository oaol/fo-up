import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  menusSecond: any[];
  echartsMenus: any[] = [
    {
      path: './page', name: '权限管理', icon: ''
    },
    {
      path: './page', name: '角色权限管理', icon: ''
    },

  ];
  constructor() { }

  ngOnInit() {
    this.menusSecond = [
      { path: '', name: '权限管理', icon: '', menuThird: this.echartsMenus },
      // {path: '', name: 'markdown', icon: '', menuThird: [
      //   {
      //   path: './markdown', name: 'sample', icon: ''
      //   },

      // ]}
    ]
  }

}
