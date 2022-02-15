package com.basics.java.loan.controller;

import java.io.File;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.basics.java.loan.bean.AdminModel;
import com.basics.java.loan.bean.DocumentModel;
import com.basics.java.loan.bean.LoanApplicantModel;
import com.basics.java.loan.bean.LoanDetails;
import com.basics.java.loan.bean.LoginModel;
import com.basics.java.loan.bean.Otp;
import com.basics.java.loan.bean.UserModel;
import com.basics.java.loan.bean.profile;
import com.basics.java.loan.service.Service;

//@CrossOrigin(origins = "http://localhost:8090")
@RestController
public class Controller {

	
	@Autowired
	Service serve;
	
	@Autowired
	NamedParameterJdbcTemplate jdbcTemplate;
	
	
	class DocumentModelMapper implements RowMapper<DocumentModel> {
		@Override
		public DocumentModel mapRow(ResultSet rs, int rowNum) throws SQLException {
			DocumentModel d = new DocumentModel(rs.getInt("documentId"), rs.getString("documentType"), rs.getString("documentAddress"));
			return d;
		}
	}
	
	
	@RequestMapping(method = RequestMethod.POST, value="/user/signup")
	void saveUser(@RequestBody UserModel user)
	{
		serve.saveUser(user);
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/user/login")
	boolean isUserPresent(@RequestBody LoginModel data)
	{
		return serve.isUserPresent(data);
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/user/loginId")
	int takeUserId(@RequestBody LoginModel data)
	{
		return serve.takeUserId(data);
	}
	
	
	@RequestMapping(method = RequestMethod.POST, value="/admin/signup")
	void saveAdmin(@RequestBody UserModel user)
	{
		serve.saveAdmin(user);
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/admin/login")
	boolean isAdminPresent(@RequestBody LoginModel data)
	{
		return serve.isAdminPresent(data);
	}
	
	@RequestMapping("/sendMail/{email}")
	void sendEmail(@PathVariable("email") String email)
	{
		serve.sendEmail(email);
	}
	
	@RequestMapping("/checkOtp/{email}/{otp}")
	boolean checkOtp(@PathVariable("email") String email, @PathVariable("otp") String otp)
	{
		return serve.checkOtp(email,otp);
	}
	
	@RequestMapping("/checkNumber/{number}")
	boolean checkNumber(@PathVariable("number") String number)
	{
		//System.out.println("value in spring boot: " + number);
		return serve.checkNumber(number);
	}
	
	@RequestMapping("/checkEmail/{email}")
	boolean checkEmail(@PathVariable("email") String email)
	{
		return serve.checkEmail(email);
	}
	
	@RequestMapping("/checkUsername/{username}")
	boolean checkUsername(@PathVariable("username") String username)
	{
		return serve.Username(username);
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/user/updatepassword")
	void updatePassword(@RequestBody LoginModel data)
	{
	   serve.updatePassword(data);
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/user/addDocuments", consumes = { "multipart/form-data" })
	public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
		String message = "";
		try {
			serve.store(file);
			String realname=file.getOriginalFilename();

			String[] words=realname.split("\\.");
			String value=words[words.length-1];
			System.out.println("format is "+value);
			String sql="insert into documentmodel(documentType,documentAddress) values(:documentType,:documentAddress)";
			SqlParameterSource parameterSource=new MapSqlParameterSource("documentType",value)
					.addValue("documentAddress", file.getOriginalFilename());
			jdbcTemplate.update(sql, parameterSource);
			
			String sql1="select * from documentmodel where documentAddress=:documentAddress";
			SqlParameterSource parameterSource2=new MapSqlParameterSource("documentAddress",file.getOriginalFilename());
			List<DocumentModel> list=jdbcTemplate.query(sql1, parameterSource2,new DocumentModelMapper());
			int docId=0;
			if(!list.isEmpty())
			{
				System.out.println("element contains");
				for(DocumentModel documentModel: list)
				{
					docId=documentModel.getDocumentId();
				}
			}
			System.out.println("docID is "+docId);
			String docsId=String.valueOf(docId);
			
			message = docsId ;
			System.out.println("documentId is "+message);
			return ResponseEntity.status(HttpStatus.OK).body(message);
		} catch (Exception e) {
			System.out.println("Exception is "+e);
			message = "Fail to upload Picture " + file.getOriginalFilename() + "!";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);

		}
	}
	
	
	@RequestMapping(method = RequestMethod.POST, value = "/user/addLoan/{userId}")
	String addLoan(@RequestBody LoanApplicantModel data,@PathVariable("userId") String userId)
	{
		return serve.addLoan(data,userId);
	}
	
	
	@RequestMapping("/user/viewLoan/{userId}")
	List<LoanDetails> getLoan(@PathVariable("userId") String userId)
	{
		return serve.getLoan(userId);
	}
	
	@RequestMapping("/user/getDocuments")
	List<DocumentModel> getDocuments()
	{
		return serve.getDocuments();
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/user/editLoan/{loanId}")
	void editLoan(@RequestBody LoanApplicantModel data,@PathVariable("loanId") String loanId)
	{
		 serve.editLoan(data,loanId);
	}
	
	@RequestMapping("/user/deleteLoan/{loanId}")
	void deleteLoan(@PathVariable("loanId") String loanId)
	{
		serve.deleteLoan(loanId);
	}
	
	
	@RequestMapping(method = RequestMethod.POST, value = "/user/editDocuments/{documentId}", consumes = { "multipart/form-data" })
	public ResponseEntity<String> handleFileEditUpload(@RequestParam("file") MultipartFile file, @PathVariable("documentId") String documentId) {
		String message = "";
		try {
			serve.store(file);
			
			String realname=file.getOriginalFilename();
			String[] words=realname.split("\\.");
			String value=words[words.length-1];
			System.out.println("format is "+value);
			
			String sql1="select * from documentmodel where documentId=:documentId";
			SqlParameterSource parameterSource2=new MapSqlParameterSource("documentId",Integer.parseInt(documentId));
			List<DocumentModel> list=jdbcTemplate.query(sql1, parameterSource2, new DocumentModelMapper());
			
			String oldFileName="";
			
			for(DocumentModel documentModel: list)
			{
				oldFileName=documentModel.getDocumentupload();
			}
			
			try  
			{      
				
			File f= new File("C:/Users/mashh/OneDrive/Documents/Mehta/Workspace/Loan/uploads/"+oldFileName);           //file to be delete  
			if(f.delete())                      //returns Boolean value  
			{  
			System.out.println(f.getName() + " deleted");   //getting and printing the file name  
			}  
			else  
			{  
			System.out.println("failed");  
			}  
			}  
			catch(Exception e)  
			{  
			e.printStackTrace();  
			}  
			
			

			String sql="update documentmodel set documentType=:documentType, documentAddress=:documentAddress where documentId=:documentId";
			
			SqlParameterSource parameterSource=new MapSqlParameterSource("documentType",value)
					.addValue("documentAddress", file.getOriginalFilename()).addValue("documentId", Integer.parseInt(documentId));
			
			jdbcTemplate.update(sql, parameterSource);
			
			
			System.out.println("document Id is "+documentId);
			
			message ="file successfully uploaded!" ;
//			System.out.println("documentId is "+message);
			return ResponseEntity.status(HttpStatus.OK).body(message);
		} catch (Exception e) {
			System.out.println("Exception is "+e);
			message = "Fail to upload Picture " + file.getOriginalFilename() + "!";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);

		}
	}
	
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/user/deleteDocuments/{documentId}")
	void deleteDocument(@PathVariable("documentId") String documentId)
	{
		 serve.deleteDocument(documentId);
	}
	
	
	@RequestMapping(method = RequestMethod.POST, value = "/user/addNewDocuments/{loanId}/{userId}", consumes = { "multipart/form-data" })
	public ResponseEntity<String> handleFileAddUpload(@RequestParam("file") MultipartFile file, @PathVariable("loanId") String loanId, @PathVariable("userId") String userId) {
		String message = "";
		try {
			serve.store(file);
			
			String realname=file.getOriginalFilename();
			String[] words=realname.split("\\.");
			String value=words[words.length-1];
			System.out.println("format is "+value);
			
			String sql="insert into documentmodel(documentType,documentAddress) values(:documentType,:documentAddress)";
			SqlParameterSource parameterSource=new MapSqlParameterSource("documentType",value)
					.addValue("documentAddress", file.getOriginalFilename());
			jdbcTemplate.update(sql, parameterSource);
			
			String sql1="select * from documentmodel where documentAddress=:documentAddress";
			SqlParameterSource parameterSource2=new MapSqlParameterSource("documentAddress",file.getOriginalFilename());
			List<DocumentModel> list=jdbcTemplate.query(sql1, parameterSource2,new DocumentModelMapper());
			int docId=0;
			if(!list.isEmpty())
			{
				System.out.println("element contains");
				for(DocumentModel documentModel: list)
				{
					docId=documentModel.getDocumentId();
				}
			}
			System.out.println("docID is "+docId);
			
			String sql2="insert into mapmodel(userId,loanId,documentId) values(:userId,:loanId,:documentId)";
			SqlParameterSource parameterSource3=new MapSqlParameterSource("documentId",docId)
					.addValue("loanId", Integer.parseInt(loanId)).addValue("userId", Integer.parseInt(userId));
			
			jdbcTemplate.update(sql2, parameterSource3);
			
			
			
			
			

			
			System.out.println("loan Id is "+loanId);
			System.out.println("userId is "+userId);
			
			message ="file successfully uploaded!" ;
			System.out.println(message);
//			System.out.println("documentId is "+message);
			return ResponseEntity.status(HttpStatus.OK).body(message);
		} catch (Exception e) {
			System.out.println("Exception is "+e);
			message = "Fail to upload Picture " + file.getOriginalFilename() + "!";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);

		}
	}
	
	
	@RequestMapping("/user/getUserdata/{userId}")
	List<UserModel> getUser(@PathVariable("userId") String userId)
	{
		return serve.getUser(userId);
	}
	
	@RequestMapping("/user/viewLoans/{userId}")
	List<LoanApplicantModel> getLoans(@PathVariable("userId") String userId)
	{
		return serve.getLoans(userId);
	}
	
	@RequestMapping(method = RequestMethod.POST , value="/user/addProfile")
	void addUser(@RequestBody profile pro)
	{
		serve.addUser(pro);
	}
	
	@RequestMapping("/user/getProfile/{userId}")
	List<profile> getProfile(@PathVariable("userId") String userId)
	{
		return serve.getProfile(userId);
	}
	
	@RequestMapping(method=RequestMethod.PUT,value="/user/editProfile/{userId}")
	void editUser(@RequestBody profile pro, @PathVariable("userId") String userId)
	{
		serve.editUser(pro,userId);
	}
	
	@RequestMapping(method= RequestMethod.DELETE,value="/user/deleteProfile/{userId}")
	void deleteUser(@PathVariable("userId") String userId)
	{
		serve.deleteUser(userId);
	}
	
	@RequestMapping("/admin/getAllLoans")
	List<LoanApplicantModel> getAllLoans()
	{
		return serve.getAllLoans();
	}
	
	@RequestMapping("/admin/getAllRequest")
	List<AdminModel> getAllRequest()
	{
		return serve.getAllRequest();
	}
	
	
	
	
	
}
