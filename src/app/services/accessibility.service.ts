import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {

  private socket: Socket;
  private readonly accessibilityUrl = environment.accessibility_url;

  constructor(private http: HttpClient) {
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

    // ======= HTTP REST for Scene Description =======

   describeScene(base64Image: string): Observable<any> {
  const blob = this.base64ToBlob(base64Image, 'image/jpeg');
  const formData = new FormData();
  formData.append('image', blob, 'capture.jpg');

  return this.http.post(`${this.accessibilityUrl}/image_processing`, formData);
}

private base64ToBlob(base64: string, contentType: string): Blob {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
}

detectColors(base64Image: string, numColors: number): Observable<any> {
  const blob = this.base64ToBlob(base64Image, 'image/jpeg');
  const formData = new FormData();
  formData.append('image', blob, 'colors.jpg');
  formData.append('num_colors', numColors.toString());

  return this.http.post(`${this.accessibilityUrl}/color-detection`, formData);
}

}
