import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubriquesComponent } from './rubriques.component';

describe('RubriquesComponent', () => {
  let component: RubriquesComponent;
  let fixture: ComponentFixture<RubriquesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubriquesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubriquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
