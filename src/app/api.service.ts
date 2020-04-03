import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Stock, ErrorResponse } from './interfaces';
import { environment } from '../environments/environment';

const { baseUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  public getItem(id): Observable<HttpResponse<Response>>{
    return this.httpClient.get<Response>(
      baseUrl + id, { observe: 'response' }
    );
  }

  public getStock(): Observable<HttpResponse<Response>> {
    return this.httpClient.get<Response>(
      baseUrl, { observe: 'response' }
    );
  }

  public createItem(body: Stock, base = baseUrl): Observable<HttpResponse<Response>> {
    return this.httpClient.post<any>(
      base,
      body,
      this.httpOptions
    ).pipe(
      this.throw() as any
    );
  }

  public persistOffLineData(offLineData: Stock[]) {
    offLineData.forEach((item) => {
      delete item.id;
      this.createItem(item, 'https://localhost:90000/stock/')
    });
  }

  public updateItem(body, id): Observable<any> {
    return this.httpClient.put(
      baseUrl + id,
      JSON.stringify(body),
      this.httpOptions
    ).pipe(
      this.throw() as any
    );
  }

  public deleteItem(id): Observable<any> {
    return this.httpClient.delete(
      baseUrl + id,
      this.httpOptions
    );
  }

  private handleError<T>(result?: ErrorResponse) {
    return (error: any): Observable<ErrorResponse> => {
      console.error(error.error.message);
      this.log(error.error.message);
      return of(result as ErrorResponse);
    };
  }

  private throw() {
    return catchError((error) => {
      this.log(Object.values(error.error)[0] as string);
      return throwError(error);
    });
  }

  private log(message: string) {
    console.log(message);
  }
}
