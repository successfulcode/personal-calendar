import { Component, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { BehaviorSubject, switchMap } from 'rxjs';

import { Store } from '@ngrx/store';
import { selectEventById } from 'app/store/calendar-events.selectors';

import { MatDialog } from '@angular/material/dialog';

import { CalendarComponent } from 'app/components/calendar/calendar.component';
import { ConfirmationDialogComponent } from 'app/components/confirmation-dialog/confirmation-dialog.component';
import { CreateEventComponent } from 'app/components/create-event/create-event.component';
import { DetailsEventComponent } from 'app/components/details-event/details-event.component';

import { IEvent } from 'app/types/interfaces/ievent.model';
import { EventActions } from 'app/types/enums/event-actions.enum';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CalendarComponent, CreateEventComponent, DetailsEventComponent, ConfirmationDialogComponent, AsyncPipe],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(public dialog: MatDialog, private readonly store: Store) {}

  isNewEvent = signal<boolean>(false);

  selectedEventId$ = new BehaviorSubject<string | null>(null);
  selectedEvent$ = this.selectedEventId$.pipe(
    switchMap(id => this.store.select(selectEventById(id)))
  );

  openNewEvent() {
    this.isNewEvent.set(true);
    this.selectedEventId$.next(null);
  }

  selectDate() {
    this.openNewEvent();
  }

  selectEvent(id: string) {
    if (!id) {
      return;
    }

    this.isNewEvent.set(false);
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
