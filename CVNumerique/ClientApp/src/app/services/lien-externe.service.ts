import { Injectable, Component } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

//Model  
import { LienExterne } from '../models/lien-externe.model';

@Injectable()

export class LienExterneService {

  public headers: Headers;
  public _getUrl: string = '/api/lien-externe/liens-externes';
  public _getByIdUrl: string = '/api/lien-externe/getByID';
  public _deleteByIdUrl: string = '/api/lien-externe/deleteByID';
  public _saveUrl: string = '/api/lien-externe/save';

  constructor(private _http: Http) { }

  //Get  
  getall(): Observable<LienExterne[]> {
    return this._http.get(this._getUrl)
      .pipe(map(res => res.json()))
      .pipe(catchError(this.handleError));
  }

  //GetByID  
  getByID(id: string): Observable<LienExterne> {
    var getByIdUrl = this._getByIdUrl + '/' + id;
    return this._http.get(getByIdUrl)
      .pipe(map(res => res.json()))
      .pipe(catchError(this.handleError));
  }

  //Post  
  save(user: LienExterne): Observable<string> {
    let body = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this._saveUrl, body, options)
      .pipe(map(res => res.json().message))
      .pipe(catchError(this.handleError));
  }

  //Delete  
  delete(id: string): Observable<string> {
    var deleteByIdUrl = this._deleteByIdUrl + '/' + id
    return this._http.delete(deleteByIdUrl)
      .pipe(map(response => response.json().message))
      .pipe(catchError(this.handleError));
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Opps!! Server error');
  }
}  
