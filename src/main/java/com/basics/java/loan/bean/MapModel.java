package com.basics.java.loan.bean;

public class MapModel {

	private int mapId;
	private int userId;
	private int loanId;
	private int documentId;
//	private String status;
	private String dateAdded;
	public MapModel(int mapId, int userId, int loanId, int documentId, String dateAdded) {
		super();
		this.mapId = mapId;
		this.userId = userId;
		this.loanId = loanId;
		this.documentId = documentId;
	
		this.dateAdded = dateAdded;
	}
	public int getMapId() {
		return mapId;
	}
	public void setMapId(int mapId) {
		this.mapId = mapId;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getLoanId() {
		return loanId;
	}
	public void setLoanId(int loanId) {
		this.loanId = loanId;
	}
	public int getDocumentId() {
		return documentId;
	}
	public void setDocumentId(int documentId) {
		this.documentId = documentId;
	}
	
//	public String getStatus() {
//		return status;
//	}
//	public void setStatus(String status) {
//		this.status = status;
//	}
	public String getDateAdded() {
		return dateAdded;
	}
	public void setDateAdded(String dateAdded) {
		this.dateAdded = dateAdded;
	}
	
	
}
