import { EnterComponent } from './components/enter/enter.component';
import { ChatComponent } from './components/chat/chat.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "chat/:userId", component: ChatComponent },
  { path: "enter", component: EnterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChattingRoutingModule { }
