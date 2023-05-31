package com.teranet.teralearning.util;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;


public class DateUtility {
    public static LocalDate getLocalDateFromClock() {
        return LocalDate.now();
    }

    public LocalDateTime getDate(){
        //DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        return now;
    }
    public static DayOfWeek getDayOfWeek(LocalDate localDate) {
        DayOfWeek day = localDate.getDayOfWeek();
        return day;
    }
    public static LocalDate getFirstDayOfMonth() {
        LocalDate firstDayOfMonth = LocalDate.now().with(TemporalAdjusters.firstDayOfMonth());
        return firstDayOfMonth;
    }



}
