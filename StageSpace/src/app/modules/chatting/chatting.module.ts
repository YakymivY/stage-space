import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StartComponent } from '../main/components/start/start.component';
import { EnterComponent } from './components/enter/enter.component';
import { ChatComponent } from './components/chat/chat.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChattingRoutingModule } from './chatting-routing.module';


@NgModule({
  declarations: [
    ChatComponent,
    EnterComponent
  ],
  imports: [
    CommonModule,
    ChattingRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class ChattingModule { }
