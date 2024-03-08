import { Injectable, signal } from '@angular/core';
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class SpeachService {
  recognition: any;
  isStoppedSpeechRecog = false;
  public text = '';
  private tempWords: string = '';
  voiceToText = signal<string>('');
  speakingPaused = signal<boolean>(false);
  constructor() { }
  init() {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.addEventListener('result', (e: any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      // console.log('transcript', transcript);
      // console.log('this.text', this.text);
      this.voiceToText.set(this.text || transcript);
    });
    return this.initListeners();
  }
  initListeners() {
    this.recognition.addEventListener('end', (condition: any) => {
      this.recognition.stop();
    });
  }
  start() {
    this.text = '';
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    this.recognition.addEventListener('end', (condition: any) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.isActive = true;
        this.recognition.stop();
      } else {
        this.isStoppedSpeechRecog = false;
        this.wordConcat();
        // Checked time with last api call made time so we can't have multiple start action within 200ms for countinious listening
        // Fixed : ERROR DOMException: Failed to execute 'start' on 'SpeechRecognition': recognition has already started.
        if (!this.recognition.lastActiveTime || (Date.now() - this.recognition.lastActive) > 200) {
          this.recognition.start();
          this.recognition.lastActive = Date.now();
        }
      }
      this.voiceToText.update(() => this.text);
    });
  }
  stop() {
    this.text = '';
    this.isStoppedSpeechRecog = true;
    this.wordConcat()
    this.recognition.stop();
    this.recognition.isActive = false;
    this.speakingPaused.set(true);
  }
  wordConcat() {
    this.text = this.text.trim() + ' ' + this.tempWords;
    this.text = this.text.trim();
    this.tempWords = '';
  }
}
