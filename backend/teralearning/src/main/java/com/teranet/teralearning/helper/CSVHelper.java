package com.teranet.teralearning.helper;

import com.teranet.teralearning.model.User;
import com.teranet.teralearning.util.DateUtility;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.*;

public class CSVHelper {

    public static String type = "text/csv";
    static String[] headers = {"FirstName","LastName","PhoneNumber", "Email","Stream"};
    public static boolean hasCSVFormat (MultipartFile file){
        if(!type.equals(file.getContentType())){
            return false;
        }
        return true;
    }
    public static List<User> csvToUser(InputStream is){
        try(BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
            CSVParser csvRecords = new CSVParser(bufferedReader,
                    CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());){
        List<User> usersFromCSV = new ArrayList<User>();
        DateUtility dateUtility = new DateUtility();
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        /*Iterable<CSVRecord> csvRecords = csvParser.getRecords();*/
        /*for(CSVRecord csvRecord: csvRecords){
            User user = new User(
                    csvRecord.get("FirstName"),
                    csvRecord.get("LastName"),
                    csvRecord.get("Email"),
                    bCryptPasswordEncoder.encode("Password1!"),
                    Long.parseLong(csvRecord.get("PhoneNumber")),
                    103,
                    csvRecord.get("MethodForMappingStreamFromAcronym"),
                    1,
                    "Student",
                    dateUtility.getDateTime(),
                    dateUtility.getDateTime());
            usersFromCSV.add(user);
        }*/
        return usersFromCSV;
            }
        catch(IOException ex){
            throw new RuntimeException("Failed tp Parse CSV File:"+ex.getMessage());
        }
    }

}
