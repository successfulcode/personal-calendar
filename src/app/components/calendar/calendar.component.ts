import { Component, signal } from '@angular/core';

import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

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
      { title: 'Meeting', start: new Date() },
      { title: 'Meeting2', start: new Date() },
      { title: 'Meeting2', start: new Date() }
    ],

    select: this.selectDate.bind(this),
    eventClick: this.selectEvent.bind(this)
  });

  selectDate() {
    console.log('selectDate')
  }

  selectEvent() {
    console.log('selectEvent')
  }
}