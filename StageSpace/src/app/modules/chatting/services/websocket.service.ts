import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  
  SERVER_URL = 'ws://localhost:3001';
  wsSubject = webSocket(this.SERVER_URL);

  constructor() { }

  sendMessage(message: any): void {
    this.wsSubject.next(message);
  }

  getMessage(): Observable<any> {
    return this.wsSubject.asObservable();
  }
}
