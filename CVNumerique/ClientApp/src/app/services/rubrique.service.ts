import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Rubrique } from '../models/rubrique.model';

@Injectable({
  providedIn: 'root'
})

export class RubriqueService {

  public headers: Headers;
  public _getUrl: string = '/api/rubrique/rubriques';
  public _getContentHomeUrl: string = '/api/rubrique/rubriques-home';
  public _getContentCVUrl: string = '/api/rubrique/rubriques-cv';
  public _getByIdUrl: string = '/api/rubrique/getByID';
  public _deleteByIdUrl: string = '/api/rubrique/deleteByID';
  public _saveUrl: string = '/api/rubriques/save';
  private rubriques: Observable<Rubrique[]>;
  private rubrique: Observable<Rubrique>;

  constructor(private _http: Http) { }

  //Get  
  getAll(): Observable<Rubrique[]> {
    return this._http.get(this._getUrl)
      .pipe(map(res => res.json()))
      .pipe(catchError(this.handleError));
  }

  //GetByID  
  getByID(id: string): Observable<Rubrique> {
    var getByIdUrl = this._getByIdUrl + '/' + id;
    return this._http.get(getByIdUrl)
      .pipe(map(res => res.json()))
      .pipe(catchError(this.handleError));
  }

  //Get  
  getContentHome(): Observable<Rubrique[]> {
    return this._http.get(this._getContentHomeUrl)
      .pipe(map(res => res.json()))
      .pipe(catchError(this.handleError));
  }

  //Get  
  getContentCV(): Observable<Rubrique[]> {
      return this._http.get(this._getContentCVUrl)
          .pipe(map(res => res.json()))
          .pipe(catchError(this.handleError));
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Opps!! Server error');
  }
}  
