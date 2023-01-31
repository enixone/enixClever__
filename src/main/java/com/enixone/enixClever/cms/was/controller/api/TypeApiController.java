package com.enixone.enixClever.cms.was.controller.api;

import java.util.List;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.enixone.enixClever.cms.was.base.BaseController;
import com.enixone.enixClever.cms.was.base.PaginationVO;
import com.enixone.enixClever.cms.was.model.TypeItemVO;
import com.enixone.enixClever.cms.was.model.TypeVO;
import com.enixone.enixClever.core.common.Result;

@RestController
@RequestMapping ("/types")
public class TypeApiController extends BaseController {


    /**
     * 문서 유형 전체 목록 조회
     * @param result
     * @return
     */
    @RequestMapping(value = "", method = RequestMethod.GET)
    public Result selectTypeList(final Result result) {
        try {

            List<TypeVO> typeList = typeService.selectTypeList();

            result.setSuccess(new Object[][] {
                    {"typeList", typeList}
            });

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 문서 유형 목록 페이징
     * @param paging
     * @param result
     * @return
     */
    @RequestMapping(value = "/paging", method = RequestMethod.GET)
    public Result selectTypeListPage(@ModelAttribute PaginationVO paging, final Result result) {
        try {
            List<TypeVO> typeList = typeService.selectTypeListPage(paging);
            result.setSuccess(new Object[][] {
                    {"typeList", typeList}
            });

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 문서 유형 상세 정보 조회
     * @param typeId
     * @param result
     * @return
     */
    @RequestMapping(value = "/{typeId}", method = RequestMethod.GET)
    public Result selectTypeInfo(@PathVariable String typeId, final Result result) {
        try {
            TypeVO typeInfo = typeService.selectTypeInfo(typeId);
            result.setSuccess(new Object[][] {
                    {"typeInfo", typeInfo}
            });

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 문서 유형 등록
     * @param vo
     * @param result
     * @return
     */
    @RequestMapping(value = "", method = RequestMethod.POST)
    public Result insertType(@RequestBody TypeVO vo, final Result result) {
        try {
            typeService.insertType(vo);
            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
            e.printStackTrace();
        }
        return result;
    }

    /**
     * 문서 유형 수정
     * @param vo
     * @param result
     * @return
     */
    @RequestMapping(value = "/{typeId}/update", method = RequestMethod.POST)
    public Result updateType(@RequestBody TypeVO vo, final Result result) {
        try {
            typeService.updateType(vo);
            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }


    /**
     * 문서 유형 목록 삭제
     * @param typeIdList
     * @param result
     * @return
     */
    @RequestMapping(value = "/{typeIdList}", method = RequestMethod.DELETE)
    public Result deleteTypeList(@PathVariable List<String> typeIdList, final Result result) {
        try {
            typeService.deleteTypeList(typeIdList);
            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }




    /**
     * 문서 유형 아이템 목록 조회
     * @param result
     * @return
     */
    @RequestMapping(value = "/{typeId}/item", method = RequestMethod.GET)
    public Result selectTypeItemList(@PathVariable String typeId, final Result result) {
        try {

            List<TypeItemVO> typeItemList = typeService.selectTypeItemList(typeId);

            result.setSuccess(new Object[][] {
                    {"typeItemList", typeItemList}
            });

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 문서 유형 아이템 상세 조회
     * @param result
     * @return
     */
    @RequestMapping(value = "/{typeId}/item/{itemId}", method = RequestMethod.GET)
    public Result selectTypeItemInfo(
            @PathVariable String typeId, @PathVariable String itemId, final Result result) {
        try {

            TypeItemVO typeItemInfo = typeService.selectTypeItemInfo(typeId, itemId);

            result.setSuccess(new Object[][] {
                    {"typeItemInfo", typeItemInfo}
            });

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 문서 유형 아이템 추가
     * @param result
     * @return
     */
    @RequestMapping(value = "/{typeId}/item", method = RequestMethod.POST)
    public Result insertTypeItem(
            @RequestBody TypeItemVO vo, final Result result) {
        try {

            typeService.insertTypeItem(vo);
            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 문서 유형 아이템 수정
     * @param result
     * @return
     */
    @RequestMapping(value = "/{typeId}/item/{itemId}/update", method = RequestMethod.POST)
    public Result updateTypeItem(
            @RequestBody TypeItemVO vo, final Result result) {
        try {

            typeService.updateTypeItem(vo);
            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }

    /**
     * 문서 유형 아이템 삭제
     * @param result
     * @return
     */
    @RequestMapping(value = "/{typeId}/item/{itemId}", method = RequestMethod.DELETE)
    public Result updateTypeItem(
            @PathVariable String typeId, @PathVariable String itemId, final Result result) {
        try {

            typeService.deleteTypeItem(typeId, itemId);
            result.setSuccess();

        } catch (Exception e) {
            result.setError(e.getMessage());
        }
        return result;
    }
    
}
