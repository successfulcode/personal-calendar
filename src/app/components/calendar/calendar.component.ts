import { Component, signal } from '@angular/core';

import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

import { EventTypes } from 'app/types/enums/EventTypes';
import { IEvent } from 'app/types/interfaces/ievent';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  calendarOptions = signal<CalendarOptions>({
    plugins: [interactionPlugin, dayGridPlugin],
    initialView: 'dayGridMonth',

    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    firstDay: 1,

    events: [
      { 
        id: 'id',
        title: 'title',
        date: 'date',
        start: new Date(),
        end: new Date(),
        type: EventTypes.MEETING,
        description: 'test'
      } as IEvent
    ],

    select: this.selectDate.bind(this),
    eventClick: this.selectEvent.bind(this)
  });

  selectDate() {
    console.log('selectDate');
  }

  selectEvent() {
    console.log('selectEvent');
  }
}