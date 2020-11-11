import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubriqueDetailFormationComponent } from './rubrique-detail-formation.component';

describe('RubriqueDetailFormationComponent', () => {
  let component: RubriqueDetailFormationComponent;
  let fixture: ComponentFixture<RubriqueDetailFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubriqueDetailFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubriqueDetailFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
