import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoItemTemplateComponent } from './info-item-template.component';

describe('InfoItemTemplateComponent', () => {
  let component: InfoItemTemplateComponent;
  let fixture: ComponentFixture<InfoItemTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoItemTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoItemTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
