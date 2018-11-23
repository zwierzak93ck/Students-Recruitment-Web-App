import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterHomeScreenComponent } from './recruiter-home-screen.component';

describe('RecruiterHomeScreenComponent', () => {
  let component: RecruiterHomeScreenComponent;
  let fixture: ComponentFixture<RecruiterHomeScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterHomeScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterHomeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
