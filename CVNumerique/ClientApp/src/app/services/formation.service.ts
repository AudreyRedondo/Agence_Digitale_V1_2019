import { Injectable } from '@angular/core';
import { Formation } from '../models/formation.model';
import { Http, Response } from '@angular/http';
import { HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class FormationService {

    public headers: HttpHeaders;
    private readonly _getUrlTraining: string = '/api/formation/formations';
    private readonly _getUrlCertification: string = '/api/formation/certifications';
    private readonly _getByIdUrl: string = '/api/formation/getByID';
    private readonly _deleteByIdUrl: string = '/api/formation/deleteByID';
    private readonly _saveUrl: string = '/api/formation/save';
    public formations: Formation[];

    constructor(private _http: Http) { }

    //Get  
    getAllTraining(): Observable<Formation[]> {
        return this._http.get(this._getUrlTraining)
            .pipe(map(res => res.json()))
            .pipe(catchError(this.handleError));
    }

    //Get  
    getAllCertifications(): Observable<Formation[]> {
        return this._http.get(this._getUrlCertification)
            .pipe(map(res => res.json()))
            .pipe(catchError(this.handleError));
    }

    //Errors
    private handleError(error: Response) {
        return throwError(error.json().error || 'Opps!! Server error');
    }
}
