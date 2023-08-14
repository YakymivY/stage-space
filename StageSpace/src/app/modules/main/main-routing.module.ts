import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StartComponent } from './components/start/start.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: "start", component: StartComponent },
  { path: "profile/:id", component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
