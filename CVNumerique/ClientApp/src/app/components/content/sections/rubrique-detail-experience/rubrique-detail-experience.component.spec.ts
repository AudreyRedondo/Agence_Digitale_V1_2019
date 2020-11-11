import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubriqueDetailExperienceComponent } from './rubrique-detail-experience.component';

describe('RubriqueDetailExperienceComponent', () => {
  let component: RubriqueDetailExperienceComponent;
  let fixture: ComponentFixture<RubriqueDetailExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubriqueDetailExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubriqueDetailExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
