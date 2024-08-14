import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyVisitorsChartComponent } from './weekly-visitors-chart.component';

describe('WeeklyVisitorsComponent', () => {
  let component: WeeklyVisitorsChartComponent;
  let fixture: ComponentFixture<WeeklyVisitorsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyVisitorsChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyVisitorsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
