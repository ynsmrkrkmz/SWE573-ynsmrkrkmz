package com.swe573.infoshare.exceptions;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String email) {
        super("User could not found by email: " + email);
    }
}
