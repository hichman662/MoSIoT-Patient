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
    this.socket = io('http://localhost:5000'); // Use the appropriate URL

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
      this.socket = io(this.accessibilityUrl); // Use the appropriate URL
    }
  }

  getSocket(): Socket {
    return this.socket;
  }

  disconnectSocket() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  // =================== Object Detection ===================
  sendFrame(base64Image: string) {
    if (this.socket?.connected) {
      this.socket.emit('object_detection', { image: base64Image });
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

  // =================== Text Reader ===================


readTextFromImage(dataUrl: string): Observable<any> {
  const blob = this.dataUrlToBlob(dataUrl, 'image/jpeg'); // Convert the full Data URL to Blob
  const formData = new FormData();
  formData.append('image', blob, 'text.jpg');  // Append the Blob to FormData
  return this.http.post(`${this.accessibilityUrl}/text_reader/`, formData); // Post to the backend
}

// Helper function to convert Data URL to Blob
private dataUrlToBlob(dataUrl: string, contentType: string): Blob {
  const base64Data = dataUrl.split(',')[1];  // Extract raw base64 string from the Data URL
  const byteCharacters = atob(base64Data);  // Decode base64 to byte characters
  const byteNumbers = new Array(byteCharacters.length);
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);  // Convert each character to its char code
  }

  return new Blob([new Uint8Array(byteNumbers)], { type: contentType });  // Create Blob from byte array
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
    return this.http.post<any>(`${this.accessibilityUrl}/chatbot/`, { prompt });
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
