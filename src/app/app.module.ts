import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { StockComponent } from './stock/stock.component';
import { CreateStockComponent } from './create-stock/create-stock.component';
import { UpdateItemComponent } from './update-item/update-item.component';
import { DeleteItemComponent } from './delete-item/delete-item.component';
import { HomeComponent } from './home/home.component';
import { HttpMockRequestInterceptor, HttpRequestInterceptor } from '../../e2e/src/interceptor';

import { environment } from '../environments/environment';

export const isMock = environment.mock;

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    StockComponent,
    CreateStockComponent,
    UpdateItemComponent,
    DeleteItemComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: isMock ? HttpMockRequestInterceptor: HttpRequestInterceptor,
    multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
