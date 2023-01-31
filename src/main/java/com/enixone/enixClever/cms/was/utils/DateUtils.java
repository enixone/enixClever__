package com.enixone.enixClever.cms.was.utils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtils {

    public static String getIntervalDate(String intervalCode) throws Exception {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());

        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");

        switch (intervalCode) {
            case "1DAY" :
                cal.add(Calendar.DATE, 1);
                break;
            case "3DAY" :
                cal.add(Calendar.DATE, 3);
                break;
            case "7DAY" :
                cal.add(Calendar.DATE, 7);
                break;
            case "1MONTH" :
                cal.add(Calendar.MONTH, 1);
                break;
        }

        return df.format(cal.getTime());
    }

    public static String[] getFullDayRange(String date) {
        String[] range = new String[2];

        range[0] = date + " 00:00:00";
        range[1] = date + " 23:59:59";

        return range;
    }

    public static String getToday() {
        Calendar cal = Calendar.getInstance();

        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
 
        return df.format(cal.getTime());
    }
    
    public static String parseDateStart(String date) throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date tempDate = sdf.parse(date);

        Calendar cal = Calendar.getInstance();
        cal.setTime(tempDate);

        return sdf.format(cal.getTime()) + " 00:00:00";
    }

    public static String parseDateEnd(String date) throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date tempDate = sdf.parse(date);

        Calendar cal = Calendar.getInstance();
        cal.setTime(tempDate);

        return sdf.format(cal.getTime()) + " 23:59:59";
    }

    public static boolean isExpired(String date) throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        sdf.setLenient(false);

        Date expiry = sdf.parse(date);
        return expiry.before(new Date());
    }
}
