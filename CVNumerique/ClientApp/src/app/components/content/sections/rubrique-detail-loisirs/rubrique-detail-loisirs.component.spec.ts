import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubriqueDetailLoisirsComponent } from './rubrique-detail-loisirs.component';

describe('RubriqueDetailLoisirsComponent', () => {
  let component: RubriqueDetailLoisirsComponent;
  let fixture: ComponentFixture<RubriqueDetailLoisirsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubriqueDetailLoisirsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubriqueDetailLoisirsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
