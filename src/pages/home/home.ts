import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import * as Enums from '../../enums/enums'; 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  category:any = [];

  constructor(public navCtrl: NavController,public http: HttpClient) {
    this.getJsonObjet();
  }

  getJsonObjet(){
    let url =Enums.APIURL.URL+'/todoslim3/public/room/category';

    this.http.get(url).subscribe(
      (data: any)=>{
        console.log(data);
       this.category = data;
       console.log(this.category);
      }
      ,
      (error) => {console.log(error)}
    );

  }

 catdata(type){
    this.navCtrl.push("CatDataPage",type.category_id);
    (type: any)=>{
      console.log(type);
    }
  }
  
}

