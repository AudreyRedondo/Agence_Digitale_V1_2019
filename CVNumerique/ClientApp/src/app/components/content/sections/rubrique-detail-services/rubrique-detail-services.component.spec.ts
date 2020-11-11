import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubriqueDetailServicesComponent } from './rubrique-detail-services.component';

describe('RubriqueDetailServicesComponent', () => {
  let component: RubriqueDetailServicesComponent;
  let fixture: ComponentFixture<RubriqueDetailServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubriqueDetailServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubriqueDetailServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
