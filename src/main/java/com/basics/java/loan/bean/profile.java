package com.basics.java.loan.bean;

public class profile {
	
	private int profileId;
	private int userId;
	private String name;
	private String number;
	private String email;
	private String address;
	public profile(int profileId, int userId, String name, String number, String email, String address) {
		super();
		this.profileId = profileId;
		this.userId = userId;
		this.name = name;
		this.number = number;
		this.email = email;
		this.address = address;
	}
	public int getProfileId() {
		return profileId;
	}
	public void setProfileId(int profileId) {
		this.profileId = profileId;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}	
	
	
	

}
