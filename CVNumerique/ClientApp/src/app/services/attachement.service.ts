import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class AttachementService {

  private readonly _uploadUrl: string = 'api/attachment/uploadFile';
  private readonly _deleteUrl: string = 'api/attachment/deleteFile';
  public file: File;

  constructor(private httpClient: HttpClient, private http: Http) { }

  public saveFile(file: File) {
    this.file = file;
  }

  public upload(attachment: any): Observable<any> {
    // create multipart form for file
    let formData: FormData = new FormData();
    formData.append('file', attachment.file, attachment.file.name);
    formData.append('attachmentTypeId', attachment.attachmentTypeId);
   
    const headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');
    return this.httpClient.post(this._uploadUrl, formData, { headers: headers })
      .pipe(map(result => result))
      .pipe(catchError(this.handleError));
  }


  public delete(fileName: string): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('fileName', fileName);
    const headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');
    return this.httpClient.post(this._deleteUrl, formData, { headers: headers })
      .pipe(map(result => result))
      .pipe(catchError(this.handleError));
  }

  //Errors
  private handleError(error: Response) {
    return throwError(error.json().error || 'Opps!! Server error');
  }
}
