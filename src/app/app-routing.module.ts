import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemComponent } from './item/item.component';
import { HomeComponent } from './home/home.component';
import { StockComponent } from './stock/stock.component';
import { CreateStockComponent } from './create-stock/create-stock.component';
import { UpdateItemComponent } from './update-item/update-item.component';
import { DeleteItemComponent } from './delete-item/delete-item.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'stock', component: StockComponent},
  {path: 'stock/create', component: CreateStockComponent},
  {path: 'stock/:id/view', component: ItemComponent},
  {path: 'stock/:id/update', component: UpdateItemComponent},
  {path: 'stock/:id/delete', component: DeleteItemComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
