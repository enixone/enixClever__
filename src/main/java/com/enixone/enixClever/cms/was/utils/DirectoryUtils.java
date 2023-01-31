package com.enixone.enixClever.cms.was.utils;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;

public class DirectoryUtils {
    /**
     * 폴더를 생성한다
     *
     * @param targetPath
     * @throws Exception
     */
    public static void createDirectory(String targetPath) throws Exception {
        try {
            Files.createDirectories(Paths.get(targetPath));
        } catch (Exception e) {
            throw e;
        }
    }

    /**
     * 폴더 존재 유무
     * @param targetPath
     * @return
     * @throws Exception
     */
    public static boolean existsDirectory(String targetPath) throws Exception {
        try {
            File file = new File(targetPath);
            return file.exists();
        } catch (Exception e) {
            throw e;
        }
    }
}
