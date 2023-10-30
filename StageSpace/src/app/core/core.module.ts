import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AuthInterceptorProvider } from '../core/interceptors/auth.interceptor';




@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [AuthInterceptorProvider],
  exports: [HeaderComponent]
})
export class CoreModule { }
