import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredAddressComponent } from './registered-address.component';

describe('RegisteredAddressComponent', () => {
  let component: RegisteredAddressComponent;
  let fixture: ComponentFixture<RegisteredAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
