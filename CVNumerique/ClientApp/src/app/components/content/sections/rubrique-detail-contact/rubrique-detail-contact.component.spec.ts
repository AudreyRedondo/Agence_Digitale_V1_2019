import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubriqueDetailContactComponent } from './rubrique-detail-contact.component';

describe('RubriqueDetailContactComponent', () => {
  let component: RubriqueDetailContactComponent;
  let fixture: ComponentFixture<RubriqueDetailContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubriqueDetailContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubriqueDetailContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
