package com.enixone.enixClever.cms.was.utils;

import org.apache.commons.lang3.StringUtils;

import java.lang.reflect.Array;
import java.util.List;
import java.util.Map;
import java.util.Random;

public class CommonUtil {

    /**
     * Object type 변수가 비어있는지 체크
     *
     * @param obj
     * @return Boolean : true / false
     */
    public static Boolean empty(Object obj) {
        if (obj instanceof String) return obj == null || "".equals(obj.toString().trim());
        else if (obj instanceof List) return obj == null || ((List<?>) obj).isEmpty();
        else if (obj instanceof Map) return obj == null || ((Map<?, ?>) obj).isEmpty();
        else if (obj instanceof Object[]) return obj == null || Array.getLength(obj) == 0;
        else return obj == null;
    }

    /**
     * Object type 변수가 비어있지 않은지 체크
     *
     * @param obj
     * @return Boolean : true / false
     */
    public static Boolean notEmpty(Object obj) {
        return !empty(obj);
    }

    /**
     * 같은지 체크한다
     * @param src
     * @param des
     * @return
     */
    public static boolean equal(String src, String des) {
        return StringUtils.equals(src, des);
    }

    private static int URL_LINK_LENGTH = 8;
    private static char[] URL_TOKENS = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'};
    public static String getUrlLink() {
        Random rand = new Random();
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < URL_LINK_LENGTH; i++) {
            char token = URL_TOKENS[rand.nextInt(URL_TOKENS.length)];
            sb.append(token);
        }

        return sb.toString();
    }
}
