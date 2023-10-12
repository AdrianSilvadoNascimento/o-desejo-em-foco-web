import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientInfoTemplateComponent } from './client-form.component';

describe('ClientInfoTemplateComponent', () => {
  let component: ClientInfoTemplateComponent;
  let fixture: ComponentFixture<ClientInfoTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientInfoTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientInfoTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
