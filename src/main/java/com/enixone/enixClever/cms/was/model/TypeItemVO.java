package com.enixone.enixClever.cms.was.model;

import com.enixone.enixClever.cms.was.base.VO;

public class TypeItemVO extends VO {
    private String typeId;
    private String itemId;
    private String itemName;
    private String sortNo;

    public String getTypeId() {
        return typeId;
    }

    public void setTypeId(String typeId) {
        this.typeId = typeId;
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getSortNo() {
        return sortNo;
    }

    public void setSortNo(String sortNo) {
        this.sortNo = sortNo;
    }
}
