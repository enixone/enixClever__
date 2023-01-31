package com.enixone.enixClever.cms.was.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.enixone.enixClever.cms.was.model.BoxVO;

@Repository
public interface BoxDao {
    List<BoxVO> selectBoxList();
    int insertMappingBoxFolder(
            @Param("boxId") String boxId,
            @Param("folderId") String folderId
    );
    int deleteMappingBoxFolder(
            @Param("folderId") String folderId
    );
}
