import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'angular-web-storage';
import * as $ from "jquery";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginArray:any;
  url: string = "http://localhost:8090/";
  public data:any=[];
  userId: string = "";
  IdArray:any;
  constructor(private router: Router, private httpObj: HttpClient, private route: ActivatedRoute, private local: LocalStorageService, private session: SessionStorageService) { }

  ngOnInit(): void {

    this.userId = this.getFromLocal(1);
    
    if(this.userId != null)
    {

    let addUser = this.httpObj.get(this.url + "user/getUserdata/"+this.userId);
      addUser.subscribe((response)=>{
        console.log(response);
        this.IdArray=response;
        if(this.IdArray[0].userRole=="User")
        {
          this.router.navigate(["customerapplyloan"]);
        }
        else if(this.IdArray[0].userRole=="Admin")
        {
          this.router.navigate(["adminappliedloan"]);
        }
       
      });

    }
   
    
  }

  showeye(param : any)
  {
    if(param==0)
    {
    $('#password').attr('type','text');
    $('#openeye0').hide();
    $('#closeeye0').show();
    setTimeout(() => {
      $('#password').attr('type','password');
    $('#openeye0').show();
    $('#closeeye0').hide();
    }, 1000);
  }
  else if(param==1)
  {
    
  }
  else if(param==2)
  {
   
  }
  else if(param==3)
  {
   
  }
  else if(param==4)
  {
    
  }

   
    
  }

  login(param:any)
  {
    // console.log(param.value);
    
    // console.log("the details are "+param.value.email+" and "+param.value.password);

    this.loginArray={
      "email":param.value.email,
      "password":param.value.password
    }
    console.log(this.loginArray);
    
    let addUser = this.httpObj.post(this.url + "user/login",this.loginArray);
    addUser.subscribe((response)=>{
    console.log(response);
     if(response==true)
     {
      let addUsers = this.httpObj.post(this.url + "user/loginId", this.loginArray);
      addUsers.subscribe((response)=>{
      console.log(response);
      var myId=response;

      let addUserss = this.httpObj.get(this.url + "user/getUserdata/"+myId);
      addUserss.subscribe((response)=>{
        console.log(response);
        this.IdArray=response;
        if(this.IdArray[0].userRole=="User")
        {
          this.saveInLocal(1,myId);
          this.router.navigate(["customerapplyloan"]);
        }
        else if(this.IdArray[0].userRole=="Admin")
        {
          this.saveInLocal(1,myId);
          this.router.navigate(["adminappliedloan"]);
        }
       
      });


      
       
      }); 
        
     }
     else
     {
       $('#invalidUser').fadeIn();
      //  $('#password').val('');
      //  $('#loginButton').attr("disabled",'disabled');
       setTimeout(() => {
        $('#invalidUser').fadeOut();
       }, 1000);
     }
    }); 
    
  }

  saveInLocal(key: any, val: any): void {
    console.log('recieved= key:' + key + 'value:' + val);
    this.local.set(key, val);
    this.data[key]= this.local.get(key);
   }
   
   getFromLocal(key: any): any {
    console.log('recieved= key:' + key);
    this.data[key]= this.local.get(key);
    console.log(this.data);
    return this.data[key];
   }


}
