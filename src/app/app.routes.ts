import { Routes } from '@angular/router';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { MainComponent } from './views/main/main.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: '**', component: NotFoundComponent }
];
