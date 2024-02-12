import { Component, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { BehaviorSubject, switchMap } from 'rxjs';

import { Store } from '@ngrx/store';
import { selectEventById } from 'app/store/calendar-events.selectors';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CalendarComponent } from 'app/components/calendar/calendar.component';
import { ConfirmationDialogComponent } from 'app/components/confirmation-dialog/confirmation-dialog.component';
import { CreateEventComponent } from 'app/components/create-event/create-event.component';
import { DetailsEventComponent } from 'app/components/details-event/details-event.component';

import { IEvent } from 'app/types/interfaces/ievent.model';
import { EventActions } from 'app/types/enums/event-actions.enum';
import moment from 'moment';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CalendarComponent, CreateEventComponent, DetailsEventComponent, 
    ConfirmationDialogComponent, MatIconModule, MatButtonModule, AsyncPipe],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(public dialog: MatDialog, private readonly store: Store) {}

  newEventDate = signal<string>('');

  selectedEventId$ = new BehaviorSubject<string | null>(null);
  selectedEvent$ = this.selectedEventId$.pipe(
    switchMap(id => this.store.select(selectEventById(id)))
  );

  openNewEvent(date: string = moment().format('YYYY-MM-DD')) {
    this.newEventDate.set(date);
    this.selectedEventId$.next(null);
  }

  cancelNewEvent() {
    this.newEventDate.set('');
  }

  selectDate(date: string) {
    this.openNewEvent(date);
  }

  selectEvent(id: string) {
    if (!id) {
      return;
    }

    this.cancelNewEvent();
    this.selectedEventId$.next(id);
  }

  openConfirmation({id, title}: {id: string, title: string}) {
    this.dialog.open(ConfirmationDialogComponent, {
      data: { id, title, confirm: () => this.deleteEvent(id) }
    });
  }

  deleteEvent(id: string) {
    this.store.dispatch({ type: EventActions.DELETE_EVENT, id });

    this.selectedEventId$.next(null);
    this.dialog.closeAll();
  }

  addEvent(newEvent: IEvent) {
    this.store.dispatch({ type: EventActions.CREATE_EVENT, newEvent });
  }
}
