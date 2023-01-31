package com.enixone.enixClever.cms.was.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.enixone.enixClever.cms.was.base.BaseService;
import com.enixone.enixClever.cms.was.base.Constants;
import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.AssignPermissionVO;
import com.enixone.enixClever.cms.was.model.DocumentBookmarkVO;
import com.enixone.enixClever.cms.was.model.DocumentReClassficationVO;
import com.enixone.enixClever.cms.was.model.DocumentTypeItemVO;
import com.enixone.enixClever.cms.was.model.DocumentVO;
import com.enixone.enixClever.cms.was.model.FileVO;
import com.enixone.enixClever.cms.was.model.FolderVO;
import com.enixone.enixClever.cms.was.model.PermissionInfo;
import com.enixone.enixClever.cms.was.model.WorkFlowVO;
import com.enixone.enixClever.cms.was.utils.CommonUtil;
import com.enixone.enixClever.cms.was.utils.PermissionUtil;
import com.enixone.enixClever.cms.was.utils.VersionUtils;
import com.enixone.enixClever.core.common.GenerateKey;
import com.enixone.enixClever.core.exceptions.EnixCleverException;

@Service
@Transactional
public class DocumentService extends BaseService {

    @Autowired
    FileService fileService;

    @Autowired
    DocumentHistoryService docHistoryService;

    @Autowired
    WorkFlowService workflowService;

    
    public DocumentVO selectDocInfo(String docId, boolean isRecord) throws Exception {
        // 문서 기본 정보 조회
        DocumentVO vo = docDao.selectDocInfo(docId);

        if (vo == null) {
            throw new EnixCleverException("문서 정보가 없습니다.");
        }
        
        // 사용자의 문서 권한 조회
        AssignPermissionVO permissionInfo = permissionDao.getUserPermission(vo.getPermissionId(), getSessionUserKey());
        
        if(!vo.getOwnerId().equals(getSessionUserKey())) {
        
	        if (!CommonUtil.empty(permissionInfo.getRead())) {
	        	if(PermissionUtil.getMaxPermission(permissionInfo) < 1)	throw new EnixCleverException("문서 열람권한이 없습니다.");
	        }else {
	        	throw new EnixCleverException("권한 정보가 없습니다.");
	        }
        
        }
	        
        // 문서 폴더 경로 조회
        FolderVO folderVO = folderDao.selectFolderInfoByDocId(docId);
        vo.setFolderId(folderVO.getFolderId());
        vo.setFullPath(folderVO.getFullPath());

        // 문서 첨부파일 조회
        List<FileVO> fileList = fileDao.selectFileListByDocId(docId);
        vo.setFileCount(fileList.size());
        vo.setFileList(fileList);

        // 문서 유형 속성 조회
        List<DocumentTypeItemVO> documentTypeItemList = typeDao.selectDocumentTypeItemList(docId);
        vo.setDocTypeItemList(documentTypeItemList);

        // 문서 권한 저장
        vo.setPermissionInfo(new PermissionInfo(permissionInfo));

        // [이력] - 일반적인 조회일 때만 문서 이력을 남김다
        String actionCode = Constants.ACTION_READ;
        
        if("PROMOTION".equals(vo.getStatusCode())){
        	 actionCode = Constants.ACTION_READ_APPROVAL;
        }
        
        docHistoryService.insertDocumentHistory(getUserInfo(), vo.getDocId(), vo.getDocName(), actionCode, getRequestIp(), isRecord);
        
        return vo;
    }

    public DocumentVO selectDocInfoWithoutHistory(String docId) throws Exception {
        // 문서 기본 정보 조회
        DocumentVO vo = docDao.selectDocInfo(docId);

        if (vo == null) {
            throw new EnixCleverException("문서 정보가 없습니다.");
        }

        // 문서 폴더 경로 조회
        FolderVO folderVO = folderDao.selectFolderInfoByDocId(docId);
        vo.setFolderId(folderVO.getFolderId());
        vo.setFullPath(folderVO.getFullPath());

        // 문서 첨부파일 조회
        List<FileVO> fileList = fileDao.selectFileListByDocId(docId);
        vo.setFileCount(fileList.size());
        vo.setFileList(fileList);

        // 문서 유형 속성 조회
        List<DocumentTypeItemVO> documentTypeItemList = typeDao.selectDocumentTypeItemList(docId);
        vo.setDocTypeItemList(documentTypeItemList);

        return vo;
    }

