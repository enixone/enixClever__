package com.enixone.enixClever.cms.was.model;

import com.enixone.enixClever.cms.was.base.VO;

import java.util.List;

public class TypeVO extends VO {
    private String typeId;
    private String oldTypeId;
    private String typeName;
    private String isBaseType;

    private List<TypeItemVO> typeItemList;

    public List<TypeItemVO> getTypeItemList() {
        return typeItemList;
    }

    public void setTypeItemList(List<TypeItemVO> typeItemList) {
        this.typeItemList = typeItemList;
    }

    public String getOldTypeId() {
        return oldTypeId;
    }

    public void setOldTypeId(String oldTypeId) {
        this.oldTypeId = oldTypeId;
    }

    public String getTypeId() {
        return typeId;
    }

    public void setTypeId(String typeId) {
        this.typeId = typeId;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public String getIsBaseType() {
        return isBaseType;
    }

    public void setIsBaseType(String isBaseType) {
        this.isBaseType = isBaseType;
    }
}
