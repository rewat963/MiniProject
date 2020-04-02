import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatAddroomPage } from './cat-addroom';

@NgModule({
  declarations: [
    CatAddroomPage,
  ],
  imports: [
    IonicPageModule.forChild(CatAddroomPage),
  ],
})
export class CatAddroomPageModule {}
