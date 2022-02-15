package com.basics.java.loan.bean;

public class DocumentModel {
	
	private int documentId;
	private String documenttype;
	private String documentupload;
	public DocumentModel(int documentId, String documenttype, String documentupload) {
		super();
		this.documentId = documentId;
		this.documenttype = documenttype;
		this.documentupload = documentupload;
	}
	public int getDocumentId() {
		return documentId;
	}
	public void setDocumentId(int documentId) {
		this.documentId = documentId;
	}
	public String getDocumenttype() {
		return documenttype;
	}
	public void setDocumenttype(String documenttype) {
		this.documenttype = documenttype;
	}
	public String getDocumentupload() {
		return documentupload;
	}
	public void setDocumentupload(String documentupload) {
		this.documentupload = documentupload;
	}
	
	

}
