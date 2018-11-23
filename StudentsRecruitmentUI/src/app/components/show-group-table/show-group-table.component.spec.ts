import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGroupTableComponent } from './show-group-table.component';

describe('ShowGroupTableComponent', () => {
  let component: ShowGroupTableComponent;
  let fixture: ComponentFixture<ShowGroupTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowGroupTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowGroupTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
