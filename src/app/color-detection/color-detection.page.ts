import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AccessibilityService } from 'src/app/services/accessibility.service';

@Component({
  selector: 'app-color-detection',
  templateUrl: './color-detection.page.html',
  styleUrls: ['./color-detection.page.scss'],
})
export class ColorDetectionPage implements OnInit {
  @ViewChild('video', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  detectedColors: { name: string; hex: string }[] = [];
  capturedImage: string | null = null;
  isAnalyzing = false;
  muted = false;
  numColors = 5; // Default user selection

  constructor(private accessService: AccessibilityService) {}

  ngOnInit() {
    this.startCamera();
  }

  handleScreenClick(event: Event) {
  const target = event.target as HTMLElement;

  // Prevent detection when interacting with ion-select or ion-item
  if (
    target.closest('ion-select') ||
    target.closest('ion-item') ||
    target.tagName === 'ION-SELECT-OPTION'
  ) {
    return;
  }

  this.captureAndDetect();
}

  async startCamera() {
    const video = this.videoRef.nativeElement;
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    video.srcObject = stream;
    await video.play();
  }

  async captureAndDetect() {
    const video = this.videoRef.nativeElement;
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];
    this.capturedImage = canvas.toDataURL('image/jpeg');
    this.isAnalyzing = true;

    this.accessService.detectColors(base64Image, this.numColors).subscribe(
      (res) => {
        this.detectedColors = res.colors?.slice(0, this.numColors) || [];
        this.isAnalyzing = false;

        if (!this.muted && this.detectedColors.length > 0) {
          const names = this.detectedColors.map(c => c.name).join(', ');
          this.speak(`Top colors are: ${names}`);
        }
      },
      (err) => {
        console.error('Color detection failed:', err);
        this.detectedColors = [];
        this.isAnalyzing = false;
      }
    );
  }

 toggleMute(event: Event) {
  event.stopPropagation();
  this.muted = !this.muted;
  window.speechSynthesis.cancel();
}


  speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  ionViewWillLeave() {
    const video = this.videoRef.nativeElement;
    const stream = video.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    video.srcObject = null;
    window.speechSynthesis.cancel();
  }
}
