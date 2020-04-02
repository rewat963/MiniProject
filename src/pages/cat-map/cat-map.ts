import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { ViewChild, ElementRef } from '@angular/core';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-cat-map',
  templateUrl: 'cat-map.html',
})
export class CatMapPage {

  mapss ={rentalroom_latitude:'',rentalroom_longitude:''};

  @ViewChild('map') mapElement: ElementRef;

  map:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams
              ,public geolocation: Geolocation
              ,public loadingCtrl: LoadingController) {
                this.getCurrentLocation();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatMapPage');
    this.mapss = this.navParams.data;
    console.log(this.mapss);
  }

  getCurrentLocation() {  
    let loader = this.loadingCtrl.create();  
    loader.present();  
    this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {  
      // this.myLatitude = resp.coords.latitude;  
      // this.myLongitude = resp.coords.longitude;  
      console.log(this.mapss.rentalroom_latitude);
      console.log(this.mapss.rentalroom_longitude);
      let latLng = new google.maps.LatLng(this.mapss.rentalroom_latitude, this.mapss.rentalroom_longitude);  
      
      let mapOptions = {  
        center: latLng,  
        zoom: 15,  
        mapTypeId: google.maps.MapTypeId.ROADMAP  
      }  
    
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);  
    
      let marker = new google.maps.Marker({  
        map: this.map,  
        animation: google.maps.Animation.DROP,  
        position: latLng  
      });  
      var trafficLayer = new google.maps.TrafficLayer(); 
      trafficLayer.setMap(this.map);
      loader.dismiss();  
    });  
  }

}
