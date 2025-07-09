import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'patient-access',
    loadChildren: () => import('./patient-access/patient-access.module').then( m => m.PatientAccessPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'rel-person',
    loadChildren: () => import('./rel-person/rel-person.module').then( m => m.RelPersonPageModule)
  },
  {
    path: 'medication',
    loadChildren: () => import('./medication/medication.module').then( m => m.MedicationPageModule)
  },
  {
    path: 'communication',
    loadChildren: () => import('./communication/communication.module').then( m => m.CommunicationPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'care-plan',
    loadChildren: () => import('./care-plan/care-plan.module').then( m => m.CarePlanPageModule)
  },
  {
    path: 'care-activity',
    loadChildren: () => import('./care-activity/care-activity.module').then( m => m.CareActivityPageModule)
  },
  {
    path: 'appointment',
    loadChildren: () => import('./appointment/appointment.module').then( m => m.AppointmentPageModule)
  },
  {
    path: 'voice',
    loadChildren: () => import('./voice/voice.module').then( m => m.VoicePageModule)
  },
  {
    path: 'nutrition',
    loadChildren: () => import('./nutrition/nutrition.module').then( m => m.NutritionPageModule)
  },
  {
    path: 'device',
    loadChildren: () => import('./device/device.module').then( m => m.DevicePageModule)
  },
  {
    path: 'practitioner',
    loadChildren: () => import('./practitioner/practitioner.module').then( m => m.PractitionerPageModule)
  },
  {
    path: 'telemetry',
    loadChildren: () => import('./telemetry/telemetry.module').then( m => m.TelemetryPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'object-detection',
    loadChildren: () => import('./object-detection/object-detection.module').then( m => m.ObjectDetectionPageModule)
  },
  {
    path: 'scene-describe',
    loadChildren: () => import('./scene-describe/scene-describe.module').then( m => m.SceneDescribePageModule)
  },
  {
    path: 'text-reader',
    loadChildren: () => import('./text-reader/text-reader.module').then( m => m.TextReaderPageModule)
  },
  {
    path: 'color-detection',
    loadChildren: () => import('./color-detection/color-detection.module').then( m => m.ColorDetectionPageModule)
  },
  {
    path: 'chat-ai',
    loadChildren: () => import('./chat-ai/chat-ai.module').then( m => m.ChatAiPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
