package com.enixone.enixClever.core.handler;

import com.enixone.enixClever.core.exceptions.EnixCleverException;
import com.enixone.enixClever.core.common.Result;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice (annotations = RestController.class)
@RestController
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @Autowired
    SqlSession sqlSession;

//    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = EnixCleverException.class)
    public ResponseEntity<Object> handleEnixCleverException(EnixCleverException e, WebRequest request) {
        Result result = new Result();
        logger.info(">>>>>>> handleEnixCleverException");
        e.printStackTrace();
        
        result.setError(e.getMessage());

        return handleExceptionInternal(
                e, result, new HttpHeaders(),
                HttpStatus.OK, request);
    }

    @ExceptionHandler(value = Exception.class)
    protected ResponseEntity<Object> handleExceptions(Exception ex, WebRequest request) {
        
    	logger.info(">>>>>>> handleExceptions");
    	ex.printStackTrace();
        
    	EnixCleverException exceptionResponse = new EnixCleverException(ex.getMessage());
        return handleExceptionInternal(
                ex, exceptionResponse, new HttpHeaders(),
                HttpStatus.BAD_REQUEST, request);
    }

    @Override
    protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body, HttpHeaders headers, HttpStatus status, WebRequest request) {
    	logger.info(">>>>>>> handleExceptionInternal");
    	ex.printStackTrace();
        
    	return new ResponseEntity<>(body, headers, status);
    }
}
