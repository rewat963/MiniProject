import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatDetailPage } from './cat-detail';
import { StarRatingModule } from 'ionic3-star-rating';
@NgModule({
  declarations: [
    CatDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CatDetailPage),StarRatingModule
  ],
})
export class CatDetailPageModule {}
