import { Component, EventEmitter, Output, signal, computed, Signal } from '@angular/core';

import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup
} from '@angular/forms';

import { ErrorStateMatcher, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MomentDateModule } from '@angular/material-moment-adapter';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { IEvent } from 'app/types/interfaces/ievent.model';
import { EventTypes } from 'app/types/enums/event-types.enum';

const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
},
INITIAL_MIN_GAP = 15;

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
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDatepickerModule, 
    MatSelectModule, NgxMaterialTimepickerModule, MatButtonModule, MatIconModule, MomentDateModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss'
})
export class CreateEventComponent {

  @Output() addEvent = new EventEmitter<IEvent>();
  
  minDate = signal(moment())

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

  initialStartTime: Signal<string> = computed(() => moment().format('HH:mm'));
  initialEndTime: Signal<string> = computed(() => {
    const initialTime = moment(this.newEventForm?.value?.start).add(INITIAL_MIN_GAP, 'minutes');
    return moment(initialTime).format('HH:mm');
  });
  minEndTime: Signal<string> = computed(() => this.newEventForm?.value?.start || moment().format('HH:mm'));

  matcher = new MyErrorStateMatcher();

  newEventForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    date: new FormControl(moment(), [Validators.required]),
    start: new FormControl(this.initialStartTime(), [Validators.required]),
    end: new FormControl(this.initialEndTime(), [Validators.required]),
    type: new FormControl(this.eventTypes()[0].type, [Validators.required]),
    description: new FormControl('', Validators.maxLength(500))
  });

  getIsoStringTime(time: string) {
    const [hours, minutes] = time.split(':').map(Number),
      combinedDateTime = moment(this.newEventForm.value.date).set({ hour: hours, minute: minutes });

    return moment(combinedDateTime).toISOString();
  }

  onAddEvent() {
    const newEvent = {
      id: uuidv4(),
      title: this.newEventForm?.value?.title || '',
      date: this.getIsoStringTime(this.newEventForm?.value?.start || ''),
      start: this.getIsoStringTime(this.newEventForm?.value?.start || ''),
      end: this.getIsoStringTime(this.newEventForm?.value?.end || ''),
      type: this.newEventForm?.value?.type,
      description: this.newEventForm?.value?.description
    } as IEvent;

    console.log('newEvent', newEvent)

    this.addEvent.emit(newEvent as IEvent);
  }
}
