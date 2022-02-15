package com.basics.java.loan.bean;

public class LoanDetails {
	
	private int loanId;
	private String loantype;
	private String applicantName;
	private String applicantAddress;
	private String applicantMobile;
	private String applicantEmail;
	private String applicantAadhaar;
	private String applicantPan;
	private String applicantSalary;
	private String loanAmountRequired;
	private String loanRepaymentMonths;
	private int userId;

	private int documentId;
	private String status;
	public LoanDetails(int loanId, String loantype, String applicantName, String applicantAddress,
			String applicantMobile, String applicantEmail, String applicantAadhaar, String applicantPan,
			String applicantSalary, String loanAmountRequired, String loanRepaymentMonths, int userId, int documentId,
			String status) {
		super();
		this.loanId = loanId;
		this.loantype = loantype;
		this.applicantName = applicantName;
		this.applicantAddress = applicantAddress;
		this.applicantMobile = applicantMobile;
		this.applicantEmail = applicantEmail;
		this.applicantAadhaar = applicantAadhaar;
		this.applicantPan = applicantPan;
		this.applicantSalary = applicantSalary;
		this.loanAmountRequired = loanAmountRequired;
		this.loanRepaymentMonths = loanRepaymentMonths;
		this.userId = userId;
		this.documentId = documentId;
		this.status = status;
	}
	public int getLoanId() {
		return loanId;
	}
	public void setLoanId(int loanId) {
		this.loanId = loanId;
	}
	public String getLoantype() {
		return loantype;
	}
	public void setLoantype(String loantype) {
		this.loantype = loantype;
	}
	public String getApplicantName() {
		return applicantName;
	}
	public void setApplicantName(String applicantName) {
		this.applicantName = applicantName;
	}
	public String getApplicantAddress() {
		return applicantAddress;
	}
	public void setApplicantAddress(String applicantAddress) {
		this.applicantAddress = applicantAddress;
	}
	public String getApplicantMobile() {
		return applicantMobile;
	}
	public void setApplicantMobile(String applicantMobile) {
		this.applicantMobile = applicantMobile;
	}
	public String getApplicantEmail() {
		return applicantEmail;
	}
	public void setApplicantEmail(String applicantEmail) {
		this.applicantEmail = applicantEmail;
	}
	public String getApplicantAadhaar() {
		return applicantAadhaar;
	}
	public void setApplicantAadhaar(String applicantAadhaar) {
		this.applicantAadhaar = applicantAadhaar;
	}
	public String getApplicantPan() {
		return applicantPan;
	}
	public void setApplicantPan(String applicantPan) {
		this.applicantPan = applicantPan;
	}
	public String getApplicantSalary() {
		return applicantSalary;
	}
	public void setApplicantSalary(String applicantSalary) {
		this.applicantSalary = applicantSalary;
	}
	public String getLoanAmountRequired() {
		return loanAmountRequired;
	}
	public void setLoanAmountRequired(String loanAmountRequired) {
		this.loanAmountRequired = loanAmountRequired;
	}
	public String getLoanRepaymentMonths() {
		return loanRepaymentMonths;
	}
	public void setLoanRepaymentMonths(String loanRepaymentMonths) {
		this.loanRepaymentMonths = loanRepaymentMonths;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getDocumentId() {
		return documentId;
	}
	public void setDocumentId(int documentId) {
		this.documentId = documentId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	

}
