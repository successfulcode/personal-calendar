import { Component, Signal, computed } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currenYear: Signal<string> = computed(() => moment().format('YYYY'));
}
