package com.enixone.enixClever.cms.was.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.enixone.enixClever.cms.was.base.BaseService;
import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.DocumentBookmarkVO;
import com.enixone.enixClever.cms.was.model.DocumentVO;
import com.enixone.enixClever.core.common.GenerateKey;

@Service
@Transactional
public class DocumentBookmarkService extends BaseService {

    public String insertBookmarkDoc(String docIdList) throws Exception {
        
    	DocumentBookmarkVO vo = new DocumentBookmarkVO();
        GenerateKey genKey = GenerateKey.getInstance();
    	
        String[] docIds = docIdList.split(",");
        
        for (String docId : docIds) {
        	
        	vo.setBookmarkId(genKey.getKey("27"));
	        vo.setUserKey(getSessionUserKey());
	        vo.setDocId(docId);
	
	        // 북마크 등록
	        docBookmarkDao.insertBookmarkDoc(vo);
	        
	        logger.debug("---------------------------------------------------------------------------------------docIdList" + docIdList);
	        
        }

        return vo.getBookmarkId();
    }

    public int deleteBookmarkDoc(String docIdList) throws Exception {
        
    	String[] docIds = docIdList.split(",");
		        
		for (String docId : docIds) {
			
			logger.debug("---------------------------------------------------------------------------------------bookmarkIds" + docId);
			
			docBookmarkDao.deleteBookmarkDoc(getSessionUserKey(), docId);
		}
		
    	return 0;
    }
    
    
    public List<DocumentVO> selectBookmarkDocByUserKey(PaginationVO paging) throws Exception {
    	paging.setOrderKey(convertColumeName(paging.getOrderKey())); 
        return docBookmarkDao.selectBookmarkDocByUserKey(getSessionUserKey(), paging);
    }
    
    
    public DocumentBookmarkVO selectIsBookmark(String docId) throws Exception {
        return docBookmarkDao.selectIsBookmark(getSessionUserKey(), docId);
    }
    
    
    
}
