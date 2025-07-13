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
  private sentence = '';
  private annotatedFrameBase64 = '';
  private translation = '';
  private signSocketInitialized = false;
  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:5000');

    this.socket.on('connect', () => {
      console.log('Connected to Object Detection backend');
    });

    this.socket.on('disconnect', () => {
      console.warn('Disconnected from backend');
    });
  }

  // =================== Socket Setup ===================

connectSocket() {
  if (!this.socket || this.socket.disconnected) {
    this.socket = io(this.accessibilityUrl);

    this.socket.on('connect', () => {
      console.log('Reconnected to backend');
    });

    this.socket.on('disconnect', () => {
      console.warn('Socket disconnected');
    });
  }
}

  getSocket(): Socket {
    return this.socket;
  }
  
// =================== Object Detection ===================

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

// =================== Scene Description ===================

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

// =================== Color Detection ===================

detectColors(base64Image: string, numColors: number): Observable<any> {
  const blob = this.base64ToBlob(base64Image, 'image/jpeg');
  const formData = new FormData();
  formData.append('image', blob, 'colors.jpg');
  formData.append('num_colors', numColors.toString());

  return this.http.post(`${this.accessibilityUrl}/color-detection`, formData);
}


// =================== Chat AI ===================
chatWithAI(prompt: string): Observable<any> {
  const body = { prompt };
  return this.http.post<any>(`${this.accessibilityUrl}/chatbot/`, body);
}


// =================== Sign Language ===================
initSignLanguageSocket() {
  if (this.signSocketInitialized) return;

  this.socket.on('translation_result', (data) => {
    if (!data) return;
    this.translation = data.translation;
    this.sentence = data.sentence;
    this.annotatedFrameBase64 = data.annotated_frame;
  });

  this.signSocketInitialized = true;
}


emitSignLanguageFrame(base64Image: string) {
  this.socket.emit('sign_language', { image: base64Image });
}

clearSentence() {
  this.sentence = '';
  this.socket.emit('clear_sentence');
}

getSignLanguageData() {
  return {
    sentence: this.sentence,
    translation: this.translation,
    annotatedFrame: this.annotatedFrameBase64
  };
}


}
