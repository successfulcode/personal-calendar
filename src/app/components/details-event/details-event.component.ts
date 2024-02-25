import { EventTypes } from 'app/types/enums/event-types.enum';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { IEvent } from 'app/types/interfaces/ievent.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';

const meetingTitles = {
  [EventTypes.MEETING]: 'Meeting',
  [EventTypes.CALL]: 'Call',
  [EventTypes.OUT_OF_OFFICE]: 'Out of office',
  NONE: ''
}

@Component({
  selector: 'app-details-event',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, DatePipe],
  templateUrl: './details-event.component.html',
  styleUrl: './details-event.component.scss'
})
export class DetailsEventComponent {
  @Input() event: IEvent | undefined | null;
  @Output() delete = new EventEmitter<{ id: string, title: string }>();
  @Output() close = new EventEmitter<void>();

  onDeleteEvent() {
    this.delete.emit({ id: this.event?.id || '', title: this.event?.title ?? '' });
  }

  titles = signal(meetingTitles);

  onClose() {
    this.close.emit();
  }
}
