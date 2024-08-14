import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveEventsStatisticsComponent } from './active-events-statistics.component';

describe('ActiveEventsStatisticsComponent', () => {
  let component: ActiveEventsStatisticsComponent;
  let fixture: ComponentFixture<ActiveEventsStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveEventsStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveEventsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
