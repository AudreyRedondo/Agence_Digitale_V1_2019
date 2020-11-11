import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPurchaseCvComponent } from './modal-purchase-cv.component';

describe('ModalPurchaseCvComponent', () => {
  let component: ModalPurchaseCvComponent;
  let fixture: ComponentFixture<ModalPurchaseCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPurchaseCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPurchaseCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
