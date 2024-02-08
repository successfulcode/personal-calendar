import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CalendarComponent } from 'app/components/calendar/calendar.component';
import { CreateEventComponent } from 'app/components/create-event/create-event.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatButtonModule, CalendarComponent, CreateEventComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
