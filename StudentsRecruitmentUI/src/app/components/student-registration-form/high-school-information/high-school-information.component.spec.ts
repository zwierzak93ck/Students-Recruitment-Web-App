import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighSchoolInformationComponent } from './high-school-information.component';

describe('HighSchoolInformationComponent', () => {
  let component: HighSchoolInformationComponent;
  let fixture: ComponentFixture<HighSchoolInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighSchoolInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighSchoolInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
