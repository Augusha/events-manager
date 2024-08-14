import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyVisitorsComponent } from './weekly-visitors.component';

describe('AllUsersVisitorsGridComponent', () => {
  let component: WeeklyVisitorsComponent;
  let fixture: ComponentFixture<WeeklyVisitorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyVisitorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyVisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
