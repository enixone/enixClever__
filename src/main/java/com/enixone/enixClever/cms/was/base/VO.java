package com.enixone.enixClever.cms.was.base;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({
        "totalPage", "totalCount", "pageNo", "perPage",
        "startNo", "endNo", "fromDate", "toDate",
        "orderKey", "orderBy", "keyword", "searchKey"
})
public class VO extends PaginationVO {
}