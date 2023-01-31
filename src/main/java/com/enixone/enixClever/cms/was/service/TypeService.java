package com.enixone.enixClever.cms.was.service;

import com.enixone.enixClever.cms.was.base.BaseService;
import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.BoxVO;
import com.enixone.enixClever.cms.was.model.DocumentTypeItemVO;
import com.enixone.enixClever.cms.was.model.TypeItemVO;
import com.enixone.enixClever.cms.was.model.TypeVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class TypeService extends BaseService {

    public List<TypeVO> selectTypeList() {
        List<TypeVO> list = typeDao.selectTypeList();

        for (TypeVO type : list) {
            type.setTypeItemList(typeDao.selectTypeItemList(type.getTypeId()));
        }

        return list;
    }

    public List<TypeVO> selectTypeListPage(PaginationVO paging) {
        return typeDao.selectTypeListPage(paging);
    }

    public TypeVO selectTypeInfo(String typeId) {

        TypeVO info = typeDao.selectTypeInfo(typeId);

        info.setTypeItemList(typeDao.selectTypeItemList(typeId));

        return info;
    }

    public void insertType(TypeVO vo) {

        for (TypeItemVO item : vo.getTypeItemList()) {
            typeDao.insertTypeItem(item);
        }

        typeDao.insertType(vo);
    }

    public void updateType(TypeVO vo) {

        // 기존 유형 아이템 삭제
        typeDao.deleteTypeItemByTypeId(vo.getTypeId());

        // 유형 아이템 새로 넣는다
        for (TypeItemVO item : vo.getTypeItemList()) {
            typeDao.insertTypeItem(item);
        }

        // 유형 업데이트
        typeDao.updateType(vo);
    }

    public int deleteTypeList(List<String> typeIdList) {
        // Validation 처리 필요

        // TypeItem 같이 삭제 필요
        for (String typeId : typeIdList) {
            typeDao.deleteTypeItemByTypeId(typeId);
            typeDao.deleteType(typeId);
        }

        return 0;
    }


    public List<TypeItemVO> selectTypeItemList(String typeId) {
        return typeDao.selectTypeItemList(typeId);
    }

    public TypeItemVO selectTypeItemInfo(String typeId, String itemId) {
        return typeDao.selectTypeItemInfo(typeId, itemId);
    }

    public int insertTypeItem(TypeItemVO vo) {
        return typeDao.insertTypeItem(vo);
    }

    public int updateTypeItem(TypeItemVO vo) {
        return typeDao.updateTypeItem(vo);
    }

    public int deleteTypeItem(String typeId, String itemId) {
        return typeDao.deleteTypeItem(typeId, itemId);
    }



    public List<DocumentTypeItemVO> selectDocumentTypeItemList(String docId) {
        return typeDao.selectDocumentTypeItemList(docId);
    }

    public int insertDocumentTypeItem(DocumentTypeItemVO vo) {
        return typeDao.insertDocumentTypeItem(vo);
    }

    public int deleteDocumentTypeItem(String docId) {
        return typeDao.deleteDocumentTypeItem(docId);
    }


}
