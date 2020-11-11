import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  private headers: HttpHeaders;
  private readonly _getUrl: string = 'api/service/services';
  private readonly _getCompaniesUrl: string = 'api/service/services-entreprises';
  private readonly _getParticularsUrl: string = 'api/service/services-particuliers';
  private readonly _getByIdUrl: string = 'api/service/getServiceByID';
  private readonly _deleteByIdUrl: string = 'api/service/deleteServiceByID';
  private readonly _saveUrl: string = 'api/service/saveService';
  public service: Service;

  constructor(private _http: Http) { }

  //Get  
  getAll(): Observable<Service[]> {
    return this._http.get(this._getUrl)
      .pipe(map(res => res.json()))
      .pipe(catchError(this.handleError));
  }

  //Get  
  getCompanies(): Observable<Service[]> {
      return this._http.get(this._getCompaniesUrl)
          .pipe(map(res => res.json()))
          .pipe(catchError(this.handleError));
  }

  //Get  
  getParticulars(): Observable<Service[]> {
      return this._http.get(this._getParticularsUrl)
          .pipe(map(res => res.json()))
          .pipe(catchError(this.handleError));
  }

  //GetByID  
  getByID(id: string): Observable<Service> {
    var getByIdUrl = this._getByIdUrl + '/' + id;
    return this._http.get(getByIdUrl)
      .pipe(map(res => res.json()))
      .pipe(catchError(this.handleError));
  }

  //Errors
  private handleError(error: Response) {
    return throwError(error.json().error || 'Opps!! Server error');
  }
}
