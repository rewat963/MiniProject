import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import * as Enums from '../../enums/enums';

@IonicPage()
@Component({
  selector: 'page-cat-detail',
  templateUrl: 'cat-detail.html',
})
export class CatDetailPage {
  score = "";
  detail = {rentalroom_name:'',rentalroom_id:'',rentalroom_name_location:'',rentalroom_phone:'',rentalroom_price:'',category_id:''};
  catnmame=[];
  comement =[];
  comment:string="";
  constructor(public http: HttpClient,public navCtrl: NavController, public navParams: NavParams,
    private socialSharing: SocialSharing, public event : Events) {
      this.getJsonObjet();
      this.getcatname();
      this.event.subscribe('star-rating:changed', (note) => {
        console.log('คะแนน',note);
        this.score = note;
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatDetailPage');
    this.detail = this.navParams.data;
    console.log(this.detail);
  }

  share(){
    let GO = ""+this.detail.rentalroom_name+"\nราคา : "+this.detail.rentalroom_price+"\nที่อยู่ : "+this.detail.rentalroom_name_location+"\nเบอร์ : "+this.detail.rentalroom_phone;
    this.socialSharing.share(GO).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });;
  }

  catmap(detail){
    this.navCtrl.push("CatMapPage",detail);
  }

  getcatname(){
    this.detail = this.navParams.data;
    let url =Enums.APIURL.URL+'/todoslim3/public/room/category/'+this.detail.category_id;
    this.http.get(url).subscribe(
      (data: any)=>{
        console.log(data);
       this.catnmame = data;
       console.log(this.catnmame);
      }
      ,
      (error) => {console.log(error)}
    );
  }

  getJsonObjet(){
    this.detail = this.navParams.data;
    let url =Enums.APIURL.URL+'/todoslim3/public/room/comment/'+this.detail.rentalroom_id;
    this.http.get(url).subscribe(
      (data: any)=>{
        console.log(data);
       this.comement = data;
       console.log(this.comement);
      }
      ,
      (error) => {console.log(error)}
    );
  }

  summit(comment){
    if(comment != null){
      if(this.score != ""){
        //START
        let josnData;
        josnData = {
          comment_content: comment
        , comment_score: this.score
        , rentalroom_id: this.detail.rentalroom_id
        };
        let url = Enums.APIURL.URL+'/todoslim3/public/room/addcomment';
        this.http.post(url,josnData).subscribe(
        (data: any)=>{
        console.log(data);
        this.getJsonObjet();
        this.comment="";
        this.score="";
        }
        ,
        (error) => {console.log(error)}
         );
      }
      else{
        alert("โปรดให้คะแนน");
      }
    }
    else{
      alert("โปรดกรอกความคิดเห็น");
    }
  }

}

