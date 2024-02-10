import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { CalendarComponent } from 'app/components/calendar/calendar.component';
import { ConfirmationDialogComponent } from 'app/components/confirmation-dialog/confirmation-dialog.component';
import { CreateEventComponent } from 'app/components/create-event/create-event.component';
import { DetailsEventComponent } from 'app/components/details-event/details-event.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CalendarComponent, CreateEventComponent, DetailsEventComponent, ConfirmationDialogComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(public dialog: MatDialog) {}

  openConfirmation() {
    this.dialog.open(ConfirmationDialogComponent, {
      data: { id: 'eventId', title: 'title' }
    });
  }
}
