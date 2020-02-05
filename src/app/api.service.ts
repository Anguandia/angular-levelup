import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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

  public getItem(id) {
    return this.httpClient.get(baseUrl + id);
  }

  public getStock(): Observable<HttpResponse<Response>> {
    return this.httpClient.get<Response>(
      baseUrl, { observe: 'response' }
    );
  }

  public createItem(body: Stock): Observable<any> {
    return this.httpClient.post<Stock>(
      baseUrl,
      body,
      this.httpOptions
    ).pipe(
      catchError(this.handleError())
    );
  }

  public updateItem(body, id): Observable<any> {
    return this.httpClient.put(
      baseUrl + id,
      JSON.stringify(body),
      this.httpOptions
    ).pipe(
      catchError(this.handleError())
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
      console.error(error);
      this.log(error.error.error);
      return of(result as ErrorResponse);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
