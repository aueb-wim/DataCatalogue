package com.admir.demiraj.datacatalogspringboot.service;

import java.util.*;

/** This class if essentially used to return a key (hospital name) and a value (list of versions).
 * Use Case: For a cde version return all hospitals and their respective versions that are associated with that
 * particular cde version. Associated means that a variable maps to a cde variable and thus their versions are associated*/
public class CustomDictionary extends Dictionary {
    public Hashtable hashtable;

    public CustomDictionary(){
        hashtable = new Hashtable();
    }


    @Override
    public int size() {
        return hashtable.size();
    }

    @Override
    public boolean isEmpty() {
        return hashtable.isEmpty();
    }

    @Override
    public Enumeration keys() {
        return hashtable.keys();
    }

    @Override
    public Enumeration elements() {
        return hashtable.elements();
    }

    @Override
    public Object get(Object key) {
        return hashtable.get(key);
    }

    @Override
    public Object put(Object key, Object value) {
        // We have previously added a value
        if(hashtable.contains(key)){
            List versionList = (ArrayList) hashtable.get(key);
            if(!versionList.contains(value)){
                versionList.add(value);
                hashtable.put(key,versionList);

            }


        }else{ // This is the first time that we add a value
            // Create a list that will hold all the versions and this will be our value
            List<Object> versionList = new ArrayList<>();
            versionList.add(value);
            hashtable.put(key,versionList);


        }

        return hashtable;
    }

    @Override
    public Object remove(Object key) {
        return hashtable.remove(key);
    }

    public String concatenateAllKeysToSingleString(){
        String allKeys= "";
        Enumeration enu = hashtable.keys();
        while(enu.hasMoreElements()){
            allKeys = allKeys +" "+ enu.nextElement().toString();
        }
        return allKeys;
    }
}
