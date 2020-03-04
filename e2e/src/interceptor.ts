import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import * as stock from './stock.json';
import { environment } from '../../src/environments/environment';

const { baseUrl } = environment;

let id: number = (stock as any).default.length;

const urls = [
    {
        url: /[baseUrl]$d/,
        json: stock
    },
    {
        url: baseUrl,
        json: stock
    }
];

@Injectable()
export class HttpMockRequestInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const index = request.url.split('/')[4]
        for (const element of urls) {
            if (request.url.match(element.url) && request.method === 'GET') {
                // console.log(element.url, request.url.split('/')[4]);
                return of(new HttpResponse({ status: 200, body: { message: 'ii', data: (stock as any).default[index] || (element.json as any).default || element.json } }));
            } else if (request.url === element.url && request.method === 'POST') {
                const newItem = request.body;
                Object.assign(newItem, { id });
                (stock as any).default.push(newItem);
                id += 1;
                console.log(stock, request.url);
                return of(new HttpResponse({ status: 201, body: { message: 'created', data: (element.json as any).default || element.json } }));
            } else if (request.url.match(element.url) && request.method === 'PUT') {
                const update = JSON.parse(request.body);
                const existing = { ...(stock as any).default[index] };
                console.log(existing, update);
                Object.assign(existing, update);
                console.log(existing);
                (stock as any).default.splice(index, 1, existing);
                // console.log(stock, request.url);
                return of(new HttpResponse({ status: 200, body: { message: 'updated', data: (element.json as any).default || element.json } }));
            } else if (request.url.match(element.url) && request.method === 'DELETE') {
                (stock as any).default.splice(index, 1);
                // console.log(stock, request.url);
                return of(new HttpResponse({ status: 200, body: { message: 'deleted', data: (element.json as any).default || element.json } }));
            }
        }
        console.log('Loaded from http call :' + request.url);
        return next.handle(request);
    }
}

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {       
        console.log('Hollow interceptor' + request.url);
        return next.handle(request);
    }
}