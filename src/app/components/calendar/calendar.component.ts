import { Component, EventEmitter, Output, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';

import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

import { IEvent } from 'app/types/interfaces/ievent.model';
import { Observable } from 'rxjs';
import { selectFullCalendarEvents } from '../../store/calendar-events.selectors';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [AsyncPipe, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  @Output() selectDate = new EventEmitter<string>();
  @Output() selectEvent = new EventEmitter<string>();

  constructor(private store: Store<{events: readonly IEvent[]}>) {}
  
  events$: Observable<EventInput[]> = this.store.select(selectFullCalendarEvents);

  calendarOptions = signal<CalendarOptions>({
    plugins: [interactionPlugin, dayGridPlugin],
    initialView: 'dayGridMonth',

    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    firstDay: 1,

    select: this.onSelectDate.bind(this),
    eventClick: this.onSelectEvent.bind(this)
  });

  onSelectDate(info: { startStr: string }) {
    this.selectDate.emit(info.startStr);
  }

  onSelectEvent(info: EventClickArg) {
    this.selectEvent.emit(info.event.id);
  }
}