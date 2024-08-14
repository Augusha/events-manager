import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyVisitorsStats } from './weekly-visitors-stats';

describe('UserCardsComponent', () => {
  let component: WeeklyVisitorsStats;
  let fixture: ComponentFixture<WeeklyVisitorsStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyVisitorsStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyVisitorsStats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
