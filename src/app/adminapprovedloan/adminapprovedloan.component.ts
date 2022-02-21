import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'angular-web-storage';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-adminapprovedloan',
  templateUrl: './adminapprovedloan.component.html',
  styleUrls: ['./adminapprovedloan.component.css']
})
export class AdminapprovedloanComponent implements OnInit {

  url: string = "http://localhost:8090/";
  public data:any=[];
  userId: string = "";
  allLoanArray:any;
  allLength:any;
  documentArray:any;
  reasonArray:any;
  editArray:any=[];
  totalDocument:any;
  myLoanId:any;
  deleteId:any;
  buttonClick:boolean=false;
  oneArray:any=[];
  ArrayLength:any;
  

  constructor(private router: Router, private httpObj: HttpClient, private route: ActivatedRoute, private local: LocalStorageService, private session: SessionStorageService,private messageService: MessageService) { }

  ngOnInit(): void {

    this.userId=this.getFromLocal(1);
    if(this.userId==null)
    {
      this.router.navigate([""]);
    }
    else
    {
      let addUsers = this.httpObj.get(this.url + "admin/getAllCheckedLoans");
    addUsers.subscribe((response)=>{
    console.log(response);
    this.allLoanArray=response;
    this.allLength=this.allLoanArray.length;
    console.log("length is "+this.allLength);
    
 
    let addUserss = this.httpObj.get(this.url + "user/getDocuments");
    addUserss.subscribe((response)=>{
    console.log(response);
    this.documentArray=response;

    let addUser = this.httpObj.get(this.url + "getAllReason");
    addUser.subscribe((response)=>{
    console.log(response);
    this.reasonArray=response;

 
    }); 
 
    }); 


    
    $('#noResult').hide();
    $('#yesResult').hide();
    $('#allLoan').fadeIn();
  
     
    }); 

    }

  }

  getFromLocal(key: any): any {
    console.log('recieved= key:' + key);
    this.data[key]= this.local.get(key);
    console.log(this.data);
    return this.data[key];
   }

   saveInLocal(key: any, val: any): void {
    console.log('recieved= key:' + key + 'value:' + val);
    this.local.set(key, val);
    this.data[key]= this.local.get(key);
   }

   viewSchedule(param: any)
   {
     console.log("id is "+param);
     this.saveInLocal(3,param);
     this.router.navigate(["repaymentschedule"]);
     
   }


   loanValue(param: any)
   {
    if(param=="" && this.buttonClick==true)
    {
        $('#allLoan').fadeIn();
        $('#yesResult').hide();
        $('#noResult').hide();
    }
   }


   trackLoan(param: any)
   {

    console.log("LoanId is "+param);
    
    this.buttonClick=true;

    $('#allLoan').hide();

    this.oneArray=[];
    

    for(var i=0;i<this.allLoanArray.length;i++)
    {
      if(this.allLoanArray[i].loanId==param)
      {
          
        this.oneArray.push(this.allLoanArray[i]);
       //  this.oneArray=this.loanDetailsArray[i];
      }
    }

   
   
    console.log(this.oneArray);
    this.ArrayLength=this.oneArray.length;
    console.log("length is "+ this.ArrayLength);
    
    if(this.ArrayLength==0)
    {
      $('#noResult').fadeIn();
    }
    else if(this.ArrayLength>0)
    {
     $('#noResult').hide();
     $('#yesResult').fadeIn();
    }
  

   }

   deleteLoan(param: any)
   {
     console.log("delete id is "+param);
     this.deleteId=param
     $('#deleteLaunch').click();
     
   }

   deleteLoanDetails()
   {
     console.log("final delete is "+this.deleteId);

     let addUsers = this.httpObj.get(this.url + "user/deleteLoan/"+this.deleteId);
     addUsers.subscribe((response)=>{
     console.log(response);
     

      this.ngOnInit();

     $('#deletethisloanfast').click();

    }); 
   
     
   }



   openFiles(param: any)
   {
     console.log("loanId is "+param);

     this.editArray=[];

     for(var i=0;i<this.allLoanArray.length;i++)
     {
       if(this.allLoanArray[i].loanId==param)
       {
           
         this.editArray.push(this.allLoanArray[i]);
        
       }
     }

     this.totalDocument=this.editArray[0].documentIds.length;

     this.myLoanId=this.editArray[0].loanId;

     console.log("total document is "+this.totalDocument);
     console.log("loanId is "+this.myLoanId);
     
     
     console.log(this.editArray);


     $('#editDocs').click();
     
   }

}
