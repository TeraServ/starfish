package com.teranet.teralearning.util;

import java.util.HashMap;
import java.util.Map;

public class JsonUtility {
    public Object getJson(Object message,String status){
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", message);
        map.put("status", status);
        return map;
    }
}
