package com.basics.java.loan.bean;

public class AdminModel {
	
	private int adminId;
	private String email;
	private String password;
	private String mobileNumber;
	private String userRole;
	public AdminModel(int adminId, String email, String password, String mobileNumber, String userRole) {
		super();
		this.adminId = adminId;
		this.email = email;
		this.password = password;
		this.mobileNumber = mobileNumber;
		this.userRole = userRole;
	}
	public int getAdminId() {
		return adminId;
	}
	public void setAdminId(int adminId) {
		this.adminId = adminId;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getMobileNumber() {
		return mobileNumber;
	}
	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	public String getUserRole() {
		return userRole;
	}
	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}
	
	

}
