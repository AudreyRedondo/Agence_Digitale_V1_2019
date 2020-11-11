import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRealisationComponent } from './modal-realisation.component';

describe('ModalRealisationComponent', () => {
  let component: ModalRealisationComponent;
  let fixture: ComponentFixture<ModalRealisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRealisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRealisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
