import { Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Router, ActivatedRoute } from '@angular/router';
import { StartService } from 'src/app/modules/main/services/start.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private socket: Socket;
  userId: string = '';
  room: string | null = '';
  users: any[] = [];
  messages: any[] = [];
  message: string = '';

  constructor(private startService: StartService, private router: Router, private route: ActivatedRoute) {this.socket = io('http://localhost:3001', {
    query: { token: sessionStorage.getItem('token') }
  })}

  ngOnInit(): void {
    //getting userid from query
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
    });

    //creating or joining room
    this.socket.emit('joinRoom', { receiverId: this.userId });

    //get room and users
    this.socket.on('roomData', ({ room, users, messages }) => {
      this.outputRoomName(room);
      this.outputUsers(users);
      const combinedArray = this.messages.concat(messages);
      this.messages = combinedArray;
    });

    //catching messages
    this.socket.on('message', (messageObj) => {
      this.outputMessage(messageObj);
    });

    //catching photos
    this.socket.on('message-photo', (image) => {
      this.messages.push(image);
    });
  }

  onSubmit() {
    //emmiting message to a server
    this.socket.emit('chatMessage', this.message);
    this.message = '';
  }

  //sent request to a service to turn image object into string
  async selectFile(event: any) {
    const stringImg = await this.startService.selectFile(event);
    this.socket.emit('fileMessage', stringImg);
  }

  outputMessage (msg: any) {
    this.messages.push(msg);
  }

  outputRoomName (room: string) {
    this.room = room;
  }

  outputUsers(users: []) {
    this.users = users;
  }
}