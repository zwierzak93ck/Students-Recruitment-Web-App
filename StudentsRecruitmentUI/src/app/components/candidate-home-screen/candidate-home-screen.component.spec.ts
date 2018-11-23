import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateHomeScreenComponent } from './candidate-home-screen.component';

describe('CandidateHomeScreenComponent', () => {
  let component: CandidateHomeScreenComponent;
  let fixture: ComponentFixture<CandidateHomeScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateHomeScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateHomeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
