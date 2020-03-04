import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DeleteItemComponent } from './delete-item.component';

describe('DeleteItemComponent', () => {
  let component: DeleteItemComponent;
  let fixture: ComponentFixture<DeleteItemComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ DeleteItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('Should create DeleteItemComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Should display correct page heading', () => {
    expect(compiled.querySelector('h2').textContent).toBe('Delete Item');
  });
});
