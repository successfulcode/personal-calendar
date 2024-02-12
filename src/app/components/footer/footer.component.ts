import { Component, Signal, computed } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currenYear: Signal<number> = computed(() => new Date().getFullYear());
}
