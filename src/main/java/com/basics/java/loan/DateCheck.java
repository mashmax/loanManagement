package com.basics.java.loan;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;

//import com.sun.tools.javac.parser.ReferenceParser.ParseException;
import java.text.SimpleDateFormat;
import java.text.SimpleDateFormat;  
import java.util.Date; 
public class DateCheck {
	public boolean validDate(String dateStart)
	{
//		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		Date d1 = null;
		Date d2 = new Date();

		try {
			d1 = format.parse(dateStart);
			//d2 = format.parse(dateStop);
		}
		 catch (java.text.ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("d1 : " + d1);
		System.out.println("d2 : " + d2);
		System.out.println(d2.getTime());
		// Get msec from each, and subtract.
		long diff = d2.getTime() - d1.getTime();
		long diffSeconds = diff / 1000;
		long diffMinutes = diff / (60 * 1000);
		long diffHours = diff / (60 * 60 * 1000);
        
        if(diffSeconds<=300)
        {
        	return true;
        }
        else
        {
        	return false;
        }
        
	
	}

}

