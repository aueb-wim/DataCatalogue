package com.admir.demiraj.datacatalogspringboot.exceptionHandlers;

public class CustomException extends RuntimeException {
    private String message;
    private String details;
    private String nextActions;

    protected CustomException() {}

    public CustomException(
            String message, String details, String nextActions) {
        this.message = message;
        this.details = details;
        this.nextActions = nextActions;

    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }


    public String getNextActions() {
        return nextActions;
    }

    public void setNextActions(String nextActions) {
        this.nextActions = nextActions;
    }






}