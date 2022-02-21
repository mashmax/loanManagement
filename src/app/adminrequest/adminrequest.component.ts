import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'angular-web-storage';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-adminrequest',
  templateUrl: './adminrequest.component.html',
  styleUrls: ['./adminrequest.component.css']
})
export class AdminrequestComponent implements OnInit {


  url: string = "http://localhost:8090/";
  public data:any=[];
  userId: string = "";
  requestArray:any;
  requestLength:any;

  constructor(private router: Router, private httpObj: HttpClient, private route: ActivatedRoute, private local: LocalStorageService, private session: SessionStorageService,private messageService: MessageService) { }

  ngOnInit(): void {

    this.userId=this.getFromLocal(1);
    if(this.userId==null)
    {
      this.router.navigate([""]);
    }
    else
    {
      let addUsers = this.httpObj.get(this.url + "admin/getAllRequest");
      addUsers.subscribe((response)=>{
      console.log(response);
       this.requestArray=response;
      this.requestLength=this.requestArray.length;
       
      }); 
    }

  }

  getFromLocal(key: any): any {
    console.log('recieved= key:' + key);
    this.data[key]= this.local.get(key);
    console.log(this.data);
    return this.data[key];
   }

   addAdmin(param: any)
   {
      console.log("add id is "+param);

      let addUsers = this.httpObj.get(this.url + "admin/addRequest/"+param);
      addUsers.subscribe((response)=>{
      console.log(response);
      
      this.ngOnInit();

      }); 


      
   }
   deleteAdmin(param: any)
   {
       console.log("delete id is "+param);

       let addUsers = this.httpObj.get(this.url + "admin/deleteRequest/"+param);
       addUsers.subscribe((response)=>{
       console.log(response);
       
       this.ngOnInit();
       
       }); 
       
   }

}
