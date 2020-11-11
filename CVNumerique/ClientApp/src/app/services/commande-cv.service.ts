import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { Response } from '@angular/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CommandeCV } from '../models/commande-cv.model';
import { CustomEncoder } from '../functions/requests';

@Injectable({
  providedIn: 'root'
})

export class CommandeCvService {

  private headers: HttpHeaders;
  private formData: FormData;
  private readonly _saveOrderResumeUrl: string = 'api/order/saveOrderResume';

  constructor(private _httpClient: HttpClient, private _http: Http) { }

  //Post  
  saveOrderResume(form: CommandeCV): Observable<any> {
 
    this.headers = new HttpHeaders({ 'Content-Disposition': 'multipart/form-data' });
    this.formData = new FormData();
    this.formData.append('firstName', form.firstName);
    this.formData.append('lastName', form.lastName);
    this.formData.append('date', form.date.toUTCString());
    this.formData.append('job', form.job);
    this.formData.append('company', form.company);
    this.formData.append('details', form.details);
    this.formData.append('email', form.email);
    this.formData.append('phone', form.phone);
    this.formData.append('serviceId', form.serviceId.toString());
    this.formData.append('token', form.token);
    this.formData.append('resume', form.resume);
    this.formData.append('intentId', form.intentId);
    this.formData.append('amount', form.amount);

    return this._httpClient.post(this._saveOrderResumeUrl, this.formData,
      { headers: this.headers, params: new HttpParams({ encoder: new CustomEncoder() }) })
      .pipe(map(res => res ))
      .pipe(catchError(this.handleError));
  }

    //Errors
    private handleError(error: Response) {
        return throwError(error.json().error || 'Opps!! Server error');
    }
}

