/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from '@angular/router';
/* eslint-disable @typescript-eslint/quotes */

import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-voice',
  templateUrl: './voice.page.html',
  styleUrls: ['./voice.page.scss'],
})
export class VoicePage implements OnInit {

  text_sentences = [];
  notification: string;
  constructor(public speechRecognition: SpeechRecognition,
    public textToSpeech: TextToSpeech,
    private router: Router,
    public toastController: ToastController,
    private storage: Storage
    )
    {
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

    async presentToast(color: string , message: string) {
      const toast = await this.toastController.create({
        color: `${color}`,
        message: `Here is what I heard: ${message}`,
        duration: 3500,
        position: 'bottom'
      });
      await toast.present();
    }

      startListening(){
        this.speechRecognition.startListening().subscribe((speeches: Array<string>)=>{
          console.log(speeches);
         // alert();
        this.presentToast('success' , speeches[0]);
        /*  window.setTimeout(()=>{
            console.log(speeches[0]);
          }, 2000); */

          if(speeches[0] === "open"){
            this.startReading(`going to noitification`);
            this.router.navigateByUrl('/tabs', { replaceUrl:true });
          }
          else if(speeches[0] === "logout" || speeches[0] === "log out"){
            this.startReading(`going out of the application`);
            this.router.navigateByUrl('/login', { replaceUrl:true });
          }
          else if(speeches[0] === "Santiago" || speeches[0] === "santee"){
            this.startReading(`hello senior`);
          }
          else if(speeches[0] === "notification"  ){
            this.storage.get('notification').then(async val => {
              this.notification = val;
              console.log(this.notification);
            });
            this.startReading(this.notification);
          }else{
            this.startReading(`I did not understand your command, please repeat again`);
          }
        },(err)=>{
          alert(JSON.stringify(err));
        });
      }
}


