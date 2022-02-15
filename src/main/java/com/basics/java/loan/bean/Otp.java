package com.basics.java.loan.bean;

public class Otp {
	
	private int id;
	   private String email;
	   private String otp;
	   private String date;
	public Otp(int id, String email, String otp, String date) {
		super();
		this.id = id;
		this.email = email;
		this.otp = otp;
		this.date = date;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getOtp() {
		return otp;
	}
	public void setOtp(String otp) {
		this.otp = otp;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	 

}
