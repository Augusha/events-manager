import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEventComponent } from './modal-event.component';

describe('EventModalComponent', () => {
  let component: ModalEventComponent;
  let fixture: ComponentFixture<ModalEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
