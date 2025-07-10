import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AccessibilityService } from 'src/app/services/accessibility.service';

@Component({
  selector: 'app-sign-language',
  templateUrl: './sign-language.page.html',
  styleUrls: ['./sign-language.page.scss'],
})
export class SignLanguagePage implements OnInit, OnDestroy {
  @ViewChild('video', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  sentence = '';
  translation = '';
  annotatedImageSrc = '';

  intervalId: any;

  constructor(private accessService: AccessibilityService) {}

  ngOnInit() {
    this.startCamera();
    this.accessService.initSignLanguageSocket();

    this.intervalId = setInterval(() => {
      this.captureAndSendFrame();
      const result = this.accessService.getSignLanguageData();
      this.translation = result.translation;
      this.sentence = result.sentence;
      if (result.annotatedFrame) {
        this.annotatedImageSrc = 'data:image/jpeg;base64,' + result.annotatedFrame;
      }
    }, 200);
  }

  async startCamera() {
    const video = this.videoRef.nativeElement;
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    await video.play();
  }

  captureAndSendFrame() {
    const video = this.videoRef.nativeElement;
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];
    this.accessService.emitSignLanguageFrame(base64Image);
  }

  clearSentence() {
    this.accessService.clearSentence();
    this.sentence = '';
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    const video = this.videoRef.nativeElement;
    const stream = video.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    video.srcObject = null;
  }
}
