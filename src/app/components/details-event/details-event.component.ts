import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEvent } from 'app/types/interfaces/ievent.model';

@Component({
  selector: 'app-details-event',
  standalone: true,
  imports: [],
  templateUrl: './details-event.component.html',
  styleUrl: './details-event.component.scss'
})
export class DetailsEventComponent {
  // TODO: Fix any type
  @Input() event: IEvent | any;
  @Output() delete = new EventEmitter<{ id: string, title: string }>();
  
  onDeleteEvent() {
    this.delete.emit({ id: this.event.id, title: this.event.id })
  }
}
