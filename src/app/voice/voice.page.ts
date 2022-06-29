/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from '@angular/router';
/* eslint-disable @typescript-eslint/quotes */

import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';


@Component({
  selector: 'app-voice',
  templateUrl: './voice.page.html',
  styleUrls: ['./voice.page.scss'],
})
export class VoicePage implements OnInit {

  text_sentences = [];
  constructor(public speechRecognition: SpeechRecognition,
    public textToSpeech: TextToSpeech,
    private router: Router) {
      this.text_sentences = [
        "There is no such thing as fun for the whole family",
        "If you can't have fun, there's no sense in doing it.",
        "Stand up for what is right, regardless of who is committing the wrong."
      ];
    }

  ngOnInit() {

  }

  startReading(text){
    this.textToSpeech.speak(text)
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
  }

  checkPermission(){
    this.speechRecognition.hasPermission().then((permission)=>{
      if(permission){
        alert("already have permission speech reginition.");
      }else{
        alert("Not have permission speech recognition.");
      }
    },(err)=>{
      alert(JSON.stringify(err));
    });
    }

      requestPermission(){
    this.speechRecognition.requestPermission().then((data)=>{
      alert(JSON.stringify(data));
    },(err)=>{
      alert(JSON.stringify(err));
    });

    }

      startListening(){
        this.speechRecognition.startListening().subscribe((speeches: Array<string>)=>{
          console.log(speeches);
          alert(speeches[0]);
          if(speeches[0] === "open"){
            this.router.navigateByUrl('/tabs', { replaceUrl:true });
          }
          if(speeches[0] === "logout"){
            this.router.navigateByUrl('/login', { replaceUrl:true });
          }
          if(speeches[0] === "notification"){

          }
        },(err)=>{
          alert(JSON.stringify(err));
        });
      }
}
