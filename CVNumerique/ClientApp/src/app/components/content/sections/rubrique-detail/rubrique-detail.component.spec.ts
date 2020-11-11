import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubriqueDetailComponent } from './rubrique-detail.component';

describe('RubriqueDetailComponent', () => {
  let component: RubriqueDetailComponent;
  let fixture: ComponentFixture<RubriqueDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubriqueDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubriqueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
