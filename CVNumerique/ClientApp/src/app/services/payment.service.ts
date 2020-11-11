import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, from, of, Subject } from 'rxjs';
import {catchError, tap } from 'rxjs/operators';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})

export class PaymentService {

  private readonly _getClientSecret: string = 'api/payment/getClientSecret';
  paymentSubject = new Subject<any>();

  constructor(private _http: HttpClient) { }

  emitPaymentSubject() {
    this.paymentSubject.next(true);
  }

  //Get 
  getClientSecret(amount: number): Observable<{}> {
    const queryParams: HttpParams = UtilsService.buildQueryParams({ amount: amount });
    return this._http.get(this._getClientSecret, { params: queryParams })
      .pipe(
        tap(response => response),
        catchError(this.handleError('GetClientSecret', {}))
      );
  }

  //Post
  handleCardPayment(promise: any): Observable<any> {
    return from(promise)
      .pipe(
        tap(res => res),
        catchError(this.handleError('handleCardPayment', {}))
      );
  }

  //Errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}

