import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatMapPage } from './cat-map';


@NgModule({
  declarations: [
    CatMapPage,
  ],
  imports: [
    IonicPageModule.forChild(CatMapPage),
  ],
})
export class CatMapPageModule {}
