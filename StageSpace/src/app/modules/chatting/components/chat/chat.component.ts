import { WebsocketService } from './../../services/websocket.service';
import { Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Router, ActivatedRoute } from '@angular/router';

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

  imageSRC: any;

  constructor(private webSocketService: WebsocketService, private router: Router, private route: ActivatedRoute) {this.socket = io('http://localhost:3001', {
    query: { token: sessionStorage.getItem('token') }
  })}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
    });
    this.room = localStorage.getItem('room');

    //this.socket.emit('joinRoom', {room: this.room});
    this.socket.emit('joinRoom', { receiverId: this.userId });

    //get room and users
    this.socket.on('roomUsers', ({ room, users }) => {
      this.outputRoomName(room);
      this.outputUsers(users);
    });

    this.socket.on('message', (messageObj) => {
      this.outputMessage(messageObj);
    });

    this.socket.on('message-photo', (messageObj) => {
      //const blob = new Blob([messageObj.photo.body], { type: messageObj.photo.type });
      this.outputPhoto(messageObj);
      //this.displayImage(blob);
    });
  }

  onSubmit() {
    //emmiting message to a server
    this.socket.emit('chatMessage', this.message);
    this.message = '';
  }

  selectFile(event: any) {
    const photo = event.target.files[0];
    this.socket.emit('fileMessage', {
      type: 'file',
      body: photo,
      mimeType: photo.type,
      fileName: photo.name
    });
  }

  // displayImage(file: any): void {
  //   const reader = new FileReader();
  //   reader.onload = (event: any) => {
  //     const imgURL = event.target.result;
  //     this.imageSRC = imgURL;
  //   };
  //   reader.readAsDataURL(file);
  // }

  leaveRoom () {
    this.socket.disconnect();
    this.router.navigate(['enter']);
  }

  outputMessage (msg: any) {
    this.messages.push(msg);
  }

  outputPhoto (msg: any) {
    const blob = new Blob([msg.photo.body], { type: msg.photo.type });
    //displayImage method
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const imgURL = event.target.result;
      msg.message.imageSRC = imgURL;
    };
    reader.readAsDataURL(blob);
    //
    this.messages.push(msg.message);
  }

  outputRoomName (room: string) {
    this.room = room;
  }

  outputUsers(users: []) {
    this.users = users;
  }
}