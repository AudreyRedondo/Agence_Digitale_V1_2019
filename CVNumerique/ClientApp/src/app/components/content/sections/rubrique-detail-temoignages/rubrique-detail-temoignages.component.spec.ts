import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubriqueDetailTemoignagesComponent } from './rubrique-detail-temoignages.component';

describe('RubriqueDetailTemoignagesComponent', () => {
  let component: RubriqueDetailTemoignagesComponent;
  let fixture: ComponentFixture<RubriqueDetailTemoignagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubriqueDetailTemoignagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubriqueDetailTemoignagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
