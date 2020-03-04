import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { CreateStockComponent } from './create-stock.component';

describe('CreateStockComponent', () => {
  let component: CreateStockComponent;
  let fixture: ComponentFixture<CreateStockComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule],
      declarations: [ CreateStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('Should create the CreateStockComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Should have action Add', () => {
    expect(component.action).toBe('Add');
  });

  it('Should render heading Add Item', () => {
    expect(compiled.querySelector('h2').textContent).toContain('Add item');
  });

  it('Should render only save button', () => {
    expect(compiled.querySelector('.buttons').children.length).toEqual(1);
    expect(compiled.querySelector('.buttons').children[0].innerHTML).toBe('Save');
  });
});
