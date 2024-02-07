import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixViewComponent } from './pix-view.component';

describe('PixViewComponent', () => {
  let component: PixViewComponent;
  let fixture: ComponentFixture<PixViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PixViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PixViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