    public List<DocumentVO> selectAllVersionDocInfo(String docId) {
        return docDao.selectAllVersionDocInfo(docId);
    }

    public List<DocumentVO> selectMyDocListByFolderId(String folderId, String userKey, PaginationVO paging) {
        List<DocumentVO> docList = new ArrayList<>();

        paging.setOrderKey(convertColumeName(paging.getOrderKey()));
        
        //------------------------------------------------------------
        // 1. 권한에 해당된 문서 조회
        //------------------------------------------------------------

        // 목록 보기 권한이 있을 경우에만 조회한다
        docList = docDao.selectDocListByFolderId(folderId, null, paging);

        //------------------------------------------------------------
        // 2. 조회된 문서에 마스터 권한을 설정한다
        //------------------------------------------------------------
        PermissionUtil.setAdminPermissionToDoc(docList);

        return docList;
    }

    
    public String convertColumeName(String aliasColumeName) {
    	
    	String cName = aliasColumeName;
    	
    	if(cName.equals("docName"))				cName = "ED.DOC_NAME";
    	else if(cName.equals("statusCode"))		cName = "ED.STATUS_CODE";
    	else if(cName.equals("version"))		cName = "ED.VERSION";
    	else if(cName.equals("creatorName"))	cName = "ED.CREATOR_NAME";
    	else if(cName.equals("createDate"))		cName = "ED.CREATE_DATE";
    	
    	return cName;
    	
    }
    
    
    public List<DocumentVO> selectDocListByFolderId(String folderId, PaginationVO paging) throws Exception{
        List<DocumentVO> docList = new ArrayList<>();

        //------------------------------------------------------------
        // 1. 권한 조회 및 계산
        //------------------------------------------------------------

        // 폴더에 등록된 문서의 권한 아이디 목록을 조회한다
        List<String> docPermissionIdList = docDao.selectPermissionIdListByDocFolderId(folderId);
        List<AssignPermissionVO> permissionInfoList = new ArrayList<>();

        // 권한을 계산하여 조회한다
        for (String docPermissionId : docPermissionIdList) {
            permissionInfoList.add(permissionDao.getUserPermission(docPermissionId, getSessionUserKey()));
        }

        // 목록 조회가 가능한 권한 목록
        List<String> listViewPermissions = PermissionUtil.getListViewPermission(permissionInfoList);

        //------------------------------------------------------------
        // 2. 권한에 해당된 문서 조회
        //------------------------------------------------------------

        // 목록 보기 권한이 있을 경우에만 조회한다
        if (listViewPermissions.size() > 0) {
            docList = docDao.selectDocListByFolderId(folderId, listViewPermissions, paging);
        }


        //------------------------------------------------------------
        // 3. 조회된 폴더에 권한을 설정한다
        //------------------------------------------------------------
        PermissionUtil.setDocPermission(docList, permissionInfoList);

        return docList;
    }

