package com.basics.java.loan.bean;

public class UserModel {
	
	private int userId;
	private String email;
	private String password;
	private String username;
	private String mobileNumber;
	private String userRole;
//	private String address;
	public UserModel(int userId, String email, String password, String username, String mobileNumber, String userRole) {
		super();
		this.userId = userId;
		this.email = email;
		this.password = password;
		this.username = username;
		this.mobileNumber = mobileNumber;
		this.userRole = userRole;
//		this.address=address;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
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
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getNumber() {
		return mobileNumber;
	}
	public void setNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	public String getUserRole() {
		return userRole;
	}
	public void setUserRole(String userRole) {
		this.userRole = userRole;
		
	}
//	public String getAddress() {
//		return address;
//	}
//	public void setAddress(String address) {
//		this.address = address;
//	}
	
	
	
	

}
