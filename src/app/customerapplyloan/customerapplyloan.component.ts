import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'angular-web-storage';
import { UploadFileService } from '../upload-file.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customerapplyloan',
  templateUrl: './customerapplyloan.component.html',
  styleUrls: ['./customerapplyloan.component.css']
})
export class CustomerapplyloanComponent implements OnInit {

  url: string = "http://localhost:8090/";
  public data:any=[];
  userId: string = "";

  title = 'File-Upload-Save';
  selectedFiles?: FileList;
  progressInfos: any = [];
  message: any = [];
  fileInfos?: Observable<any>;

  //progress: { percentage: number } = { percentage: 0 };
  // selectedFile = null;
  //changeImage = false;
  loanArray: any;
  documentId:any=[];
  constructor(private router: Router, private httpObj: HttpClient, private route: ActivatedRoute, private local: LocalStorageService, private session: SessionStorageService, private uploadService: UploadFileService) { 
  }

  ngOnInit(): void {

    this.userId=this.getFromLocal(1);
    if(this.userId==null)
    {
      this.router.navigate([""]);
    }
    else
    {

    $('#firstshow').fadeIn();
    $('#previous').css("transform","scale(1.3)");
    $('#next').css("transform","scale(1.0)");

    this.fileInfos = this.uploadService.getFiles();

    }

  }

  prev()
  {
    $('#secondshow').hide();
    $('#firstshow').fadeIn();
    $('#previous').css("transform","scale(1.3)");
    $('#next').css("transform","scale(1.0)");
  }

  next()
  {
    $('#firstshow').hide();
    $('#secondshow').fadeIn();
    $('#next').css("transform","scale(1.3)");
    $('#previous').css("transform","scale(1.0)");
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

   uploadDocument(param: any)
   {
     console.log("document type is "+param);
     
    //  let addUsers = this.httpObj.post(this.url + "user/addDocuments",);
    //  addUsers.subscribe((response)=>{
    //  console.log(response);
     
      
    //  }); 
     
   }

  //  downloadFile(){
  //   const link = document.createElement('a');
  //   link.setAttribute('target', '_blank');
  //   link.setAttribute('href', '_File_Saved_Path');
  //   link.setAttribute('download', 'file_name.pdf');
  //   document.body.appendChild(link);
  //   link.click();
  //   link.remove();
  // }
  // change($event:any) {
  //   this.changeImage = true;
  // }
  // changedImage(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }

  uploadFiles(): void {
    this.message = [];
    this.documentId=[];
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  
  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    if (file) {
      this.uploadService.upload(file).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
            console.log("value is "+this.progressInfos[idx].value);

            
            
          } else if (event instanceof HttpResponse) {
            if(this.progressInfos[idx].value>=100)
            {
              console.log("reached here");
              
            const msg = file.name+' uploaded Successfully!';
            this.message.push(msg);

            console.log(this.message);
            
            this.fileInfos = this.uploadService.getFiles();
            console.log("Body is "+event.body);
            var id=event.body;
            this.documentId.push(id);
            console.log(this.documentId);
            

            setTimeout(() => {
              $('#progressbar').fadeOut();
              $('#information').fadeIn();
              $('#submitDocumentbtn').fadeIn();
            }, 400);
            

            setTimeout(() => {
              $('#information').fadeOut();
              this.selectedFiles=undefined;
            }, 1200);


            }
            
          }

         // console.log("last body is "+event.body);
          
        },
        error: (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
          this.fileInfos = this.uploadService.getFiles();
          console.log("error is "+err);
          
        }
      });
    }
  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  

  submitLoan(param: any)
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
      "loanRepaymentMonths": param.value.enterMonths,
      "documentIds":this.documentId
    }

    console.log(this.loanArray);

    let addUsers = this.httpObj.post(this.url + "user/addLoan/"+this.userId, this.loanArray);
    addUsers.subscribe((response)=>{
    console.log(response);

    this.saveInLocal(2,response);
    this.router.navigate(["appliedloan"]);
    
     
    }); 
    


  }



}
