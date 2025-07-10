import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AccessibilityService } from 'src/app/services/accessibility.service';

@Component({
  selector: 'app-object-detection',
  templateUrl: './object-detection.page.html',
  styleUrls: ['./object-detection.page.scss'],
})
export class ObjectDetectionPage implements OnInit, OnDestroy {
  @ViewChild('video', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  objectListText: string = '';
  distanceLineText: string = '';
  muted: boolean = false;
  isDetecting: boolean = false;
  distanceThreshold: number = 0.5;

  private intervalId: any;
  private lastSpokenText: string = '';
  private lastSpokenTime: number = 0;

  constructor(public accessService: AccessibilityService) {}

  ngOnInit() {
    this.accessService.connectSocket();
    this.subscribeToDetections();
  }

  ionViewWillEnter() {
    this.accessService.connectSocket();
    this.subscribeToDetections();
  }

  ionViewWillLeave() {
    this.stopDetection();
  }

  async toggleDetection(event?: any) {
    // Prevent toggle if user clicked mute button
    if (event && (event.target as HTMLElement).closest('.mute-button')) {
      return;
    }

    if (this.isDetecting) {
      this.stopDetection();
    } else {
      await this.startDetection();
    }
  }

  async startDetection() {
    const video = this.videoRef.nativeElement;
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    video.srcObject = stream;
    await video.play();

    this.isDetecting = true;

    this.intervalId = setInterval(() => {
      if (!ctx || video.readyState < 2) return;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const frame = canvas.toDataURL('image/jpeg').split(',')[1];
      this.accessService.sendFrame(frame);
    }, 1000);
  }

  stopDetection() {
    clearInterval(this.intervalId);
    this.isDetecting = false;

    const video = this.videoRef.nativeElement;
    const stream = video.srcObject as MediaStream;
    if (stream) stream.getTracks().forEach(track => track.stop());
    video.srcObject = null;

    this.objectListText = '';
    this.distanceLineText = '';
    this.lastSpokenText = '';
    window.speechSynthesis.cancel();
  }

  subscribeToDetections() {
    this.accessService.getSocket().on('detection_result', data => {
      if (!data?.detections) {
        this.objectListText = 'No detections.';
        this.distanceLineText = '';
        return;
      }

      const detections = data.detections;
      this.objectListText = detections.map(d => `${d.label}: ${d.distance.toFixed(2)}m`).join('\n');

      const hazardObjects = detections.filter(d => d.distance < this.distanceThreshold);
      const hazardText = hazardObjects.map(d => `the ${d.label} is too close`).join(', ');

      const normalObjects = [...new Set(detections.map(d => d.label))].sort().join(', ');

      this.distanceLineText = detections.map(d =>
        d.distance < this.distanceThreshold
          ? `${d.label}: ${d.distance.toFixed(2)}m (TOO CLOSE!)`
          : `${d.label}: ${d.distance.toFixed(2)}m`
      ).join(' | ');

      const ctx = this.canvasRef.nativeElement.getContext('2d');
      const canvas = this.canvasRef.nativeElement;

      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '18px Arial';
        ctx.lineWidth = 2;

        detections.forEach(det => {
          const [x1, y1, x2, y2] = det.box;
          ctx.strokeStyle = 'red';
          ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
          ctx.fillStyle = 'red';
          ctx.fillText(`${det.label} (${(det.confidence * 100).toFixed(1)}%)`, x1, y1 - 10);
        });
      }

      const speechText = hazardText
        ? `Hazard: ${hazardText}. Objects detected: ${normalObjects}.`
        : `Objects detected: ${normalObjects}.`;

      const now = Date.now();
      if (!this.muted && !window.speechSynthesis.speaking && speechText !== this.lastSpokenText && now - this.lastSpokenTime > 5000) {
        this.lastSpokenText = speechText;
        this.lastSpokenTime = now;
        this.speak(speechText);
      }
    });
  }

  onThresholdChange(value: number) {
    this.distanceThreshold = value;
    this.speak(`Your hazard distance is now ${value.toFixed(2)} meters.`);
  }

  speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  toggleMute() {
    this.muted = !this.muted;
    window.speechSynthesis.cancel();
  }

  ngOnDestroy() {
    this.stopDetection();
    this.accessService.disconnectSocket();
  }
}
