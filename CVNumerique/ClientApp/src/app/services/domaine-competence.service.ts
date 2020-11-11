import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DomaineCompetence } from '../models/domaine-competence.model';

@Injectable({
    providedIn: 'root'
})

export class DomaineCompetenceService {

    public headers: HttpHeaders;
    private readonly _getUrl: string = '/api/competence/competences';
    private readonly _getByIdUrl: string = '/api/competence/getByID';
    private readonly _deleteByIdUrl: string = '/api/competence/deleteByID';
    private readonly _saveUrl: string = '/api/competence/save';
    public competences: DomaineCompetence[];

    constructor(private _http: Http) { }

    //Get  
    getAll(): Observable<DomaineCompetence[]> {
        return this._http.get(this._getUrl)
            .pipe(map(res => res.json()))
            .pipe(catchError(this.handleError));
    }

    //Errors
    private handleError(error: Response) {
        return throwError(error.json().error || 'Opps!! Server error');
    }
}
