import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-adminappliedloan',
  templateUrl: './adminappliedloan.component.html',
  styleUrls: ['./adminappliedloan.component.css']
})
export class AdminappliedloanComponent implements OnInit {

  url: string = "http://localhost:8090/";
  public data:any=[];
  userId: string = "";
  allLoanArray:any;
  allLength:any;
  documentArray:any;
  editArray:any;
  loanArray:any;
  deleteId:any;
  totalDocument:any;
  myLoanId:any;


  constructor(private router: Router, private httpObj: HttpClient, private route: ActivatedRoute, private local: LocalStorageService, private session: SessionStorageService) { }

  ngOnInit(): void {

    this.userId=this.getFromLocal(1);
    if(this.userId==null)
    {
      this.router.navigate([""]);
    }
    else
    {

    let addUsers = this.httpObj.get(this.url + "admin/getAllLoans");
    addUsers.subscribe((response)=>{
    console.log(response);
    this.allLoanArray=response;
    this.allLength=this.allLoanArray.length;
    console.log("length is "+this.allLength);
    
 
    let addUserss = this.httpObj.get(this.url + "user/getDocuments");
    addUserss.subscribe((response)=>{
    console.log(response);
    this.documentArray=response;
 
    }); 


    // $('#noResult').hide();
    // $('#yesResult').hide();
    // $('#allLoan').fadeIn();
  
     
    }); 

  }


  }


  editLoan(param: any)
   {
     console.log("loan id is "+param);

      //  $('#hiddenVar').val(param.value);

     this.editArray=[];

     for(var i=0;i<this.allLoanArray.length;i++)
     {
       if(this.allLoanArray[i].loanId==param)
       {
           
         this.editArray.push(this.allLoanArray[i]);
        
       }
     }
     console.log(this.editArray);

     $('#launchModal').click();
     

     
   }

   getFromLocal(key: any): any {
    console.log('recieved= key:' + key);
    this.data[key]= this.local.get(key);
    console.log(this.data);
    return this.data[key];
   }

   editLoanDetails(param: any)
   {
    this.loanArray={
      "applicantName": param.value.enterName,
      "applicantAddress": param.value.enterAddress,
      "applicantMobile": param.value.enterMobile,
      "applicantEmail": param.value.enterEmail,
      "applicantAadhaar": param.value.enterAadharNo,
      "applicantPan": param.value.enterPanNo,
      "applicantSalary": param.value.enterSalary,
      "loanAmountRequired": param.value.enterAmount,
      "loanRepaymentMonths": param.value.enterMonths
    }

    console.log(this.loanArray);
    
    console.log("loan Id is "+param.value.hiddenVar);


    let addUsers = this.httpObj.put(this.url + "user/editLoan/"+param.value.hiddenVar, this.loanArray);
    addUsers.subscribe((response)=>{
    console.log(response);
      this.ngOnInit();
    // let addUserss = this.httpObj.get(this.url + "user/viewLoan/"+this.userId);
    // addUserss.subscribe((response)=>{
    // console.log(response);
    // this.loanDetailsArray=response;
    
    $('#closeeditLoan').click();
     
    // }); 


  }); 
    

    
  
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
