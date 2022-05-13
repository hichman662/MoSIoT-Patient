import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
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
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
