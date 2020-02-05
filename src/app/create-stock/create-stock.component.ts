import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']
})
export class CreateStockComponent implements OnInit {

  message: string;
  messageClass = 'success';
  submit = this.createItem;
  action = 'Add';

  @Input() body = {
    name: '', unitPrice: '', quantity: null, image: '',
    id: '', createdAt: null, updatedAt: null
  };

  constructor(private apiService: ApiService) { }

  ngOnInit() { }

  createItem() {
    this.apiService.createItem(this.body)
      .subscribe((created: any) => {
        [this.message, this.messageClass] = created
          ? [created.message, 'success']
          : ['An error occured, please try again', 'error'];
      });
  }

}
