package com.enixone.enixClever.cms.was.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.io.FilenameUtils;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;

public class FileUtils {
    /**
     * 파일 저장
     * @param path
     * @param content
     * @return
     * @throws Exception
     */
    public static long writeFile(String path, String content) throws Exception {
        File file = new File(path);

        FileWriter fw = new FileWriter(file);
        fw.write(content);
        fw.close();

        return file.length();
    }

    /**
     * 파일 읽기
     * @param path
     * @return
     * @throws Exception
     */
    public static String readFile(String path) throws Exception {
        File file = new File(path);
        BufferedReader reader = new BufferedReader(new FileReader(file));

        String ret = "";
        String temp = reader.readLine();

        while (temp != null) {
            ret += "\n" + temp;

            temp = reader.readLine();
        }

        reader.close();
        return ret;
    }

    /**
     * 파일 크기 조회
     * @param path
     * @return
     * @throws Exception
     */
    public static long getFileSize(String path) throws Exception {

        return Files.size(Paths.get(path));
    }

    /**
     * 파일이 존재하는지 체크한다
     * @param path
     * @return
     * @throws Exception
     */
    public static boolean existsFile(String path) throws Exception {
        File file = new File(path);

        return file.exists();
    }

    /**
     * 파일을 읽어서 JSON으로 파싱한다
     * @param path
     * @return
     * @throws Exception
     */
    public static JsonNode readFileToJson(String path) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(new File(path));

        return root;
    }

    /**
     * 파일 삭제
     * @param path
     * @throws Exception
     */
    public static void deleteFile(String path) throws Exception {
        File file = new File(path);

        if (file.exists()) {
            file.delete();
        }
    }

    /**
     * 파일 복사
     * @param srcPath
     * @param targetPath
     * @throws Exception
     */
    public static void copyFile(String srcPath, String targetPath) throws Exception {
        InputStream is = null;
        OutputStream os = null;
        try {
            is = new FileInputStream(srcPath);
            os = new FileOutputStream(targetPath);
            byte[] buffer = new byte[1024];
            int length;
            while ((length = is.read(buffer)) > 0) {
                os.write(buffer, 0, length);
            }
        } finally {
            is.close();
            os.close();
        }
    }

    /**
     * 파일 이동
     * @param srcPath
     * @param targetPath
     * @throws Exception
     */
    public static void moveFile(String srcPath, String targetPath) throws Exception {
        File file = new File(srcPath);
        File desFile = new File(targetPath);

        file.renameTo(desFile);
    }

    /**
     * 파일 명 추출
     * @param fileName
     */
    public static String getFileBaseName(String fileName) {
        return FilenameUtils.getBaseName(fileName);
    }

    /**
     * 파일 확장자 조회
     * @param fileName
     */
    public static String getFileExtension(String fileName) {
        return FilenameUtils.getExtension(fileName);
    }

    /**
     * 폴더 경로 조회
     * @param filePath
     * @return
     */
    public static String getFileFolderPath(String filePath) {
        return new File(filePath).getParent();
    }
}
