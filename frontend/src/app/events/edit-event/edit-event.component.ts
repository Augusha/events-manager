import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {EventService} from "../event.service";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatNativeDateModule} from "@angular/material/core";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {HeaderService} from "../../header/header.service";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatDatepickerToggle,
    MatNativeDateModule,
    MatDatepicker,
    MatInput,
    MatDatepickerInput,
    MatButton,
    MatLabel,
    MatGridList,
    MatGridTile,
    NgForOf,
    MatHint,
    RouterLink,
    MatIcon,
    TranslateModule,
    NgIf,
    MatIconButton,
    MatError
  ],
  templateUrl: './edit-event.component.html',
  styleUrls: ['../../dashboard/total-cards/total-cards.component.css', './edit-event.component.css']
})
export class EditEventComponent implements OnInit{
  eventForm: FormGroup;

  breakpoint: number = 0;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private headerService: HeaderService,
    private route: ActivatedRoute,
    private router: Router) {
    this.eventForm = this.fb.group({
      id: [0],
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      cost: [0, Validators.required],
      moreInfo: [''],
      category: [''],
      categories: ['', Validators.required],
      label: [''],
      labels: ['', Validators.required],
      location: ['', Validators.required],
      address: ['', Validators.required],
      organizer: ['', Validators.required],
      icon: [''],
      limit: [0, Validators.required]
    });

  this.headerService.setHeaderTitle('events');
  }

  editEvent() {
    if (this.eventForm.valid) {
      const newEvent = this.eventForm.value;
      this.eventService.updateEvent(newEvent);
    }
  }

  ngOnInit() {
    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    if (eventId) {
      this.fetchEvent(eventId);
    }
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 2;
  }

  fetchEvent(id: number) {
    this.eventService.getEventById(id)
      .subscribe({
        next: (response: any) => {
          this.eventForm.patchValue(response.event);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  addCategory() {
    const category = this.eventForm.get('category')?.value;
    if (category) {
      const categories = this.eventForm.get('categories')?.value;
      this.eventForm.get('categories')?.setValue(categories ? categories + '/' + category : category);
      this.eventForm.get('category')?.reset();
    }
    console.log(this.eventForm.get('categories')?.value);
  }

  getCategoriesArray(): string[] {
    const categories = this.eventForm.get('categories')?.value;
    return categories ? categories.split('/') : [];
  }

  deleteCategory(index: number) {
    const categories = this.getCategoriesArray();
    categories.splice(index, 1);
    this.eventForm.get('categories')?.setValue(categories.join('/'));
  }

  addLabel() {
    const label = this.eventForm.get('label')?.value;
    if (label) {
      const labels = this.eventForm.get('labels')?.value;
      this.eventForm.get('labels')?.setValue(labels ? labels + '/' + label : label);
      this.eventForm.get('label')?.reset();
    }
    console.log(this.eventForm.get('labels')?.value);
  }

  getLabelsArray(): string[] {
    const categories = this.eventForm.get('labels')?.value;
    return categories ? categories.split('/') : [];
  }

  deleteLabel(index: number) {
    const categories = this.getLabelsArray();
    categories.splice(index, 1);
    this.eventForm.get('labels')?.setValue(categories.join('/'));
  }

  onResize(event: any) {
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 2;
  }
}
