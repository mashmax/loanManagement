import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminappliedloanComponent } from './adminappliedloan/adminappliedloan.component';
import { AdminapprovedloanComponent } from './adminapprovedloan/adminapprovedloan.component';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { AdminrequestComponent } from './adminrequest/adminrequest.component';
import { AppliedloanComponent } from './appliedloan/appliedloan.component';
import { CustomerapplyloanComponent } from './customerapplyloan/customerapplyloan.component';
import { CustomerheaderComponent } from './customerheader/customerheader.component';
import { CustomerloanstatusComponent } from './customerloanstatus/customerloanstatus.component';
import { CustomerprofileComponent } from './customerprofile/customerprofile.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginComponent } from './login/login.component';
import { RepaymentscheduleComponent } from './repaymentschedule/repaymentschedule.component';
import { RequestadminloginComponent } from './requestadminlogin/requestadminlogin.component';
import { SignupComponent } from './signup/signup.component';
import { TestcaseComponent } from './testcase/testcase.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "customerheader", component: CustomerheaderComponent},
  {path: "customerapplyloan", component: CustomerapplyloanComponent},
  {path: "customerloanstatus", component: CustomerloanstatusComponent},
  {path: "customerprofile", component: CustomerprofileComponent},
  {path: "testcase", component: TestcaseComponent},
  {path: "forgotpassword", component: ForgotpasswordComponent},
  {path: "appliedloan", component: AppliedloanComponent},
  {path: "requestadminlogin", component: RequestadminloginComponent},
  {path: "adminheader", component: AdminheaderComponent},
  {path: "adminappliedloan", component: AdminappliedloanComponent},
  {path: "adminapprovedloan", component: AdminapprovedloanComponent},
  {path: "adminrequest", component: AdminrequestComponent},
  {path: "repaymentschedule", component: RepaymentscheduleComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
