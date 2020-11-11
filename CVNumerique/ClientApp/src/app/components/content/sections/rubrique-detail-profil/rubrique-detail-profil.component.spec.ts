import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubriqueDetailProfilComponent } from './rubrique-detail-profil.component';

describe('RubriqueDetailProfilComponent', () => {
  let component: RubriqueDetailProfilComponent;
  let fixture: ComponentFixture<RubriqueDetailProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubriqueDetailProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubriqueDetailProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
