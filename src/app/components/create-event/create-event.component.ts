import { Component, EventEmitter, Output } from '@angular/core';
import { IEvent } from 'app/types/interfaces/ievent.model';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss'
})
export class CreateEventComponent {

  @Output() addEvent = new EventEmitter<IEvent>();

  onAddEvent() {
    const newEvent = {
      id: 'newEventnewEventnewEventnewEventnewEvent',
      title: 'newEventnewEventnewEventnewEventnewEvent',
      date: '2024-02-11T00:00:00.000Z',
      start: '2024-02-11T00:00:00.000Z',
      end: '2024-02-11T00:00:00.000Z',
      type: 'MEETING',
      description: 'description'
    }

    this.addEvent.emit(newEvent as IEvent);
  }
}
