import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatDataPage } from './cat-data';

@NgModule({
  declarations: [
    CatDataPage,
  ],
  imports: [
    IonicPageModule.forChild(CatDataPage),
  ],
})
export class CatDataPageModule {}
