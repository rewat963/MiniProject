import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import * as Enums from '../../enums/enums';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';


@IonicPage()
@Component({
  selector: 'page-cat-addroom',
  templateUrl: 'cat-addroom.html',
})
export class CatAddroomPage {

  room = {
    rentalroom_name: '', rentalroom_price: '', category_id: '', rentalroom_limitedroom_sex: '',
    rentalroom_phone: '', rentalroom_name_location: '', rentalroom_facilities: ''
  };
  type = [];
  base64Image: string;

  name :string="";
  price :string="";
  cattegoryname :string="";
  sex :string="";
  call :string="";
  location :string="";
  day :string="";

  myLatitude = 0 ;
  myLongitude = 0 ;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private camera: Camera,public geolocation: Geolocation) {
    this.category();
    this.rentalroom();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatAddroomPage');
  }

  rentalroom() {
    let url = Enums.APIURL.URL + '/todoslim3/public/room/rentalroom';
    this.http.get(url).subscribe(
      (data: any) => {
        console.log(data);
        this.room = data;
        console.log(this.room);
      }
      ,
      (error) => { console.log(error) }
    );
  }
  category() {
    let url = Enums.APIURL.URL + '/todoslim3/public/room/category';
    this.http.get(url).subscribe(
      (data: any) => {
        console.log(data);
        this.type = data;
        console.log(this.type);
      }
      ,
      (error) => { console.log(error) }
    );
  }

  summit(name,price,categoryname,sex,call,location,day) {
     if (name != null && price != null && categoryname != null&& sex != null&& call != null&& location != null&& day != null) {
      let josnData;
      josnData = {
        rentalroom_name : name ,
        rentalroom_price:price,
        category_id : categoryname,
        rentalroom_limitedroom_sex:sex,
        rentalroom_phone:call,
        rentalroom_name_location:location,
        rentalroom_facilities:day,
        rentalroom_latitude:this.myLatitude,
        rentalroom_longitude:this.myLongitude
      };
      let url = Enums.APIURL.URL + '/todoslim3/public/room/addroom';
      this.http.post(url, josnData).subscribe(
        (data: any) => {
          console.log(data);
          alert("บันทึกสำเร็จ");
         this.name = "";
         this.price = "";
         this.cattegoryname = "";
         this.sex = "";
         this.call = "";
         this.location = "";
         this.day = "";
         this.myLatitude = 0;
         this.myLongitude = 0;
        }
        ,
        (error) => { console.log(error) }
      );
    }else{
      alert("โปรดกรอกให้ครบทุกช่อง");
    }
  }

  openGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (error) => {console.log(error)
    });
  }

  getCurrentLocation() {
    this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {
      this.myLatitude = resp.coords.latitude;
      this.myLongitude = resp.coords.longitude;
      });
  }
}
