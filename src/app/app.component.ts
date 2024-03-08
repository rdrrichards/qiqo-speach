import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SpeachService } from './speach.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public isUserSpeaking: boolean = false;
  readonly voiceRecognition = inject(SpeachService);
  searchText: string = '';
  constructor() {
    // this.voiceRecognition.init();
    this.initVoiceInput();
  }
  initVoiceInput() {
    this.voiceRecognition.init();
    // // Subscription for initializing and this will call when user stopped speaking.
    // this.voiceRecognition.init().subscribe(() => {
    //   // User has stopped recording
    //   // Do whatever when mic finished listening
    // });

    // // Subscription to detect user input from voice to text.
    // this.voiceRecognition.speechInput().subscribe((input) => {
    //   // Set voice text output to
    //   this.searchForm.controls.searchText.setValue(input);
    // });
    // this.searchText = this.voiceRecognition.voiceToText();
  }
  startRecording() {
    this.isUserSpeaking = true;
    this.voiceRecognition.start();
    //this.searchText = 'Strting...';
    // this.searchForm.controls.searchText.reset();
    this.voiceRecognition.voiceToText.set('Speak now...');
  }
  stopRecording() {
    this.voiceRecognition.stop();
    this.isUserSpeaking = false;
    //this.searchText = '';
    this.voiceRecognition.voiceToText.set('');
  }
}
