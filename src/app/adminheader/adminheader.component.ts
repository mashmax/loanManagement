import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'angular-web-storage';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent implements OnInit {

  currentRoute: string = "";

  url: string = "http://localhost:8090/";
  public data:any=[];
  userId: string = "";

  constructor(private router: Router, private httpObj: HttpClient, private route: ActivatedRoute, private local: LocalStorageService, private session: SessionStorageService,private messageService: MessageService) { }

  ngOnInit(): void {

    this.userId=this.getFromLocal(1);

    if(this.userId!='1')
    {
       $('#profile').hide();
       $('#lastnav').css("margin-left","47%");
       $('#navbarNavDropdown').css("margin-left","30%");
    }

    this.currentRoute = window.location.href;
    console.log("current link: " + this.currentRoute);
    var currentComponent=this.currentRoute.split("/",4);
    var currentvalue=currentComponent[3];
    console.log("current route is "+currentvalue);


    if(currentvalue=='adminappliedloan')
    {
      $('#applyLoan').addClass('active');

      $('#applyLoan').css("transform","scale(1.3)");
      $('#loanStatus').css("transform","scale(1.0)");
      $('#profile').css("transform","scale(1.0)");

      $('#loanStatus').removeClass('active');
      $('#profile').removeClass('active');

      // $('#headlight').css("background-color","black");

    }

    else if(currentvalue=='adminapprovedloan')
    {
      $('#loanStatus').addClass('active');

      $('#loanStatus').css("transform","scale(1.3)");
      $('#applyLoan').css("transform","scale(1.0)");
      $('#profile').css("transform","scale(1.0)");

      $('#applyLoan').removeClass('active');
      $('#profile').removeClass('active');
    }

    else if(currentvalue=='adminrequest')
    {
      $('#profile').addClass('active');

      $('#profile').css("transform","scale(1.3)");
      $('#applyLoan').css("transform","scale(1.0)");
      $('#loanStatus').css("transform","scale(1.0)");
      $('#loanStatus').removeClass('active');
      $('#applyLoan').removeClass('active');
    }

    else if(currentvalue=='repaymentschedule')
    {
      $('#loanStatus').addClass('active');

      $('#loanStatus').css("transform","scale(1.3)");
      $('#applyLoan').css("transform","scale(1.0)");
      $('#profile').css("transform","scale(1.0)");

      $('#applyLoan').removeClass('active');
      $('#profile').removeClass('active');
    }




    $('#applyLoan').click(function(){
      console.log("applyLoan active");
      
      $('#applyLoan').addClass('active');

      $('#applyLoan').css("transform","scale(1.3)");
      $('#loanStatus').css("transform","scale(1.0)");
      $('#profile').css("transform","scale(1.0)");

      $('#loanStatus').removeClass('active');
      $('#profile').removeClass('active');
     
      //  $('#headlight').css("background-color","black");

    });

    $('#loanStatus').click(function(){
      console.log("loanStatus active");
      
      $('#loanStatus').addClass('active');

      $('#loanStatus').css("transform","scale(1.3)");
      $('#applyLoan').css("transform","scale(1.0)");
      $('#profile').css("transform","scale(1.0)");

      $('#applyLoan').removeClass('active');
      $('#profile').removeClass('active');
    });

    $('#profile').click(function(){
      console.log("profile active");
      
      $('#profile').addClass('active');

      $('#profile').css("transform","scale(1.3)");
      $('#applyLoan').css("transform","scale(1.0)");
      $('#loanStatus').css("transform","scale(1.0)");
      $('#loanStatus').removeClass('active');
      $('#applyLoan').removeClass('active');
    });




  }

  logOut(){
    localStorage.clear();
    // console.log(this.messages[0].message);
    
  
  }

  getFromLocal(key: any): any {
    console.log('recieved= key:' + key);
    this.data[key]= this.local.get(key);
    console.log(this.data);
    return this.data[key];
   }

}
