import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalImageComponent } from './components/modal-image/modal-image.component';



@NgModule({
  declarations: [
    ModalImageComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [],
  exports: [ModalImageComponent]
})
export class SharedModule { }
