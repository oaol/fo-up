import { Component, OnInit } from '@angular/core';
// import { Menu } from "../../../menu";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // menu: Menu = new Menu();

  menus: Object[] = [
    { path: '/index', name: '首页' },
    { path: '/permission', name: '权限管理' },
    { path: '/user', name: '用户管理' },
    { path: '/permission', name: '角色管理' },
    { path: '/permission', name: '组织管理' },
    { path: '/permission', name: '系统管理' },
  ];
  constructor() { }

  ngOnInit() {
  }
}
