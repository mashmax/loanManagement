import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'angular-web-storage';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-customerheader',
  templateUrl: './customerheader.component.html',
  styleUrls: ['./customerheader.component.css']
})
export class CustomerheaderComponent implements OnInit {
  currentRoute: string = "";

  url: string = "http://localhost:8090/";
  public data:any=[];
  userId: string = "";

  messages: any[] = [];
  subscription!: Subscription;
  mytheme:string="light";
  
  constructor(private router: Router, private httpObj: HttpClient, private route: ActivatedRoute, private local: LocalStorageService, private session: SessionStorageService,private messageService: MessageService) {

    
   }

   ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}

  ngOnInit(): void {
       
 // console.log(this.messageService.getMessage());
  
 this.subscription = this.messageService.getMessage().subscribe(message => {
  if (message) {
    console.log("received message is "+message);
    var Array=[];
    this.messages.push(message);
    Array.push(message);
    console.log(Array);
    console.log(Array[0].message);
     this.mytheme=Array[0].message;
    if(this.mytheme=="dark")
    {
      $('#headlight').css("background-color","black");
    }
    else{
      $('#headlight').css("background-color","darkslateblue");
    }
    
    
  } else {
    // clear messages when empty message received
    console.log("message not received");
    
    this.messages = [];
  }
});

  
  

    this.currentRoute = window.location.href;
    console.log("current link: " + this.currentRoute);
    var currentComponent=this.currentRoute.split("/",4);
    var currentvalue=currentComponent[3];
    console.log("current route is "+currentvalue);

    if(currentvalue=='customerapplyloan')
    {
      $('#applyLoan').addClass('active');

      $('#applyLoan').css("transform","scale(1.3)");
      $('#loanStatus').css("transform","scale(1.0)");
      $('#profile').css("transform","scale(1.0)");

      $('#loanStatus').removeClass('active');
      $('#profile').removeClass('active');

      // $('#headlight').css("background-color","black");

    }

    else if(currentvalue=='customerloanstatus')
    {
      $('#loanStatus').addClass('active');

      $('#loanStatus').css("transform","scale(1.3)");
      $('#applyLoan').css("transform","scale(1.0)");
      $('#profile').css("transform","scale(1.0)");

      $('#applyLoan').removeClass('active');
      $('#profile').removeClass('active');
    }

    else if(currentvalue=='customerprofile')
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

    if(currentvalue=='appliedloan')
    {
      $('#applyLoan').addClass('active');

      $('#applyLoan').css("transform","scale(1.3)");
      $('#loanStatus').css("transform","scale(1.0)");
      $('#profile').css("transform","scale(1.0)");

      $('#loanStatus').removeClass('active');
      $('#profile').removeClass('active');

      // $('#headlight').css("background-color","black");

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
