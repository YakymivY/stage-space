import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    MyProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    CoreModule
  ]
})
export class ProfileModule { }
