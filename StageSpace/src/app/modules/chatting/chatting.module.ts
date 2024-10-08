import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EnterComponent } from './components/enter/enter.component';
import { ChatComponent } from './components/chat/chat.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChattingRoutingModule } from './chatting-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    ChatComponent,
    EnterComponent
  ],
  imports: [
    CommonModule,
    ChattingRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    CoreModule
  ]
})
export class ChattingModule { }
