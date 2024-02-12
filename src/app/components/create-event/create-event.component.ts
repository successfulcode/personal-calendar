import { Component, EventEmitter, Output, signal, Input, SimpleChanges } from '@angular/core';

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

import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { IEvent } from 'app/types/interfaces/ievent.model';
import { EventTypes } from 'app/types/enums/event-types.enum';
import { generateTimeSlots } from 'app/utils/time-slots';
import { Subscription } from 'rxjs';

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
    MatSelectModule, MatButtonModule, MatIconModule, MomentDateModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss'
})
export class CreateEventComponent {
  @Input() newEventDate: string | undefined;
  @Output() addEvent = new EventEmitter<IEvent>();
  @Output() cancelEvent = new EventEmitter<void>();

  matcher = new MyErrorStateMatcher();

  minDate = signal(moment());

  eventTypes = signal([
    {type: EventTypes.MEETING, name: 'Meeting'},
    {type: EventTypes.CALL, name:'Call'},
    {type: EventTypes.OUT_OF_OFFICE, name: 'Out of office'}
  ]);

  startTimeSlots = signal(['']);
  endTimeSlots = signal(['']);
  startTimeChangeSubscription: Subscription | undefined;

  ngOnInit() {
    this._setInitialStartTime();

    this._setStartTimeSubscription();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes['newEventDate']) {
      const dateControl = this.newEventForm.get('date');

      if (!dateControl) {
        return;
      }

      if (moment(this.newEventDate).isSameOrAfter(moment(), 'day')) {
        dateControl.setValue(moment(this.newEventDate).format('YYYY-MM-DD'));
      } else {
        dateControl.setValue(moment().format('YYYY-MM-DD'));
      }
    }
  }

  ngOnDestroy() {
    if (!this.startTimeChangeSubscription) {
      return;
    }

    this.startTimeChangeSubscription.unsubscribe();
  }

  newEventForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    date: new FormControl(moment().format('YYYY-MM-DD'), [Validators.required]),
    start: new FormControl('', [Validators.required]),
    end: new FormControl('', [Validators.required]),
    type: new FormControl(this.eventTypes()[0].type, [Validators.required]),
    description: new FormControl('', [Validators.maxLength(500)])
  });

  _setInitialStartTime() {
    const timeSlots = generateTimeSlots();
    this.startTimeSlots.set(timeSlots);

    const initialTimeIndex = this.findCurrentTimeIndex(this.startTimeSlots()),
      selectedIndex = (initialTimeIndex + 1) <= timeSlots.length ? initialTimeIndex : 0;

    this.newEventForm.get('start')?.setValue(this.startTimeSlots()[selectedIndex]);
  }

  _setStartTimeSubscription() {
    this.startTimeChangeSubscription = this.newEventForm.get('start')?.valueChanges.subscribe(value => {
      const endTimeSlots = generateTimeSlots(value || '00:00');

      this.endTimeSlots.set(endTimeSlots.length ? endTimeSlots : ['24:00']);
      const endTimeIndex = endTimeSlots.length > 1 ? 1 : 0;

      const endTime = this.newEventForm.get('end')?.value,
        endTimePlus5Min = moment(endTime, 'HH:mm').subtract(5, 'minutes').format('HH:mm'),
        isEndTimeAfter = moment(endTimePlus5Min, 'HH:mm').isAfter(moment(value, 'HH:mm'));

      if (!endTime || !isEndTimeAfter) {
        this.newEventForm.get('end')?.setValue(this.endTimeSlots()[endTimeIndex]);
      }
    });

    this.newEventForm.get('start')?.updateValueAndValidity();
  }

  findCurrentTimeIndex(timeOptions:string[]) {
    const currentTime = moment(),
      currentIndex = timeOptions.findIndex(time => moment(time, 'HH:mm').isSameOrAfter(currentTime, 'minute'));
  
    return currentIndex;
  };

  getIsoStringTime(time: string) {
    const [hours, minutes] = time.split(':').map(Number),
      combinedDateTime = moment(this.newEventForm.value.date).set({ hour: hours, minute: minutes });

    return moment(combinedDateTime).toISOString();
  }

  onSubmit() {
    const newEvent = {
      id: uuidv4(),
      title: this.newEventForm?.value?.title || '',
      start: this.getIsoStringTime(this.newEventForm?.value?.start || ''),
      end: this.getIsoStringTime(this.newEventForm?.value?.end || ''),
      type: this.newEventForm?.value?.type,
      description: this.newEventForm?.value?.description
    } as IEvent;

    this.addEvent.emit(newEvent as IEvent);
    this.onCancel();
  }

  onCancel() {    
    this.cancelEvent.emit();
  }
}
