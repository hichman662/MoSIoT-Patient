import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { AccessibilityService } from 'src/app/services/accessibility.service';

@Component({
  selector: 'app-chat-ai',
  templateUrl: './chat-ai.page.html',
  styleUrls: ['./chat-ai.page.scss'],
})
export class ChatAiPage implements OnInit, OnDestroy {
  messages: { text: string; sender: 'user' | 'bot' }[] = [];
  inputMessage = '';
  isRecording = false;
  recognition: any;
  private clickListener: (() => void) | undefined;

  constructor(private accessService: AccessibilityService, private renderer: Renderer2) {}

  ngOnInit() {
    this.setupSpeechRecognition();

    this.clickListener = this.renderer.listen('document', 'click', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('ion-input, ion-textarea, ion-button, ion-icon')) {
        this.startVoiceRecognition();
      }
    });
  }

  setupSpeechRecognition() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.recognition.onstart = () => {
      this.isRecording = true;
      this.speak('Recording started');
    };

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.sendMessage(transcript);
    };

    this.recognition.onend = () => {
      this.isRecording = false;
    };

    this.recognition.onerror = () => {
      this.isRecording = false;
    };
  }

  startVoiceRecognition() {
  if (this.recognition) {
    try {
      // Only start if not already recording
      if (!this.isRecording) {
        this.recognition.start();
      }
    } catch (err: any) {
      // Avoid crash if recognition is already running
      if (err.name !== 'InvalidStateError') {
        console.error('SpeechRecognition error:', err);
      }
    }
  }
}


  sendMessage(message: string) {
    if (!message.trim()) return;

    this.messages.push({ text: message, sender: 'user' });

    this.accessService.chatWithAI(message).subscribe({
      next: (res) => {
        const responseText = res?.response?.[0]?.response || 'No response received';
        this.messages.push({ text: responseText, sender: 'bot' });
        this.speak(responseText);
      },
      error: () => {
        this.messages.push({ text: 'An error occurred.', sender: 'bot' });
      },
    });
  }

  speak(text: string) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }

  ionViewWillLeave() {
    // Stop speech recognition
    if (this.recognition && this.isRecording) {
      this.recognition.stop();
    }
    // Cancel speech synthesis
    window.speechSynthesis.cancel();
    // Remove click listener
    if (this.clickListener) {
      this.clickListener();
      this.clickListener = undefined;
    }
  }

  ngOnDestroy() {
    this.ionViewWillLeave(); // For safety in non-Ionic destroy scenarios
  }
  
}