    public String insertDocument(DocumentVO vo) throws Exception {
        
    	logger.debug("STEP 1 ------ 문서 등록 시작");
    	
    	GenerateKey genKey = GenerateKey.getInstance();
    	vo.setDocId(genKey.getKey("06"));
    	
    	// 생성자 아이디 지정
        if (StringUtils.isBlank(vo.getCreatorId())) {
            // 로그인 유저를 생성자로 지정한다
            vo.setCreatorId(getSessionUserKey());
            vo.setCreatorName(getSessionUserName());
        }

        vo.setVersion("1.0");
        //vo.setStatusCode("ACTIVE");

        logger.debug("STEP 2 ------ [폴더-문서] 맵핑");
        // [폴더 - 문서] 맵핑 등록
        folderDao.insertMappingFolderDoc(vo.getFolderId(), vo.getDocId());

        logger.debug("> vo.getFolderId()=" + vo.getFolderId() + "");
        
        logger.debug("STEP 3 ------ 첨부가 있을경우");
        // [문서 - 파일] 맵핑 등록 (첨부 전체 목록)
        if (vo.getFileCount() > 0) {
            logger.debug("STEP 3-1 ------ 첨부 순환 시작");
            for (FileVO fileVO : vo.getFileList()) {

                logger.debug("STEP 3-2 ------ 파일 정보 등록");
                // [파일] 정보 등록
                fileService.insertFile(fileVO);

                logger.debug("STEP 3-2 ------ [문서-파일] 맵핑 등록");
                // [문서 - 파일] 맵핑 등록
                docDao.insertMappingDocFile(vo.getDocId(), fileVO.getFileId());
            }
        }

        // [문서 - 유형] 유형 값 등록
        /**
        if (vo.getDocTypeItemList().size() > 0) {
            for (DocumentTypeItemVO documentTypeItem : vo.getDocTypeItemList()) {
                documentTypeItem.setDocId(vo.getDocId());

                typeDao.insertDocumentTypeItem(documentTypeItem);
            }
        }
        */

        logger.debug("STEP 4 ------ 문서 등록");

        
        System.out.println("vo.getSecurityCode()-----------------------------------------------------------------------"+vo.getSecurityCode());
        
        
        //일반문서가 아닌 경우 문서의 상태를 "PROMOTION"상태로 유지하며, 결제를 생성한다. 
        if(vo.getSecurityCode().equals("S2") || vo.getSecurityCode().equals("S3")) {
        	
        	vo.setStatusCode("PROMOTION");
        	
        	//비밀인 경우 워크플로우를 생성한다. 
            WorkFlowVO wfVo = new WorkFlowVO();
            
            wfVo.setWorkflowType("REGISTRATION");
            wfVo.setWorkflowOwner(vo.getActorId());
            
            wfVo.setDocId(vo.getDocId());
            wfVo.setCreatorMessage(vo.getCreatorMessage());
            
            wfVo.setIsCompleted("0");
            
            workflowService.createWorkFlow(wfVo);
            
            vo.setExpireCode("UNLIMIT");
            vo.setExpireCodeName("영구보전");
        }
        
        // [문서] 정보 등록
        docDao.insertDocument(vo);

        logger.debug("STEP 5 ------ 문서 등록 완료");

        // [이력]
        docHistoryService.insertDocumentHistory(getUserInfo(),vo.getDocId(), vo.getDocName(),  Constants.ACTION_CREATED, getRequestIp(), true);
        
        /**
         * 문서등록, 수정인 경우 적용한 권한에 마지막 권한날짜를 넣어 놓는다.
         */
        permissionDao.updateLastAssignDate(vo.getPermissionId());
        
        return vo.getDocId();
    }

