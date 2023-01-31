package com.enixone.enixClever.cms.was.utils;

import com.enixone.enixClever.core.exceptions.EnixCleverException;

public class VersionUtils {
    public static String versionUp(String type, String currentVersion) throws Exception {
        String[] tokens = currentVersion.split("\\.");

        int major = 0;
        int minor = 0;

        if (tokens.length == 1) {
            major = Integer.parseInt(tokens[0]);
        } else if (tokens.length == 2) {
            major = Integer.parseInt(tokens[0]);
            minor = Integer.parseInt(tokens[1]);
        } else {
            throw new EnixCleverException("버전 정보가 정확하지 않습니다. 버전 : " + currentVersion);
        }

        switch (type) {
            case "MAJOR" :
                major++;
                break;
            case "MINOR" :
                minor++;
                break;
        }

        return String.format("%d.%d", major, minor);
    }

    public static String versionDown(String type, String currentVersion) throws Exception {
        String[] tokens = currentVersion.split("\\.");

        int major = 0;
        int minor = 0;

        if (tokens.length == 1) {
            major = Integer.parseInt(tokens[0]);
        } else if (tokens.length == 2) {
            major = Integer.parseInt(tokens[0]);
            minor = Integer.parseInt(tokens[1]);
        } else {
            throw new EnixCleverException("버전 정보가 정확하지 않습니다. 버전 : " + currentVersion);
        }

        switch (type) {
            case "MAJOR" :
                major--;
                break;
            case "MINOR" :
                if (minor == 0) {
                    major--;
                } else {
                    minor--;
                }
                break;
        }

        return String.format("%d.%d", major, minor);
    }
}
