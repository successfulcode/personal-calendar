import { Component, EventEmitter, Output, signal } from '@angular/core';

import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup
} from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { IEvent } from 'app/types/interfaces/ievent.model';
import { EventTypes } from 'app/types/enums/event-types.enum';

import moment from 'moment';

const CLOCK_COLOR = '#673ab7';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-event',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDatepickerModule, 
    MatSelectModule, NgxMaterialTimepickerModule, MatButtonModule, MatIconModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss'
})
export class CreateEventComponent {

  @Output() addEvent = new EventEmitter<IEvent>();

  clockTheme = signal({
    container: { buttonColor: CLOCK_COLOR },
    dial: { dialBackgroundColor: CLOCK_COLOR,},
    clockFace: { clockHandColor: CLOCK_COLOR }
  });

  eventTypes = signal([
    {type: EventTypes.MEETING, name: 'Meeting'},
    {type: EventTypes.CALL, name:'Call'},
    {type: EventTypes.OUT_OF_OFFICE, name: 'Out of office'}
  ]);

  newEventForm = new FormGroup({
    titleFormControl: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    date: new FormControl('', [Validators.required]),
    start: new FormControl('', [Validators.required]),
    end: new FormControl('', [Validators.required]),
    eventType: new FormControl(this.eventTypes.length > 0 ? this.eventTypes()[0].type : '', [Validators.required]),
    description: new FormControl('', Validators.maxLength(500))
  });

  matcher = new MyErrorStateMatcher();

  onAddEvent() {
    const newEvent = {
      id: 'newEvent1',
      title: 'newEvent1',
      date: '2024-02-11T00:00:00.000Z',
      start: '2024-02-11T00:00:00.000Z',
      end: '2024-02-11T00:00:00.000Z',
      type: 'MEETING',
      description: 'description'
    }

    this.addEvent.emit(newEvent as IEvent);
  }
}
