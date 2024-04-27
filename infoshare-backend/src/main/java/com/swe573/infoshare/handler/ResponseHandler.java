package com.swe573.infoshare.handler;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import io.micrometer.common.lang.Nullable;

public class ResponseHandler {
    ResponseHandler(){}
    
	public static ResponseEntity<Object> generateResponse(String message, HttpStatus status,@Nullable Object responseObj) {
		Map<String, Object> map = new HashMap<>();
		Map<String, Object> meta = new HashMap<>();
		meta.put("status", status.value());
		meta.put("message", message);
		map.put("meta", meta);
		map.put("data", responseObj);

		return new ResponseEntity<>(map, status);
	}
}
