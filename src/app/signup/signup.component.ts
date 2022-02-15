import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
numberExist:boolean=false;
emailExist:boolean=false;
usernameExist: boolean=false;
jarray:any;
count1:any=0;
count:any=0;
otpcheck:boolean=false;
myvalue: Boolean=false;
url: string = "http://localhost:8090/";
public data:any=[];
userId: string = "";
loginArray:any;
usernameArray:any;
x:any;
userRole:any;

  constructor(private router: Router, private httpObj: HttpClient, private route: ActivatedRoute, private local: LocalStorageService, private session: SessionStorageService) { }

  ngOnInit(): void {
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
    $('#confirmPassword').attr('type','text');
    $('#openeye1').hide();
    $('#closeeye1').show();
    setTimeout(() => {
      $('#confirmPassword').attr('type','password');
    $('#openeye1').show();
    $('#closeeye1').hide();
    }, 1000);
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

  onSubmit(param: any){
    console.log(param.value);
     this.userRole=$('#adminuser').val();
    // let addUser = this.httpObj.post(this.url + "addUser", param.value);
    $('#trigg').click();
    $('#mehta').val(param.value.email);
    this.count1=this.count1+1;
    this.jarray={
      "email":param.value.email,
      "password":param.value.password,
      "username":param.value.username,
      "mobileNumber":param.value.mobileNumber,
      "userRole":this.userRole
    }
    this.loginArray={
      "email":param.value.email,
      "password":param.value.password
    }
    console.log(this.jarray);
    console.log(this.loginArray);
    
    
    
    
     let addUser = this.httpObj.get(this.url + "sendMail/"+ param.value.email);
     addUser.subscribe((response)=>{
     console.log(response);
      
     }); 
    

    
  }

  showAlert()
  {
    
    var minutes = 0;
    var seconds = 59;
// Update the count down every 1 second
 this.x = setInterval(() => {
  if(seconds>9)
  {
  $('#demo').html("(0"+minutes+ ":" + seconds+")");
  $('#demo').fadeIn();
  }
  else{
    $('#demo').html("(0"+minutes+ ":0" + seconds+")");
  }
    seconds=seconds-1;
  // If the count down is over, write some text 
  if (seconds < 0) {
    clearInterval(this.x);
    $('#demo').fadeOut();
    $('#resend').fadeIn();

  }
}, 1000);
$('#pleaseAlert').show();
    setTimeout(() => {
      $('#pleaseAlert').fadeOut();
    },2000);
    
  }

  removeBoot()
  {
    $('#demo').fadeOut();
    clearInterval(this.x);
  }

  resendOTP()
 {
  $('#resend').fadeOut();
  
  var value=$('#mehta').val();
  let addUser = this.httpObj.get(this.url + "sendMail/"+ value);
     addUser.subscribe((response)=>{
     console.log(response);
      
     }); 
  var minutes = 0;
  var seconds = 59;
// Update the count down every 1 second
 this.x = setInterval(() => {
if(seconds>9)
{
$('#demo').html("(0"+minutes+ ":" + seconds+")");
$('#demo').fadeIn(); 
}
else{
  $('#demo').html("(0"+minutes+ ":0" + seconds+")");
}
  seconds=seconds-1;
// If the count down is over, write some text 
if (seconds < 0) {
  clearInterval(this.x);
  $('#demo').fadeOut();
  $('#resend').fadeIn();

}
}, 1000);
$('#pleaseAlert').show();
  setTimeout(() => {
    $('#pleaseAlert').fadeOut();
  },2000);
 }

 checkOtp(otp: any)
 {
   var value=$('#mehta').val();
   if(otp.length==6)
   {
     this.myvalue=true;
   }
   else{
     this.myvalue=false;
   }
   console.log("otp is "+otp +" email is "+value);
   if(otp!=null && otp!=undefined && otp!="")
   {
    let addUser = this.httpObj.get(this.url + "checkOtp/" +value+"/"+otp);
    addUser.subscribe((response)=>{
      console.log(response);
      if(response==true)
      {
        this.otpcheck=true;
      }
      else
      {
        this.otpcheck=false;
      }
     
    });
  }
 }

 storeData()
 {
   console.log(this.jarray);

   console.log(this.userRole);
   
   if(this.userRole=="User")
   {
   
  let addUser = this.httpObj.post(this.url + "user/signup", this.jarray);
  
  addUser.subscribe((response)=>{
    console.log(response);
    $('[data-bs-dismiss=modal]').click();
    let addUsers = this.httpObj.post(this.url + "user/loginId", this.loginArray);
    addUsers.subscribe((response)=>{
    console.log(response);
    this.saveInLocal(1,response);
    this.router.navigate(["customerapplyloan"]);
     
    }); 
    }); 

  }
  else
  {
    let addUser = this.httpObj.post(this.url + "admin/signup", this.jarray);
    addUser.subscribe((response)=>{
    console.log(response);
    $('[data-bs-dismiss=modal]').click();

    this.router.navigate(["requestadminlogin"]);


    }); 



  }
    

 }

 saveInLocal(key: any, val: any): void {
  console.log('recieved= key:' + key + 'value:' + val);
  this.local.set(key, val);
  this.data[key]= this.local.get(key);
 }

 checkNumber(param: any)
 {
   console.log("number is "+param);
   if(param!=null && param!=undefined && param!=""){
    let addUser = this.httpObj.get(this.url + "checkNumber/" +param);
    addUser.subscribe((response)=>{
    console.log(response);
    if(response==true)
    {
      this.numberExist=true;
    }
    else
    {
      this.numberExist=false;
    }
  });
  }
   
 }

 checkEmail(param: any)
 {
   console.log("email is "+param);

   if(param!=null && param!=undefined && param!=""){
    let addUser = this.httpObj.get(this.url + "checkEmail/" +param);
    addUser.subscribe((response)=>{
    console.log(response);
    if(response==true)
    {
      this.emailExist=true;
      
    }
    else
    {
      this.emailExist=false;
     
    }
  }); 
  }
   
 }

 checkUsername(param: any)
 {
   this.usernameArray={
     "username":param
   }
   console.log(this.usernameArray);

   if(param!=null && param!=undefined && param!=""){
    let addUser = this.httpObj.get(this.url + "checkUsername/" +param);
    addUser.subscribe((response)=>{
    console.log(response);
    if(response==true)
    {
      this.usernameExist=true;
    }
    else
    {
      this.usernameExist=false;
    }
  });
  }
   

 }



}
