import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable }     from 'rxjs';

import { User } from './user';
import { Page } from '../../common/page';
import { Result } from '../../common/result';

import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  url = '/up/user';
  page = '/page';
  
  constructor(private _http: HttpClient) { }

  getEntityByPage(pageIndex , pageSize , sortField, sortOrder, search): Observable<Result<Page<User>>>{
    let params = new HttpParams()
    .append('page', `${pageIndex}`)
    .append('pageSize', `${pageSize}`)
    .append('sortField', sortField)
    .append('search', search)
    .append('sortOrder', sortOrder);
    return this._http.get<Result<Page<User>>>(`${this.url}${this.page}`, {
      params: params
    }).pipe(
      // map(heroes => heroes[0]), // returns a {0|1} element array
      tap(_ => console.log('fetched heroes')),
    );
  }

  getEntityByPrimaryKey(id: number): Observable<Result<User>> {
    return this._http.get<Result<User>>(`${this.url}/${id}`, );
  }

  create(upmsPermission: User): Observable<Result<number>> {
    return this._http.post<Result<number>>(`${this.url}`, upmsPermission);
  }

  update(upmsPermission: User): Observable<Result<number>> {
    return this._http.put<Result<number>>(`${this.url}`, upmsPermission);
  }

  deleteByPrimaryKey(id: number) {
    return this._http.delete(`${this.url}/${id}`);
  }
}
