package com.swe573.infoshare.exceptions;

public class UnauthorizedActionException extends RuntimeException {
    public UnauthorizedActionException() {
        super("You do not have permission to execute this action");
    }
}
