import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBillingAddressComponent } from './form-billing-address.component';

describe('FormBillingAddressComponent', () => {
  let component: FormBillingAddressComponent;
  let fixture: ComponentFixture<FormBillingAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBillingAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBillingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
