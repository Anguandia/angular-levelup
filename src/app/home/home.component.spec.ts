import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('Should create HomeComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Should render two tabs on home page', () => {
    expect(compiled.querySelector('.card-container').children.length).toBe(2);
  });

  it('Should render all stock tab as first tab', () => {
    expect(compiled.querySelector('.card-container').firstChild.innerHTML).toContain('All stock');
  });

  it('Should render add stock tab as last tab', () => {
    expect(compiled.querySelector('.card-container').lastChild.innerHTML).toContain('Add stock');
  });
});
