import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubriqueDetailRealisationsComponent } from './rubrique-detail-realisations.component';

describe('RubriqueDetailRealisationsComponent', () => {
  let component: RubriqueDetailRealisationsComponent;
  let fixture: ComponentFixture<RubriqueDetailRealisationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubriqueDetailRealisationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubriqueDetailRealisationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
