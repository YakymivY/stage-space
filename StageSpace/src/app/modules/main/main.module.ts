import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { StartComponent } from './components/start/start.component';
import { CoreModule } from 'src/app/core/core.module';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    StartComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    CoreModule
  ]
})
export class MainModule { }
