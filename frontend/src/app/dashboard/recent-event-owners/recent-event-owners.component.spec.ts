import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentEventOwnersComponent } from './recent-event-owners.component';

describe('RecentEventOwnersComponent', () => {
  let component: RecentEventOwnersComponent;
  let fixture: ComponentFixture<RecentEventOwnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentEventOwnersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentEventOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
