import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAmountComponent } from './register-amount.component';

describe('RegisterAmountComponent', () => {
  let component: RegisterAmountComponent;
  let fixture: ComponentFixture<RegisterAmountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterAmountComponent]
    });
    fixture = TestBed.createComponent(RegisterAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
