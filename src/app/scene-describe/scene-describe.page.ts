import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AccessibilityService } from 'src/app/services/accessibility.service';

@Component({
  selector: 'app-scene-describe',
  templateUrl: './scene-describe.page.html',
  styleUrls: ['./scene-describe.page.scss'],
})
export class SceneDescribePage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('video', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  capturedImage: string | null = null;
  description: string = '';
  isAnalyzing = false;

  private waitingAudio = new Audio('assets/sound/wait.mp3');
  private stream: MediaStream | null = null;
  private requestSub: Subscription | null = null;
  private ttsUtterance: SpeechSynthesisUtterance | null = null;

  constructor(private accessService: AccessibilityService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this.stream = stream;
        this.videoRef.nativeElement.srcObject = stream;
      })
      .catch((err) => console.error('Camera error:', err));
  }

  captureImage() {
    if (this.isAnalyzing) {
      this.stopProcess(); // Cancel if already analyzing
      return;
    }

    this.isAnalyzing = true;
    this.description = '';
    this.capturedImage = '';

    const video = this.videoRef.nativeElement;
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    this.capturedImage = canvas.toDataURL('image/jpeg');

    const base64Image = this.capturedImage.split(',')[1];

    // Start sound loop
    this.waitingAudio.loop = true;
    this.waitingAudio.play().catch(() => {});

    // Cancel previous request if exists
    if (this.requestSub) {
      this.requestSub.unsubscribe();
    }

    // Send image to backend
    this.requestSub = this.accessService.describeScene(base64Image).subscribe({
      next: (res) => {
        if (!this.isAnalyzing) return;
        this.description = res.description || 'No description available.';
        this.readDescription(this.description);
        this.stopWaiting();
      },
      error: () => {
        if (!this.isAnalyzing) return;
        this.description = 'Error getting description.';
        this.stopWaiting();
      }
    });
  }

  stopWaiting() {
    this.isAnalyzing = false;
    this.waitingAudio.pause();
    this.waitingAudio.currentTime = 0;
  }

  stopProcess() {
    this.stopWaiting();
    this.description = '';
    this.capturedImage = '';
    speechSynthesis.cancel(); // stop reading
    if (this.requestSub) {
      this.requestSub.unsubscribe();
      this.requestSub = null;
    }
  }

  readDescription(text: string) {
    this.ttsUtterance = new SpeechSynthesisUtterance(text);
    this.ttsUtterance.lang = 'en-US'; //  'es-ES' for Spanish
    this.ttsUtterance.rate = 1; // Normal speed
    speechSynthesis.speak(this.ttsUtterance);
  }

  ngOnDestroy() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
    this.stopProcess();
  }
}
