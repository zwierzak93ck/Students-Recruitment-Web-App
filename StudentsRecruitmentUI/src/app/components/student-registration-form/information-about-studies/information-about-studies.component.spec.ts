import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationAboutStudiesComponent } from './information-about-studies.component';

describe('InformationAboutStudiesComponent', () => {
  let component: InformationAboutStudiesComponent;
  let fixture: ComponentFixture<InformationAboutStudiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationAboutStudiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationAboutStudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
