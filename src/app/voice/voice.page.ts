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
  bloodPressure: string;
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

          if(speeches[0] === "open" || speeches[0] === "home" || speeches[0] === "Home"){
            this.startReading(`going to noitification`);
            this.router.navigateByUrl('/tabs', { replaceUrl:true });
          }
         else if(speeches[0] === "profile"){
            this.startReading(`going to profile section`);
            this.router.navigateByUrl('/tabs/tab1', { replaceUrl:true });
          }
          else if(speeches[0] === "care plan" || speeches[0] === "care"){
            this.startReading(`going to Care plan section`);
            this.router.navigateByUrl('/tabs/tab2', { replaceUrl:true });
          }
          else if(speeches[0] === "device" || speeches[0] === "devices"){
            this.startReading(`going to device section`);
            this.router.navigateByUrl('/tabs/tab3', { replaceUrl:true });
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
          }
          else if(speeches[0] === "blood pressure" ||  speeches[0] === "pressure" ){
            this.storage.get('bloodPressure').then(async val => {
              this.bloodPressure = val;
              console.log(this.bloodPressure);
            });
            this.startReading(this.bloodPressure);
          }else{
            this.startReading(`I did not understand your command, please repeat again`);
          }
        },(err)=>{
          alert(JSON.stringify(err));
        });
      }
}


