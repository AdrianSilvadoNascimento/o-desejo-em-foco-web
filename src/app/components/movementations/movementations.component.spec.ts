import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementationsComponent } from './movementations.component';

describe('MovementationsComponent', () => {
  let component: MovementationsComponent;
  let fixture: ComponentFixture<MovementationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovementationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
