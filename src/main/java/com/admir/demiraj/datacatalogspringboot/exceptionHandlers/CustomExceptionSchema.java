package com.admir.demiraj.datacatalogspringboot.exceptionHandlers;

public class CustomExceptionSchema {

    private String message;
    private String details;
    private String nextActions;


    protected CustomExceptionSchema() {}

    public CustomExceptionSchema(
            String message, String details, String nextActions) {
        this.message = message;
        this.details = details;
        this.nextActions = nextActions;

    }

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