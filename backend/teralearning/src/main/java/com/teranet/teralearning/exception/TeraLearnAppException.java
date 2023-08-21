package com.teranet.teralearning.exception;

import lombok.Getter;
import org.springframework.http.ResponseEntity;

@Getter
public class TeraLearnAppException extends RuntimeException{
    private InternalStandardError internalStandardError;
    public TeraLearnAppException(InternalStandardError error) {
        super(error.getErrorMessage());
        this.internalStandardError = error;

    }


}
