import { Injectable, Component } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

//Model  
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  public headers: Headers;
  public _getUrl: string = '/api/contact/contacts';
  public _getByIdUrl: string = '/api/contact/getByID';
  public _deleteByIdUrl: string = '/api/contact/deleteByID';
  public _saveUrl: string = '/api/contact/save';

  constructor(private _http: Http) { }

  //Get  
  getAll(): Observable<Contact[]> {
    return this._http.get(this._getUrl)
      .pipe(map(res => res.json()))
      .pipe(catchError(this.handleError));
  }

  //GetByID  
  getByID(id: string): Observable<Contact> {
    var getByIdUrl = this._getByIdUrl + '/' + id;
    return this._http.get(getByIdUrl)
      .pipe(map(res => res.json()))
      .pipe(catchError(this.handleError));
  }

  //Post  
  save(contact: Contact): Observable<string> {
    let body = JSON.stringify(contact);
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
