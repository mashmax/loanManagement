import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AngularWebStorageModule } from 'angular-web-storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CustomerheaderComponent } from './customerheader/customerheader.component';
import { CustomerapplyloanComponent } from './customerapplyloan/customerapplyloan.component';
import { CustomerloanstatusComponent } from './customerloanstatus/customerloanstatus.component';
import { CustomerprofileComponent } from './customerprofile/customerprofile.component';
import { TestcaseComponent } from './testcase/testcase.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { AppliedloanComponent } from './appliedloan/appliedloan.component';
import { RequestadminloginComponent } from './requestadminlogin/requestadminlogin.component';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { AdminappliedloanComponent } from './adminappliedloan/adminappliedloan.component';
import { AdminapprovedloanComponent } from './adminapprovedloan/adminapprovedloan.component';
import { AdminrequestComponent } from './adminrequest/adminrequest.component';
import { RepaymentscheduleComponent } from './repaymentschedule/repaymentschedule.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CustomerheaderComponent,
    CustomerapplyloanComponent,
    CustomerloanstatusComponent,
    CustomerprofileComponent,
    TestcaseComponent,
    ForgotpasswordComponent,
    AppliedloanComponent,
    RequestadminloginComponent,
    AdminheaderComponent,
    AdminappliedloanComponent,
    AdminapprovedloanComponent,
    AdminrequestComponent,
    RepaymentscheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularWebStorageModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
