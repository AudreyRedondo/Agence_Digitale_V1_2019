import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Experience } from '../models/experience.model';

@Injectable({
  providedIn: 'root'
})

export class ExperienceService {

  public headers: HttpHeaders;
  private readonly _getUrl: string = '/api/experience/experiences';
  private readonly _getByIdUrl: string = '/api/experience/getByID';
  private readonly _deleteByIdUrl: string = '/api/experience/deleteByID';
  private readonly _saveUrl: string = '/api/experience/save';
  public experiences: Experience[];

  constructor(private _http: Http) { }

  //Get  
  getAll(): Observable<Experience[]> {
    return this._http.get(this._getUrl)
      .pipe(map(res => res.json()))
      .pipe(catchError(this.handleError));
  }

  //Errors
  private handleError(error: Response) {
    return throwError(error.json().error || 'Opps!! Server error');
  }
}