    public String updateDocument(DocumentVO vo) throws Exception {
        DocumentVO oldInfo = docDao.selectDocInfo(vo.getDocId());

        logger.info("STEP 1 ------ 문서 수정 시작");
       
        GenerateKey genKey = GenerateKey.getInstance();
    	vo.setDocId(genKey.getKey("07"));
    	
        // 최초문서 아이디
        if (oldInfo.getFirstDocId() == null) {
            vo.setFirstDocId(oldInfo.getDocId());
        } else {
            vo.setFirstDocId(oldInfo.getFirstDocId());
        }

        // 로그인 유저를 생성자로 지정한다
        vo.setCreatorId(getSessionUserKey());
        vo.setVersion(VersionUtils.versionUp(Constants.MAJOR, oldInfo.getVersion()));

        logger.info("STEP 2 ------ [폴더-문서] 맵핑");
        // [폴더 - 문서] 맵핑 등록 (최종 버전 문서)
        folderDao.insertMappingFolderDoc(vo.getFolderId(), vo.getDocId());

        // [폴더 - 문서] 기존 문서 맵핑을 구버전 문서로 변경
        folderDao.updateOldVersionDoc(oldInfo.getDocId());

        logger.info("STEP 3 ------ 첨부가 있을경우");
        // [문서 - 파일] 맵핑 등록 (첨부 전체 목록)
        if (vo.getFileCount() > 0) {

            logger.info("STEP 3-1 ------ 첨부 순환 시작");
            for (FileVO fileVO : vo.getFileList()) {

                logger.info("STEP 3-2 ------ 파일 정보 등록");

                // 파일 아이디가 없을 경우 '기존 문서의 첨부'파일이므로 클론 처리
                if (StringUtils.isNotBlank(fileVO.getFileId())) {
                    fileVO.setFileId(
                        fileService.cloneFile(fileVO.getFileId())
                    );
                } else {
                    // [파일] 신규 파일 정보 등록 및 파일 저장
                    fileVO.setFileId(
                        fileService.insertFile(fileVO)
                    );
                }

                logger.info("STEP 3-2 ------ [문서-파일] 맵핑 등록");
                // [문서 - 파일] 맵핑 등록
                docDao.insertMappingDocFile(vo.getDocId(), fileVO.getFileId());
            }
        }

        // [문서 - 유형] 유형 값 등록
        if (vo.getDocTypeItemList().size() > 0) {
            for (DocumentTypeItemVO documentTypeItem : vo.getDocTypeItemList()) {
                documentTypeItem.setDocId(vo.getDocId());

                typeDao.insertDocumentTypeItem(documentTypeItem);
            }
        }

        logger.info("STEP 4 ------ 문서 등록");
        // [문서] 정보 등록
        docDao.insertDocument(vo);


        logger.info("STEP 5 ------ 문서 등록 완료");

        // [이력]
        docHistoryService.insertDocumentHistory(getUserInfo(),vo.getDocId(), vo.getDocName(),  Constants.ACTION_UPDATE, getRequestIp(), true);

        return vo.getDocId();
    }

    public void trashDoc(String docId) throws Exception {
        // 기존 문서 정보 조회
        DocumentVO vo = docDao.selectDocInfo(docId);

        // 1. 삭제 히스토리 기록
        docHistoryService.insertDocumentHistory(getUserInfo(),vo.getDocId(), vo.getDocName(),  Constants.ACTION_DELETED, getRequestIp(), true);

        // 2. 문서 삭제 처리
        docDao.trashDocument(docId, vo.getFirstDocId());
    }

    public void trashDoc(List<String> docIdList) throws Exception {

        for (String docId : docIdList) {
            DocumentVO vo = docDao.selectDocInfo(docId);

            // 1. 삭제 히스토리 기록
            docHistoryService.insertDocumentHistory(getUserInfo(),vo.getDocId(), vo.getDocName(),  Constants.ACTION_DELETED, getRequestIp(), true);
            // 2. 문서 삭제
            docDao.trashDocument(docId, vo.getFirstDocId());
        }
    }

    public void terminateDoc(List<String> docIdList) throws Exception {
        for (String docId : docIdList) {
            DocumentVO vo = docDao.selectDocInfo(docId);

            // 1. 완전삭제 히스토리 기록
            docHistoryService.insertDocumentHistory(getUserInfo(),vo.getDocId(), vo.getDocName(),  Constants.ACTION_TERMINATED, getRequestIp(), true);
            
            // 2. 문서 완전 삭제
            docDao.terminateDocument(docId);
        }
    }

    public List<DocumentVO> selectExpiredDocList(PaginationVO paging) {
        return docDao.selectExpiredDocList(paging);
    }

    public List<DocumentVO> selectMyExpireDocList(PaginationVO paging) throws Exception {
        return docDao.selectMyExpireDocList(getSessionUserKey(), paging);
    }

    public List<DocumentVO> selectTerminatedDocList(PaginationVO paging) {
        return docDao.selectTerminateDocList(paging);
    }

    public List<DocumentVO> selectExpiredDocListByInterval(String interval, String intervalValue, String intervalCode) {
        return docDao.selectExpiredDocListByInterval(interval, intervalValue, intervalCode);
    }

