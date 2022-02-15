import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  url: string = "http://localhost:8090/";
  constructor(private router: Router, private httpObj: HttpClient, private route: ActivatedRoute, private local: LocalStorageService, private session: SessionStorageService) { }
  count:any=0;
  count1:any=0;
otpcheck:boolean=false;
myvalue: Boolean=false;
x:any;
y:any;
loginArray:any;
  ngOnInit(): void {
  }
  submitEmail(param: any)
  {
    console.log("email is "+param);
   
    
    let addUser = this.httpObj.get(this.url + "checkEmail/" +param);
    addUser.subscribe((response)=>{
    console.log(response);
    if(response==true)
    {

      $('#trigg').click();
      $('#mehta').val(param);

  
    
     let addUser = this.httpObj.get(this.url + "sendMail/"+ param);
     addUser.subscribe((response)=>{
     console.log(response);
      
     }); 
    

      
    }
    else
    {
      $('#invalidUser').fadeIn();
      setTimeout(() => {
        $('#invalidUser').fadeOut();
      }, 1200);
     
    }
  }); 


    
  }

  showAlert()
  {
    
    
    // $('#resend').fadeOut();
    // $('#demo').fadeIn(); 
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
    },1200);
    
  }

  removeBoot()
  {
    $('#demo').fadeOut();
    clearInterval(this.x);
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
  },1200);
 }

 storeData()
 {
  $('[data-bs-dismiss=modal]').click();
  $('#firstshow').hide();
  $('#secondshow').show();
    

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

  submitPassword(param: any)
  {
    var email=$('#mehta').val();

    this.loginArray={
      "email":email,
      "password":param
    }

    console.log(this.loginArray);

    let addUser = this.httpObj.post(this.url + "user/updatepassword",this.loginArray);
    addUser.subscribe((response)=>{
    console.log(response);
     
     $('#updateSuccess').fadeIn();
     setTimeout(() => {
      $('#updateSuccess').fadeOut();
       this.router.navigate([""]);
     }, 1200);
    }); 
    


    
  }


}
