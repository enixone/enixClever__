package com.enixone.enixClever.cms.was.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.DocumentTypeItemVO;
import com.enixone.enixClever.cms.was.model.TypeItemVO;
import com.enixone.enixClever.cms.was.model.TypeVO;

@Repository
public interface TypeDao {
    /**
     * 속성 관련
     */
    List<TypeVO> selectTypeList();
    List<TypeVO> selectTypeListPage(
            @Param("paging")PaginationVO paging
    );
    TypeVO selectTypeInfo(String typeId);
 
    int insertType(TypeVO vo);
    int updateType(TypeVO vo);
    int deleteType(String typeId);

    /**
     * 속성 아이템 관련
     */
    List<TypeItemVO> selectTypeItemList(String typeId);
    TypeItemVO selectTypeItemInfo(
            @Param("typeId") String typeId,
            @Param("itemId") String itemId
    );
    int insertTypeItem(TypeItemVO vo);
    int updateTypeItem(TypeItemVO vo);
    int deleteTypeItem(
            @Param("typeId") String typeId,
            @Param("itemId") String itemId
    );
    int deleteTypeItemByTypeId(
            @Param("typeId") String typeId
    );

    /**
     * 문서 속성 관련
     */


    List<DocumentTypeItemVO> selectDocumentTypeItemList(
            @Param("docId") String docId
    );
    int insertDocumentTypeItem(DocumentTypeItemVO vo);
    int deleteDocumentTypeItem(
            @Param("docId") String docId
    );
}
