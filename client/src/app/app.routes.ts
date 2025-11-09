import { Routes } from '@angular/router';
import {Dashboard} from './domains/dashboard/dashboard';
import {Main} from './domains/main/main';

export const routes: Routes = [
  {path: "", component: Main},
  {path: "dashboard", component: Dashboard}];
