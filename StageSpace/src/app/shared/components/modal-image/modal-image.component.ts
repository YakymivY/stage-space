import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.css']
})

export class ModalImageComponent {

  @Input() modalImage: any;

  constructor() {}


}
