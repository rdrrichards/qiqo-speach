
import { Component, inject } from '@angular/core';
import { SpeachService } from './speach.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    imports: [FormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  public isUserSpeaking: boolean = false;
  readonly voiceRecognition = inject(SpeachService);
  searchText: string = '';
  constructor() {
    this.initVoiceInput();
  }
  initVoiceInput() {
    this.voiceRecognition.init();
  }
  startRecording() {
    this.isUserSpeaking = true;
    this.voiceRecognition.start();
    this.voiceRecognition.voiceToText.set('Speak now...');
  }
  stopRecording() {
    this.voiceRecognition.stop();
    this.isUserSpeaking = false;
    this.voiceRecognition.voiceToText.set('');
  }
}
