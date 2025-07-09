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
  private intervalId: any;

  constructor(public accessService: AccessibilityService) {}

  ngOnInit() {
    this.subscribeToDetections();
  }

  async startDetection() {
    const video = this.videoRef.nativeElement;
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    await video.play();

    this.intervalId = setInterval(() => {
      if (!ctx || video.readyState < 2) return;

      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
}

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const frame = canvas.toDataURL('image/jpeg').split(',')[1];
      this.accessService.sendFrame(frame);
    }, 500); // Adjust interval 
  }

  stopDetection() {
    clearInterval(this.intervalId);
    const video = this.videoRef.nativeElement;
    const stream = video.srcObject as MediaStream;
    if (stream) stream.getTracks().forEach(t => t.stop());
    video.srcObject = null;
  }

  subscribeToDetections() {
    this.accessService.getSocket().on('detection_result', data => {
      if (!data?.detections) {
        this.objectListText = 'No detections.';
        this.distanceLineText = '';
        return;
      }

      // Update object list
      this.objectListText = data.detections.map(
        d => `${d.label}: ${d.distance.toFixed(2)}m`
      ).join('\n');

      // Update distance line
      this.distanceLineText = data.detections.map(d =>
        d.distance < 0.5
          ? `${d.label}: ${d.distance.toFixed(2)}m (TOO CLOSE!)`
          : `${d.label}: ${d.distance.toFixed(2)}m`
      ).join(' | ');

           const ctx = this.canvasRef.nativeElement.getContext('2d');
      if (ctx && data.detections.length > 0) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.font = '22px Arial'; // Increase text size
        ctx.lineWidth = 2;

        data.detections.forEach(det => {
          const [x1, y1, x2, y2] = det.box;

          // Draw bounding box
          ctx.strokeStyle = 'red';
          ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

          
          ctx.strokeStyle = 'white';
          ctx.strokeText(`${det.label} (${(det.confidence * 100).toFixed(1)}%)`, x1, y1 - 10);

          // Red text on top
          ctx.fillStyle = 'red';
          ctx.fillText(`${det.label} (${(det.confidence * 100).toFixed(1)}%)`, x1, y1 - 10);
        });
      }


    });
  }

  ngOnDestroy() {
    this.stopDetection();
    this.accessService.disconnectSocket();
  }
}
