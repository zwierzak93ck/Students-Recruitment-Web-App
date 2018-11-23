import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCandidatesTableComponent } from './show-candidates-table.component';

describe('ShowCandidatesTableComponent', () => {
  let component: ShowCandidatesTableComponent;
  let fixture: ComponentFixture<ShowCandidatesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCandidatesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCandidatesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
