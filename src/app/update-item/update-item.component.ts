import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Stock } from '../interfaces';

@Component({
  selector: 'app-update-item',
  templateUrl: '../create-stock/create-stock.component.html',
  styleUrls: ['../create-stock/create-stock.component.css']
})
export class UpdateItemComponent implements OnInit {

  id: string = window.location.pathname.split('/').reverse()[1];
  message: string;
  messageClass: string;
  existing = { name: '' };
  submit = this.updateItem;
  action = `Update`;
  @Input() body = {
    name: '', quantity: '', unitPrice: '', image: '',
    id: '', createdAt: null, updatedAt: null
  };
  constructor(private apiService: ApiService) { }
  ngOnInit() {
    this.apiService.getItem(this.id).subscribe((res: any) => {
      if (res.data) {
        this.existing = res.data;
        Object.assign(this.body, this.existing);
      }
    });
  }

  public updateItem() {
    const update: any = {};
    Object.keys(this.body)
    .filter((key) => this.body[key] !== this.existing[key])
    .forEach((key) => update[key] = this.body[key]);
    this.apiService.updateItem(update, this.id)
      .subscribe((resp) => {
        [this.message, this.messageClass] = resp
          ? [resp.message, 'success']
          : ['An error occured, please try again', 'error'];
      });
  }

}
