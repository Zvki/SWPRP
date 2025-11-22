import { Routes } from '@angular/router';
import {Dashboard} from './domains/dashboard/dashboard';
import {Main} from './domains/main/main';
import {ProjectDetails} from './domains/project-details/project-details';

export const routes: Routes = [
  {path: "", component: Main},
  {path: "dashboard", component: Dashboard},
  {path: "project/:id", component: ProjectDetails}
];
