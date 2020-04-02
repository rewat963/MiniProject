import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import * as Enums from '../../enums/enums';



@IonicPage()
@Component({
  selector: 'page-cat-data',
  templateUrl: 'cat-data.html',
})
export class CatDataPage {

  mcontact = "";
  cd: any = [];
  price: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public alertCtrl: AlertController) {
    this.getJsonObjet();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CatDataPage');
    this.mcontact = this.navParams.data;
    console.log(this.mcontact);
  }

  getJsonObjet() {
    this.mcontact = this.navParams.data;
    let url = Enums.APIURL.URL + '/todoslim3/public/room/rentalroom/' + this.mcontact;
    this.http.get(url).subscribe(
      (data: any) => {
        console.log(data);
        this.cd = data;
        console.log(this.cd);
      }
      ,
      (error) => { console.log(error) }
    );

  }

  initializeItems() {
    this.cd;
  };
  getItems(ev: any) {
    this.initializeItems();
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.cd = this.cd.filter((items) => {
        return (items.rentalroom_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.getJsonObjet();
    }
  }

  catdetail(cds) {
    this.navCtrl.push("CatDetailPage", cds);
  }
  search() {
    this.mcontact = this.navParams.data;
    let url1 = Enums.APIURL.URL + '/todoslim3/public/room/rentalroom/select/1/' + this.mcontact;
    let url2 = Enums.APIURL.URL + '/todoslim3/public/room/rentalroom/select/2/' + this.mcontact;
    let url3 = Enums.APIURL.URL + '/todoslim3/public/room/rentalroom/select/3/' + this.mcontact;

    console.log(this.cd);
    let alert = this.alertCtrl.create();
    alert.setTitle('เลือกช่วงราคาห้องพัก');
    alert.addInput({
      type: 'checkbox',
      label: 'น้อยกว่า 3,000',
      value: '1',
    });

    alert.addInput({
      type: 'checkbox',
      label: '3,000-4,000',
      value: '2'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'มากกว่า 4,000',
      value: '3'
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        this.price = data;
        console.log(this.price);
        if (this.price == 1) {
          this.http.get(url1).subscribe(
            (data: any) => {
              console.log(data);
              this.cd = data;
              console.log(this.cd);
            }
            ,
            (error) => { console.log(error) }
          );
        } else if (this.price == 2) {
          this.http.get(url2).subscribe(
            (data: any) => {
              console.log(data);
              this.cd = data;
              console.log(this.cd);
            }
            ,
            (error) => { console.log(error) }
          );
        } else if (this.price == 3) {
          this.http.get(url3).subscribe(
            (data: any) => {
              console.log(data);
              this.cd = data;
              console.log(this.cd);
            }
            ,
            (error) => { console.log(error) }
          );
        }
      }
    });
    alert.present();
  }
}