    public void setExpiredDoc(String docId) throws Exception {
        DocumentVO vo = docDao.selectDocInfo(docId);

        // 1. 복원 히스토리 기록
        docHistoryService.insertDocumentHistory(getUserInfo(),vo.getDocId(), vo.getDocName(),  Constants.ACTION_EXPIRED, getRequestIp(), true);
        
        // 2. 문서 만료 처리
        docDao.setExpiredDoc(docId);
    }

    public void setExpiredDoc(String docId, String actorId, String actionIp) throws Exception {
        DocumentVO vo = docDao.selectDocInfo(docId);

        // 1. 복원 히스토리 기록
        docHistoryService.insertDocumentHistory(getUserInfo(),vo.getDocId(), vo.getDocName(),  Constants.ACTION_EXPIRED, getRequestIp(), true);
        
        // 2. 문서 만료 처리
        docDao.setExpiredDoc(docId);
    }

    public void restoreExpiredDoc(List<String> docIdList) throws Exception {

        for (String docId : docIdList) {
            DocumentVO vo = docDao.selectDocInfo(docId);

            // 1. 복원 히스토리 기록
            docHistoryService.insertDocumentHistory(getUserInfo(),vo.getDocId(), vo.getDocName(),  Constants.ACTION_RESTORE_EXPIRED, getRequestIp(), true);
            
            // 2. 문서 복원
            docDao.restoreDoc(docId);
        }
    }

    public void restoreExpiredDoc(String docId) throws Exception {
        DocumentVO vo = docDao.selectDocInfo(docId);

        // 1. 복원 히스토리 기록
        docHistoryService.insertDocumentHistory(getUserInfo(),vo.getDocId(), vo.getDocName(),  Constants.ACTION_RESTORE_EXPIRED, getRequestIp(), true);
        
        // 2. 문서 복원
        docDao.restoreDoc(docId);
    }


    public List<DocumentVO> selectTrashDocList(PaginationVO paging) throws Exception {
        return docDao.selectTrashDocList(getSessionUserKey(), paging);
    }

    public void restoreTrashDoc(List<String> docIdList) throws Exception {
        for (String docId : docIdList) {
            DocumentVO vo = docDao.selectDocInfo(docId);

            // 1. 복원 히스토리 기록
            docHistoryService.insertDocumentHistory(getUserInfo(),vo.getDocId(), vo.getDocName(),  Constants.ACTION_RESTORE_DELETED, getRequestIp(), true);
            
            // 2. 문서 복원
            docDao.restoreDoc(docId);
        }
    }

    
    public String documentReClassfication(Map<String, String> mapVo) throws Exception {
  
    	
    	//비밀인 경우 워크플로우를 생성한다. 
        WorkFlowVO wfVo = new WorkFlowVO();
        
        wfVo.setWorkflowType("RECLASSIFICATION");
        wfVo.setWorkflowStatus("PROMOTION");
        wfVo.setWorkflowOwner(mapVo.get("actorId"));
        
        wfVo.setDocId(mapVo.get("docId"));
        
        wfVo.setCreatorId(getSessionUserKey());
        wfVo.setCreatorName(getSessionUserName());
        wfVo.setCreatorMessage(mapVo.get("actorMessage"));
        
        wfVo.setIsCompleted("0");
        
        String workflowId = workflowService.createWorkFlow(wfVo);
    	
    	//재분류 생셩
        DocumentReClassficationVO reClassVo = new DocumentReClassficationVO();
    	
        reClassVo.setDocId(wfVo.getDocId());
        reClassVo.setWorkflowId(workflowId);
    	reClassVo.setSecurityCode(mapVo.get("securityCode"));
    	reClassVo.setFolderId(mapVo.get("folderId"));
    	reClassVo.setExpireDate(mapVo.get("expireDate"));
    	reClassVo.setCreatorId(getSessionUserKey());
    	reClassVo.setCreatorName(getSessionUserName());
    	
    	workflowService.createReclassfication(reClassVo);
    	
    	return workflowId;
    }
    
    
    
}
