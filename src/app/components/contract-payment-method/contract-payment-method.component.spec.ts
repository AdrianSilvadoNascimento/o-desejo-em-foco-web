import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPaymentMethodComponent } from './contract-payment-method.component';

describe('ContractPaymentMethodComponent', () => {
  let component: ContractPaymentMethodComponent;
  let fixture: ComponentFixture<ContractPaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractPaymentMethodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
