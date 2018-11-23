import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCandidateDataComponent } from './edit-candidate-data.component';

describe('EditCandidateDataComponent', () => {
  let component: EditCandidateDataComponent;
  let fixture: ComponentFixture<EditCandidateDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCandidateDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCandidateDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
