import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthInterceptorProvider } from '../core/interceptors/auth.interceptor';
import { ModalImageComponent } from './components/modal-image/modal-image.component';



@NgModule({
  declarations: [
    ModalImageComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [AuthInterceptorProvider],
  exports: [ModalImageComponent]
})
export class SharedModule { }
