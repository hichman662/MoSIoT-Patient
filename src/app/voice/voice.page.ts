/* eslint-disable @typescript-eslint/quotes */

import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';


@Component({
  selector: 'app-voice',
  templateUrl: './voice.page.html',
  styleUrls: ['./voice.page.scss'],
})
export class VoicePage implements OnInit {

  constructor(public speechRecognition: SpeechRecognition) { }

  ngOnInit() {
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
        this.speechRecognition.startListening().subscribe((speeches)=>{
          alert(speeches[0]);
        },(err)=>{
          alert(JSON.stringify(err));
        });
      }
}
