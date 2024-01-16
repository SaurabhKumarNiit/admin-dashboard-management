import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCustomerDetailsComponent } from './display-customer-details.component';

describe('DisplayCustomerDetailsComponent', () => {
  let component: DisplayCustomerDetailsComponent;
  let fixture: ComponentFixture<DisplayCustomerDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayCustomerDetailsComponent]
    });
    fixture = TestBed.createComponent(DisplayCustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
