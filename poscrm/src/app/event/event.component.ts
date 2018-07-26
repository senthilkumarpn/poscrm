import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../Service/index';



@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events: IEvent= {
    _id:0,
    address:'',
    area:'',
    createdBy:'',
    createdOn: new Date(),
    updatedBy:'',
    updatedOn: new Date(),
    description:'',
    existingAmount:0,
    NewAmount:0,
    SubTotal:0,
    PaidTo:'',
    name: '',
    primaryMobile: "9655289292",
    secondaryMobile: "9652323",
    status:true,
  };
  transactions = {};
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute,private msgService: MessageService) { }
  mode = '';
  ngOnInit() {
    debugger;
    this.http.get('/event').subscribe(data => {
      this.transactions = data;
    });
    //this.mode = "add";
  }
  actionEvent(){
    switch(this.mode.toLowerCase()){
      case 'add':this.addEvent();break;
      case 'edit':this.updateEvent(this.events._id);break;
      case 'update':this.updateEvent(this.events._id);break;
      case 'delete':this.updateEvent(this.events._id);break;
      default: break;
    }
  }
  addEvent() {
    this.http.post('/event', this.events)
    .subscribe(res => {
        let id = res['_id'];
       // this.router.navigate(['/book-details', id]);
      }, (err) => {
        console.log(err);
      }
    );
  }
  updateEvent(id) {
    debugger;
    this.http.put('/event/'+id, this.events)
      .subscribe(res => {
        debugger;
          let id = res['_id'];
         // this.router.navigate(['/book-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }
  sendMessage(){
    debugger;
    var that=this;
    var msg ={
      message: 'New Amt:' + that.events.NewAmount + ',OldAmt:' + that.events.existingAmount + ',PaidTo:' + that.events.PaidTo + '//Thanks.',
      numbers: that.events.primaryMobile,
    }
    var response = that.msgService.sendSMS(msg);
  }
}


interface IEvent  {
  _id: Number ,
  name: String ,
  PaidTo:String ,
  existingAmount:Number,
  NewAmount:Number,
  SubTotal:Number,
  area: String,
  address: String,
  primaryMobile: String,
  secondaryMobile: String,
  description: String,
  createdBy:String,
  createdOn:Date,
  updatedBy: String,
  updatedOn: Date,
  status:Boolean,
}
