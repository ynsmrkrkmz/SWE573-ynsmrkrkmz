package com.swe573.infoshare.exceptions;

public class InvitationAlreadyExistException extends RuntimeException {

    public InvitationAlreadyExistException(String email) {
        super("Pending invitation already exists for " + email);
    }
}
