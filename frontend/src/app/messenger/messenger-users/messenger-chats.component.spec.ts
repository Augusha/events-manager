import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerChatsComponent } from './messenger-chats.component';

describe('MessengerUsersComponent', () => {
  let component: MessengerChatsComponent;
  let fixture: ComponentFixture<MessengerChatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessengerChatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessengerChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
