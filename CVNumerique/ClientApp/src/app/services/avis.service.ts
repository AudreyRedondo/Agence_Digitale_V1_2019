import { Injectable, Component } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Avis } from '../models/avis.model';
import { Select2OptionData } from 'ng-select2';

@Injectable({
  providedIn: 'root'
})

export class AvisService {

  private headers: HttpHeaders;
  private readonly _getUrl: string = 'api/comment/comments';
  private readonly _getTypesConnaissanceUrl: string = 'api/comment/acquaintanceTypes';
  private readonly _getByIdUrl: string = 'api/comment/getCommentByID';
  private readonly _deleteByIdUrl: string = 'api/comment/deleteCommentByID';
  private readonly _saveUrl: string = 'api/comment/saveComment';

  constructor(private _http: Http) { }
  
  //Get  
  getAll(): Observable<Avis[]> {
    return this._http.get(this._getUrl)
      .pipe(map(res => res.json()))
      .pipe(catchError(this.handleError));
  }

  //Get  
  getTypesConnaissance(): Observable<Select2OptionData[]> {
    return this._http.get(this._getTypesConnaissanceUrl)
      .pipe(map(res => res.json()))
      .pipe(catchError(this.handleError));
  }

  //Post  
  save(vm: Avis): Observable<string> {
    let body = JSON.stringify(vm);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this._saveUrl, body, options)
      .pipe(map(res => res.json().message))
      .pipe(catchError(this.handleError));
  }

  //Errors
  private handleError(error: Response) {
    return throwError(error.json().error || 'Opps!! Server error');
  }
}
