import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable }     from 'rxjs';

import { UpmsPermission } from './upms-permission';
import { Page } from '../../common/page';
import { Result } from '../../common/result';

import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {

  permissionUrl = '/up/permission';
  page = '/page';
  
  constructor(private _http: HttpClient) { }

  getPermissionByPage(pageIndex , pageSize , sortField, sortOrder, search): Observable<Result<Page<UpmsPermission>>>{
    let params = new HttpParams()
    .append('page', `${pageIndex}`)
    .append('pageSize', `${pageSize}`)
    .append('sortField', sortField)
    .append('search', search)
    .append('sortOrder', sortOrder);
    return this._http.get<Result<Page<UpmsPermission>>>(`${this.permissionUrl}${this.page}`, {
      params: params
    }).pipe(
      // map(heroes => heroes[0]), // returns a {0|1} element array
      tap(_ => console.log('fetched heroes')),
    );
  }

  getPermissionByPrimaryKey(permissionId: number): Observable<Result<UpmsPermission>> {
    return this._http.get<Result<UpmsPermission>>(`${this.permissionUrl}/${permissionId}`, );
  }

  createPermission(upmsPermission: UpmsPermission): Observable<Result<number>> {
    return this._http.post<Result<number>>(`${this.permissionUrl}`, upmsPermission);
  }

  updatePermission(upmsPermission: UpmsPermission): Observable<Result<number>> {
    return this._http.put<Result<number>>(`${this.permissionUrl}`, upmsPermission);
  }

  deletePermissionByPrimaryKey(id: number) {
    return this._http.delete(`${this.permissionUrl}/${id}`);
  }
}
