import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'angular-web-storage';
// import { UploadFileService } from '../upload-file.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-customerloanstatus',
  templateUrl: './customerloanstatus.component.html',
  styleUrls: ['./customerloanstatus.component.css']
})
export class CustomerloanstatusComponent implements OnInit {

  url: string = "http://localhost:8090/";
  public data:any=[];
  userId: string = "";
  loanDetailsArray:any;
  ArrayLength:any;
  oneArray:any=[];
  editArray:any=[];
  buttonClick:boolean=false;
  documentArray:any;
  loanArray: any;
  deleteId: any;
  oneDocumentArray:any=[];
  docId:any;
  deleteDocId:any
  currentLoanId:any;
  totalDocument:any;
  myLoanId:any;
  reasonArray:any;

  title = 'File-Upload-Save';
  selectedFiles: any;
  currentFileUpload: any;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;
  yesUpload:boolean=false;
  statuscheck:any;

  constructor(private router: Router, private httpObj: HttpClient, private route: ActivatedRoute, private local: LocalStorageService, private session: SessionStorageService) { }

  ngOnInit(): void {
    this.userId=this.getFromLocal(1);
    if(this.userId==null)
    {
      this.router.navigate([""]);
    }
    else{

      let addUsers = this.httpObj.get(this.url + "user/viewLoans/"+this.userId);
     addUsers.subscribe((response)=>{
     console.log(response);
     this.loanDetailsArray=response;

     
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


   pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', 'http://localhost:8090/user/editDocuments/'+this.docId, data, {
    reportProgress: true,
    responseType: 'text'
    });
    return this.httpObj.request(newRequest);
}

pushFileToStorages(file: File): Observable<HttpEvent<{}>> {
  const data: FormData = new FormData();
  data.append('file', file);
  const newRequest = new HttpRequest('POST', 'http://localhost:8090/user/addNewDocuments/'+this.currentLoanId+'/'+this.userId, data, {
  reportProgress: true,
  responseType: 'text'
  });
  return this.httpObj.request(newRequest);
}




   change($event:any) {
    this.changeImage = true;
  }
  changedImage(event: any) {
    this.selectedFile = event.target.files[0];
  }
  upload() {
    
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);

    this.yesUpload=true;
    var total=this.currentFileUpload.size;
    console.log("total is "+total);
    
    this.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded/total);
        console.log("percentage is "+this.progress.percentage);
        
      } else if (event instanceof HttpResponse) {
        if(this.progress.percentage>=100) 
        {
        // alert('File Successfully Uploaded');
        this.progress.percentage=100;
        
        


        setTimeout(() => {
          this.yesUpload=false;
          $('#fileDone').fadeIn();
        }, 400);
        
        
        setTimeout(() => {
          $('#fileDone').fadeOut();

          // $('#alltimeUsed').click();

      
          $('#closeAddDocument').click();
          this.ngOnInit();
        }, 1200);

         console.log("this is "+ event.body);
        //  this.documentId=event.body;
        }
         
      }
      this.selectedFiles = undefined;
     }
    );
  }
  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }


  uploads()
  {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);

    this.yesUpload=true;
    var total=this.currentFileUpload.size;
    console.log("total is "+total);
    
    this.pushFileToStorages(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded/total);
        console.log("percentage is "+this.progress.percentage);
        
      } else if (event instanceof HttpResponse) {
        if(this.progress.percentage>=100) 
        {
        // alert('File Successfully Uploaded');
        this.progress.percentage=100;
        
        


        setTimeout(() => {
          this.yesUpload=false;
          $('#fileDones').fadeIn();
        }, 400);
        
        
        setTimeout(() => {
          $('#fileDones').fadeOut();
      
          // $('#alltimeUsed').click();


          $('#closeAddDoc').click();
          this.ngOnInit();
        }, 1200);

         console.log("this is "+ event.body);
        //  this.documentId=event.body;
        }
         
      }
      this.selectedFiles = undefined;
     }
    );
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


   editLoan(param: any)
   {
     console.log("loan id is "+param);

      //  $('#hiddenVar').val(param.value);

     this.editArray=[];

     for(var i=0;i<this.loanDetailsArray.length;i++)
     {
       if(this.loanDetailsArray[i].loanId==param)
       {
           
         this.editArray.push(this.loanDetailsArray[i]);
        
       }
     }
     console.log(this.editArray);

     $('#launchModal').click();
     

     
   }

   openFiles(param: any)
   {
     console.log("loanId is "+param);

     this.editArray=[];

     for(var i=0;i<this.loanDetailsArray.length;i++)
     {
       if(this.loanDetailsArray[i].loanId==param)
       {
           
         this.editArray.push(this.loanDetailsArray[i]);
        
       }
     }

     this.totalDocument=this.editArray[0].documentIds.length;

     this.myLoanId=this.editArray[0].loanId;
     this.statuscheck=this.editArray[0].status;
     if(this.statuscheck=='In Process')
     {
      $('#adddocumentpls').removeAttr('disabled');  
     }
     else
     {
      $('#adddocumentpls').attr("disabled",'disabled');
     }

     console.log("total document is "+this.totalDocument);
     console.log("loanId is "+this.myLoanId);
     
     
     console.log(this.editArray);


     $('#editDocs').click();
     
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

   editDocument(param: any)
   {
     
     this.docId=param;

     console.log("edit document id is "+this.docId);


     this.oneDocumentArray=[];

    for(var i=0;i<this.documentArray.length;i++)
    {
      if(this.documentArray[i].documentId==param)
      {
        this.oneDocumentArray.push(this.documentArray[i]);
      }
    }
    console.log(this.oneDocumentArray);
    

    //  $('#editLaunchs').click();

     
      
  
     
   }

   cancelModal()
   {
     $('#chooseFile').val('');
     this.selectedFiles=false;
    //  $('#editDocs').click();
     
    //  $('#uploadButton').attr("disabled",'disabled');

   }

   cancelModals()
   {
     $('#selectDocumentTypes').val('');
    $('#chooseFiles').val('');
    this.selectedFiles=false;
    // $('#editDocs').click();
   }

   deleteDocument(param: any)
   {
     console.log("delete document id is "+param);
     this.deleteDocId=param;
     
    //  $('#deleteLaunchDocument').click();
 
   }

   deletethisDocument()
   {
      console.log("final delete id is "+this.deleteDocId);

      let addUser = this.httpObj.delete(this.url + "user/deleteDocuments/"+this.deleteDocId);
      addUser.subscribe((response)=>{
        console.log(response);
        
        
           $('#closeDelete').click();


        this.ngOnInit();
      });

         
   }


   addnewDocument(param : any)
   {
     console.log("loan id is "+param);

     this.currentLoanId=param;

    //  $('#addLaunchs').click();
     
   }

   commonLaunch()
   {
    //  $('#editDocs').click();
   }



   trackLoan(param: any)
   {
     console.log("LoanId is "+param);
    
     this.buttonClick=true;

     $('#allLoan').hide();

     this.oneArray=[];
     

     for(var i=0;i<this.loanDetailsArray.length;i++)
     {
       if(this.loanDetailsArray[i].loanId==param)
       {
           
         this.oneArray.push(this.loanDetailsArray[i]);
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

   showAll()
   {
     $('#allLoan').slideDown("slow");
     $('#downArrow').hide();
     $('#upArrow').show();
   }

   hideAll()
   {
    $('#allLoan').slideUp("slow");
    
    $('#upArrow').hide();
    $('#downArrow').show();

    
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



}
