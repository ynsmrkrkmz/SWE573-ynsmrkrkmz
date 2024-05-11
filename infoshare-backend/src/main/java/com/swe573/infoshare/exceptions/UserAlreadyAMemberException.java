package com.swe573.infoshare.exceptions;

public class UserAlreadyAMemberException extends RuntimeException {
    public UserAlreadyAMemberException(String email) {
        super(String.format("Invited user by %s already exists", email));
    }
}
