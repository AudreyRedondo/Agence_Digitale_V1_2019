import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubriqueDetailHeaderComponent } from './rubrique-detail-header.component';

describe('RubriqueDetailHeaderComponent', () => {
  let component: RubriqueDetailHeaderComponent;
  let fixture: ComponentFixture<RubriqueDetailHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubriqueDetailHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubriqueDetailHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
