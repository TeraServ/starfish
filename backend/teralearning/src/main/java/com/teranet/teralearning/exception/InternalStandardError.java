package com.teranet.teralearning.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum InternalStandardError {
    INVALID_EMAIL("Email is invalid","M001",HttpStatus.NOT_FOUND),
    INVALID_EMAIL_OR_PASSWORD("Invalid Email or Password ","M003",HttpStatus.NOT_FOUND),
    LOGIN_SUCCESSFULLY("Login successfully","M004",HttpStatus.OK),
    REGISTERED_SUCCESSFULLY("Registered successfully","M007",HttpStatus.OK),
    USER_ALREADY_EXIST("User already exists ","M008",HttpStatus.UNPROCESSABLE_ENTITY),
    SOMETHING_WENT_WRONG("Something went wrong","M009",HttpStatus.BAD_REQUEST),
    PASSWORD_CHANGED_SUCCESSFULLY("Password changed successfully","M012",HttpStatus.OK),
    DATA_NOT_FOUND("No data","M014",HttpStatus.NOT_FOUND),
    UPDATED_SUCCESSFULLY("Updated Successfully", "M016",HttpStatus.OK),
    RECORD_DELETED("Record Deleted!!","M018",HttpStatus.OK),
    USER_SUSPENDED("User Suspended","M019",HttpStatus.OK),
    TOKEN_EXPIRED("Token Expired","M021",HttpStatus.UNAUTHORIZED),
    TOKEN_VALID("Valid Reset Token","M022",HttpStatus.OK),
    TOKEN_INVALID("Invalid Reset Token","M023",HttpStatus.NOT_FOUND),
    USER_NOT_FOUND("User Not Found!","M024",HttpStatus.NOT_FOUND);


    private final String errorMessage;
    private final String logCode;
    private final HttpStatus httpStatus;

}
