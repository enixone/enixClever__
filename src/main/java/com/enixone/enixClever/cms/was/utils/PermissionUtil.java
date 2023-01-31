package com.enixone.enixClever.cms.was.utils;

import com.enixone.enixClever.cms.was.model.AssignPermissionVO;
import com.enixone.enixClever.cms.was.model.DocumentVO;
import com.enixone.enixClever.cms.was.model.FolderVO;
import com.enixone.enixClever.cms.was.model.PermissionInfo;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class PermissionUtil {
    /**
     * 목록 조회가 가능한 권한 아이디 조회
     * @param list
     * @return
     */
    public static List<String> getListViewPermission(List<AssignPermissionVO> list) {
        List<String> permissionIdList = new ArrayList<>();

        for (AssignPermissionVO vo : list) {
            if (StringUtils.equals(vo.getListView(), "Y")) {
                permissionIdList.add(vo.getPermissionId());
            }
        }

        return permissionIdList;
    }

    
    public static int getMaxPermission(AssignPermissionVO vo) {

    	int rtnVal = 0;
    	
    	if(vo.getRead().equals("Y"))		rtnVal += 1;
    	if(vo.getUpdate().equals("Y"))		rtnVal += 2;
    	if(vo.getDelete().equals("Y"))		rtnVal += 4;
    	if(vo.getCreate().equals("Y"))		rtnVal += 8;
    	if(vo.getDownload().equals("Y"))	rtnVal += 15;
    	

        return rtnVal;
    }
    
    
    
    
    /**
     * 폴더에 권한을 설정한다
     * @param folderList
     * @param permissionList
     */
    public static void setFolderPermission(List<FolderVO> folderList, List<AssignPermissionVO> permissionList) {

        for (FolderVO folder : folderList) {
            String permissionId = folder.getPermissionId();

            for (AssignPermissionVO permission : permissionList) {
                if (StringUtils.equals(permission.getPermissionId(), permissionId)) {
                    folder.setPermissionInfo(new PermissionInfo(permission));
                }
            }
        }
    }

    /**
     * 폴더에 전체 권한을 할당한다
     * @param folderList
     */
    public static void setAdminPermissionToFolder(List<FolderVO> folderList) {
        for (FolderVO folder : folderList) {
            PermissionInfo permission = new PermissionInfo();
            permission.setRead(true);
            permission.setCreate(true);
            permission.setUpdate(true);
            permission.setDelete(true);
            permission.setListView(true);
            permission.setPermission(true);
            permission.setDownload(true);

            folder.setPermissionInfo(permission);
        }
    }

    /**
     * 문서에 전체 권한을 할당한다
     * @param docList
     */
    public static void setAdminPermissionToDoc(List<DocumentVO> docList) {
        for (DocumentVO doc : docList) {
            PermissionInfo permission = new PermissionInfo();
            permission.setRead(true);
            permission.setCreate(true);
            permission.setUpdate(true);
            permission.setDelete(true);
            permission.setListView(true);
            permission.setPermission(true);
            permission.setDownload(true);

            doc.setPermissionInfo(permission);
        }
    }

    /**
     * 문서에 권한을 설정한다
     * @param docList
     * @param permissionList
     */
    public static void setDocPermission(List<DocumentVO> docList, List<AssignPermissionVO> permissionList) {

        for (DocumentVO doc : docList) {
            String permissionId = doc.getPermissionId();

            for (AssignPermissionVO permission : permissionList) {
                if (StringUtils.equals(permission.getPermissionId(), permissionId)) {
                    doc.setPermissionInfo(new PermissionInfo(permission));
                }
            }
        }
    }
}
