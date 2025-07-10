import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:5000');

    this.socket.on('connect', () => {
      console.log('Connected to Object Detection backend');
    });

    this.socket.on('disconnect', () => {
      console.warn('Disconnected from backend');
    });
  }

  
connectSocket() {
  if (!this.socket || this.socket.disconnected) {
    this.socket = io('http://localhost:5000'); 
  }
} 
  getSocket(): Socket {
    return this.socket;
  }

  sendFrame(base64Image: string) {
    if (this.socket?.connected) {
      this.socket.emit('object_detection', { image: base64Image });
    }
  }

  disconnectSocket() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
