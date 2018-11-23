import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCandidateAccountComponent } from './create-candidate-account.component';

describe('CreateCandidateAccountComponent', () => {
  let component: CreateCandidateAccountComponent;
  let fixture: ComponentFixture<CreateCandidateAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCandidateAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCandidateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
