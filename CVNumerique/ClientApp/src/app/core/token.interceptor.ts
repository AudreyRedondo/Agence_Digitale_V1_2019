// Import de nos classes
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, map, catchError } from "rxjs/internal/operators";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
declare var url: HttpResponse<any> ;

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    //if (token) {
    //  request = request.clone({
    //    setHeaders: {
    //      'Authorization': 'Bearer ' + token
    //    }
    //  });
    //}
    //if (!request.headers.has('Content-Type')) {
    //  request = request.clone({
    //    setHeaders: {
    //      'content-type': 'application/json'
    //    }
    //  });
    //}
    //request = request.clone({
    //  headers: request.headers.set('Accept', 'application/json')
    //});

    //let requestClone = request.clone(
    //  {
    //    body: encodeURI(request.body),
    //    responseType: 'text'
    //  }
    //)
    return next.handle(request).pipe(map(event => {
      if (event instanceof HttpResponse) {
        //let decodedData = decodeURI(event.body);
        //event = event.clone({
        //  body: decodedData
        //});
        return event;
      }
    },
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      if (error.status === 401) {
        this.router.navigate(['presentation']);
      }
      if (error.status === 400) {
        alert(error.error);
      }
      return throwError(error);
    })));
  }
}
