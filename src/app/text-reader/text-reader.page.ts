import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { AccessibilityService } from 'src/app/services/accessibility.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-text-reader',
  templateUrl: './text-reader.page.html',
  styleUrls: ['./text-reader.page.scss'],
})
export class TextReaderPage implements AfterViewInit, OnDestroy {
  @ViewChild('video', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  capturedImage: string | null = null;
  extractedText: string = '';
  isReading = false;

  voices: SpeechSynthesisVoice[] = [];
  selectedVoice: SpeechSynthesisVoice | null = null;
  selectedLang: string = 'en-US';

  private ttsUtterance: SpeechSynthesisUtterance | null = null;
  private stream: MediaStream | null = null;
  private requestSub: Subscription | null = null;

  constructor(private accessService: AccessibilityService) {}

  ngAfterViewInit() {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      this.stream = stream;
      this.videoRef.nativeElement.srcObject = stream;
    }).catch((err) => {
      console.error('Camera access error:', err);
      this.extractedText = 'Unable to access the camera.';
    });

    this.loadVoices();
    window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
  }

  loadVoices() {
    this.voices = window.speechSynthesis.getVoices();
    this.selectedVoice = this.voices.find(v => v.lang === this.selectedLang) || null;
  }

  captureAndRead() {
    if (this.isReading) {
      this.cancelReading();
      return;
    }

    this.isReading = true;
    this.extractedText = '';

    const canvas = this.canvasRef.nativeElement;
    const video = this.videoRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not available');
      this.isReading = false;
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    this.capturedImage = canvas.toDataURL('image/jpeg');

    if (this.requestSub) this.requestSub.unsubscribe();

    this.requestSub = this.accessService.readTextFromImage(this.capturedImage).subscribe({
      next: (res) => {
        this.extractedText = res?.text?.trim() || 'No text extracted.';
        this.readTextAloud(this.extractedText);
        this.isReading = false;
      },
      error: (err) => {
        console.error('OCR error:', err);
        this.extractedText = 'Failed to read text.';
        this.isReading = false;
      }
    });
  }

  readTextAloud(text: string) {
    if (!text) return;

    speechSynthesis.cancel();
    this.ttsUtterance = new SpeechSynthesisUtterance(text);

    this.ttsUtterance.lang = this.selectedLang;
    this.ttsUtterance.voice = this.selectedVoice || null;
    this.ttsUtterance.rate = 1;

    speechSynthesis.speak(this.ttsUtterance);
  }

  onVoiceChange(event: any) {
    const selectedIndex = event.detail.value;
    this.selectedVoice = this.voices[selectedIndex];
    this.selectedLang = this.selectedVoice.lang;
  }

  cancelReading() {
    this.isReading = false;
    this.extractedText = '';
    this.capturedImage = '';
    speechSynthesis.cancel();
    if (this.requestSub) {
      this.requestSub.unsubscribe();
      this.requestSub = null;
    }
  }

  ngOnDestroy() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.cancelReading();
  }
}
