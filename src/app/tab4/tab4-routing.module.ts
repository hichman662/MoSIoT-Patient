import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab4Page } from './tab4.page';

const routes: Routes = [
  {
    path: '',
    component: Tab4Page
  },
  {
    path: 'object-detection',
    loadChildren: () => import('../object-detection/object-detection.module').then( m => m.ObjectDetectionPageModule)
  },
  {
    path: 'scene-description',
    loadChildren: () => import('../scene-describe/scene-describe.module').then( m => m.SceneDescribePageModule)
  },
  {
    path: 'text-reader',
    loadChildren: () => import('../text-reader/text-reader.module').then( m => m.TextReaderPageModule)
  },
  {
    path: 'color-detection',
    loadChildren: () => import('../color-detection/color-detection.module').then( m => m.ColorDetectionPageModule)
  },
  {
    path: 'chat-assist',
    loadChildren: () => import('../chat-ai/chat-ai.module').then( m => m.ChatAiPageModule)
  },
  {
    path: 'sign-language',
    loadChildren: () => import('../sign-language/sign-language.module').then( m => m.SignLanguagePageModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab4PageRoutingModule {}
