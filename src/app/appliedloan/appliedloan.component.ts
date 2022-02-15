import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'angular-web-storage';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-appliedloan',
  templateUrl: './appliedloan.component.html',
  styleUrls: ['./appliedloan.component.css']
})
export class AppliedloanComponent implements OnInit {
  loanId:any;
  url: string = "http://localhost:8090/";
  public data:any=[];
  userId: string = "";
  constructor(private router: Router, private httpObj: HttpClient, private route: ActivatedRoute, private local: LocalStorageService, private session: SessionStorageService, private uploadService: UploadFileService) { }

  ngOnInit(): void {

    this.userId=this.getFromLocal(1);
    if(this.userId==null)
    {
      this.router.navigate([""]);
    }
    else
    {
      this.loanId=this.getFromLocal(2);
      if(this.loanId==null)
      {
        this.router.navigate([""]);
      }
    }
  }


  getFromLocal(key: any): any {
    console.log('recieved= key:' + key);
    this.data[key]= this.local.get(key);
    console.log(this.data);
    return this.data[key];
   }

   backtoLoan()
   {
    localStorage.removeItem('2');
    this.router.navigate(["customerapplyloan"]);
   }



}
