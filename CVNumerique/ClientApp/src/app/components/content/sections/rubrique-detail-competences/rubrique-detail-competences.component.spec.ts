import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubriqueDetailCompetencesComponent } from './rubrique-detail-competences.component';

describe('RubriqueDetailCompetencesComponent', () => {
  let component: RubriqueDetailCompetencesComponent;
  let fixture: ComponentFixture<RubriqueDetailCompetencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubriqueDetailCompetencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubriqueDetailCompetencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
