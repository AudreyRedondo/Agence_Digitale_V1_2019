import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Realisation } from '../models/realisation.model';

@Injectable({
  providedIn: 'root'
})

export class RealisationService {

  private headers: HttpHeaders;
  private readonly _getUrl: string = 'api/production/productions';
  private readonly _getTypesProductionUrl: string = 'api/production/productionTypes';
  private readonly _getByIdUrl: string = 'api/production/getProductionByID';
  private readonly _deleteByIdUrl: string = 'api/production/deleteProductionByID';
  private readonly _saveUrl: string = 'api/production/saveProduction';

  constructor(private _http: Http) { }

  //Get  
  getAll(): Observable<Realisation[]> {
    return this._http.get(this._getUrl)
      .pipe(map(res => res.json()))
      .pipe(catchError(this.handleError));
  }

  //GetByID  
  getByID(id: string): Observable<Realisation> {
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
