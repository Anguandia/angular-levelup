import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { UpdateItemComponent } from './update-item.component';

describe('UpdateItemComponent', () => {
  let component: UpdateItemComponent;
  let fixture: ComponentFixture<UpdateItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateItemComponent],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create UpdateItemComponent', () => {
    expect(component).toBeTruthy();
  });
});
