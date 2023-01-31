$(document).ready(function(){
	// 인증 체크
	enixClever.user.load(function () {
        
        if(enixClever.user.userInfo==null){
			
		}else{
			// 사용자 정보 출력
		}
	
    });
});





let constants = {
    url : {
        myDocument      : "/enixClever/cms/list/myDocument.html",
        deptDocument      : "/enixClever/cms/list/deptDocument.html",				
        recentDocument  : "/enixClever/cms/list/recentDocument.html",			
        myRecentRead    : "/enixClever/cms/myDocument/recentDocument.html",
        myBookmarkDoc   : "/enixClever/cms/myPlace/bookmarkDocument.html",
        myBookmarkFolder: "/enixClever/cms/myPlace/bookmarkFolder.html",
        myExpired       : "/enixClever/cms/myPlace/myExpired.html",
        myTrash         : "/enixClever/cms/myPlace/myTrash.html",
        myUrlLink       : "/enixClever/cms/myPlace/myUrlLink.html",
        myGiveOwnership : "/enixClever/cms/myPlace/myGiveOwnership.html",
        myTakeOwnership : "/enixClever/cms/myPlace/myTakeOwnership.html",

		securityOwn		: "/enixClever/cms/security/securityOwn.html",
		securityDocument: "/enixClever/cms/security/securityDocument.html",

        boxGroup        : "/enixClever/cms/workPlace/selectPermission.html",
        boxGlobal       : "/enixClever/cms/workPlace/globalPlace.html",
        boxCoWork       : "/enixClever/cms/workPlace/coWorkPlace.html",
        
        //통계 메뉴
        statMost        : "/enixClever/cms/statistics/mostRead.html",
        statUser        : "/enixClever/cms/statistics/byUser.html",
        statGroup       : "/enixClever/cms/statistics/byGroup.html",
        // statDate        : "/enixClever/cms/statistics/period.html",
        statType        : "/enixClever/cms/statistics/byType.html",
        statTracking    : "/enixClever/cms/statistics/docTrace.html",
        
        // 시스템 관리 메뉴
        sysUser         : "/enixClever/manage/system/userManagement.html",
        sysGroup        : "/enixClever/manage/system/groupManagement.html",
        sysRole         : "/enixClever/manage/system/roleManagement.html",
        sysPermission   : "/enixClever/manage/system/permissionManagement.html",
        sysType         : "/enixClever/manage/system/typeManagement.html",
        sysFolder       : "/enixClever/manage/system/folderManagement.html",
        sysExpired      : "/enixClever/manage/system/expiredManagement.html",
        sysTrash        : "/enixClever/manage/system/trashManagement.html",
        sysVolume       : "/enixClever/manage/system/volume/volumeManagement.html",

        selectAccessor  : "/enixClever/cms/group/selectAccessor.html",
        selectGroup     : "/enixClever/cms/group/selectGroup.html",
        selectFolder    : "/enixClever/cms/common/selectFolder.html",
        selectPermission: "/enixClever/cms/common/selectPermission.html",
        selectUser      : "/enixClever/cms/common/selectUser.html",

        folderCreate    : "/enixClever/cms/folder/folderCreate.html",
        folderModify    : "/enixClever/cms/folder/folderModify.html",
        folderRename    : "/enixClever/cms/folder/folderRename.html",
        
        documentCreate  : "/enixClever/cms/document/documentCreate.html",
        documentModify  : "/enixClever/cms/document/documentModify.html",
        documentDetail  : "/enixClever/cms/document/documentDetail.html",
        documentView    : "/enixClever/cms/document/documentView.html",
        securityCard    : "/enixClever/cms/document/securityCard.html",
        
        
        groupCreate     : "/enixClever/cms/group/groupCreate.html",
        groupModify     : "/enixClever/cms/group/groupModify.html",
        permissionCreate: "/enixClever/cms/permission/permissionCreate.html",
        permissionModify: "/enixClever/cms/permission/permissionModify.html",
        roleCreate      : "/enixClever/cms/role/roleCreate.html",
        roleModify      : "/enixClever/cms/role/roleModify.html",
        typeCreate      : "/enixClever/cms/type/typeCreate.html",
        typeModify      : "/enixClever/cms/type/typeModify.html",
        userCreate      : "/enixClever/manage/userCreate.html",
        userModify      : "/enixClever/manage/user/userModify.html",

        urlCreate      : "/enixClever/cms/url/urlCreate.html",
        urlExpand      : "/enixClever/cms/url/urlExpand.html",
        
        
        workflowStep   		: "/enixClever/cms/common/workflowStep.html",
        reClassification   	: "/enixClever/cms/common/reClassification.html",
        
        takeoverDocument   	: "/enixClever/cms/common/takeoverDocument.html",
        destroyDocument   	: "/enixClever/cms/common/destroyDocument.html",
        
        
        documentPromotion	: "/enixClever/cms/common/documentPromotion.html",
        
    },
    scope : {

    }
}


let enixClever = {
    currentMenu : null,
    user : {
        userInfo : null,
        load : function (callback) {
	        if (enixClever.user.userInfo === null) {
                enixClever.api.user.session(function (res) {
                    enixClever.user.userInfo = res.data.user;
                    callback();
                });
            }
        },
        getSessionUserKey : function () {
	        return enixClever.user.userInfo.userKey;
        },
        isAdmin : function () {
	        return enixClever.user.userInfo.isAdmin;
        }
    },
    page : {
        index : function () {
            location.href = "./";
        },
        login : function () {
            location.href = "./login";
        }
    },
    api : {
        user : {
            // 로그인
            login : function (userKey, userPass,  callback, errorCallback) {
                baseAjax("POST", "users/login", {userKey : userKey, userPass : userPass}, callback, errorCallback);
            },
            // 로그아웃
            logout : function (callback, errorCallback) {
                baseAjax("POST", "users/logout", null, callback, errorCallback);
            },
            // 세션 유저 정보 조회
            session : function (callback) {
                baseAjax("GET", "users/session", null, callback);
            },
            refreshSession : function (callback) {
                baseAjax("GET", "users/session/refresh", null, callback);
            },
            // 사용자 목록 조회
            selectUserList : function (statusCode, pagination, callback, errorCallback) {
                baseAjax("GET", "users/status/{0}".format(statusCode), pagination, callback, errorCallback);
            },
            // 사용자/직책 검색
            searchUserList : function (data, callback, errorCallback) {
                baseAjax("POST", "users/searchUserList",data, callback, errorCallback);
            },
            // 사용자 정보 조회
            selectUserInfo : function (userKey, callback, errorCallback) {
                baseAjax("GET", "users/{0}".format(userKey), null, callback, errorCallback);
            },
            // 사용자 등록
            insertUser : function (data, callback) {
                baseAjax("POST", "users", data, callback);
            },
            // 사용자 수정
            updateUser : function (data, callback) {
                baseAjax("POST", "users/{0}/update".format(data.userKey), data, callback);
            },
            // 사용자 삭제
            deleteUser : function (userKey, callback) {
                baseAjax("DELETE", "users/" + userKey, null, callback);
            },
            // 사용자 목록 삭제
            deleteUserList : function (userKeyList, callback) {
                baseAjax("DELETE", "users/" + userKeyList, null, callback);
            },
            // 그룹 사용자 전체 목록 조회
            selectGroupUserList : function (groupId, callback) {
                baseAjax("GET", "groups/{0}/users".format(groupId), null, callback);
            },
            // 그룹 사용자 목록 조회 (페이징)
            selectGroupUserListPage : function (data, callback) {
                baseAjax("GET", "groups/{0}/users/paging".format(data.groupId), data, callback);
            },
            updateUser : function (data, callback) {
                baseAjax("POST", "users/{0}/update".format(data.userKey), data, callback);
            }
            
        },
        doc : {
            // 문서 등록
            insertDoc : function (data, callback) {
                baseAjax("POST", "docs", data, callback);
            },
            // 문서 수정
            updateDoc : function (data, callback) {
                baseAjax("POST", "docs/{0}/update".format(data.docId), data, callback);
            },
            // 문서 삭제
            trashDoc : function (docId, callback) {
                baseAjax("DELETE", "docs/{0}".format(docId), null, callback);
            },
            // 폴더의 문서 목록을 조회한다
            selectDocInfo : function (docId, callback) {
                baseAjax("GET", "docs/{0}".format(docId), null, callback);
            },
            // 폴더의 문서 목록을 조회한다
            selectDocList : function (data, callback) {
                /*
                    data.folderId   : 조회할 폴더 아이디
                    data.userKey     : 조회할 사용자 아이디
                 */
                baseAjax("GET", "folders/docs", data, callback);
            },
            // 만기 문서 목록을 조회한다
            selectExpiredDocList : function (data, callback) {
                baseAjax("GET", "docs/system/expired", data, callback);
            },
            // 만기 문서를 복원한다
            restoreExpiredDocList : function (data, callback) {
                baseAjax("POST", "docs/system/expired/restore/" + data, null, callback);
            },
            // 만기 문서를 삭제한다
            deleteExpiredDocList : function (data, callback) {
                baseAjax("DELETE", "docs/system/expired/delete/" + data, null, callback);
            },
            // 관리자 휴지통 문서 목록을 조회한다
            selectTrashDocList : function (data, callback) {
                baseAjax("GET", "docs/system/trash", data, callback);
            },
            // 휴지통 문서를 복원한다
            restoreTrashDocList : function (data, callback) {
                baseAjax("POST", "docs/system/trash/restore/" + data, null, callback);
            },
            // 휴지통 문서를 삭제한다
            deleteTrashDocList : function (data, callback) {
                baseAjax("DELETE", "docs/system/trash/terminate/" + data, null, callback);
            },
            // 재문류 처리 
            documentReClassfication : function (data, callback) {
	            baseAjax("GET", "docs/documentReClassfication", data, callback);
            },
        },
        bookmark : {
			// 문서 북마크 등록
            insertBookmark : function (docIdList, callback) {
                baseAjax("POST", "bookmark/{0}".format(docIdList), null, callback);
            },
            // 문서 북마크 삭제
            deleteBookmark : function (bookmarkIdList, callback) {
	            baseAjax("DELETE", "bookmark/{0}".format(bookmarkIdList), null, callback);
            },
            // 북마크 문서 목록 조회
            bookmarkDocList : function (data, callback) {
                baseAjax("GET", "bookmark/docs", data, callback);
            },
            // 문서 북마크 여부 조회
            selectIsBookmark : function (docId, callback) {
                baseAjax("GET", "bookmark/{0}/isBookmark".format(docId), null, callback);
            },
	
		},
        workflow : {
	
	        // 수신 문서목록을 가져온다. 
            workflowDocList : function (workflowType, data, callback) {
				baseAjax("GET", "private/{0}/workflow".format(workflowType), data, callback);
            },
            // 문서아이디와 사용자아이디로 워크플로우 아이디를 얻는다.
            getWorkFlowId : function (docId, workflowType, callback) {
                baseAjax("GET", "workflow/getId/{0}/{1}".format(docId, workflowType), null, callback);
            },
            // 문서 상세정보에서 승인대상 결재정보를 가지고 온다.
            getWorkFlowApploval : function (docId, callback) {
                baseAjax("GET", "workflow/getApploval/{0}".format(docId), null, callback);
            },
            // 워크플로우를 처리(승인외) 
            updateWorkFlow : function (data, callback) {
	            baseAjax("POST", "workflow/updateWorkFlow", data, callback);
            },
            // 문서 인수인계 처리 
            documentTakeover : function (data, callback) {
	            baseAjax("POST", "workflow/documentTakeover", data, callback);
            },
            // 문서파기 요청 
            documentDestroy : function (data, callback) {
	            baseAjax("POST", "workflow/documentDestroy", data, callback);
            },
            
            
        },
        
        myDocument : {
            // 내 문서함 루트 목록 조회
            selectMyDocument : function (data, callback) {
	            baseAjax("GET", "private/myDocument", data, callback);
            },
            // 내 문서함 루트 목록 조회
            selectRootFolderList : function (data, callback) {
                /*
                    data.userKey     : 조회할 사용자 아이디
                 */
                baseAjax("GET", "private", data, callback);
            },
            // 폴더의 문서 목록을 조회한다
            selectDocList : function (data, callback) {
                /*
                    data.folderId   : 조회할 폴더 아이디
                    data.userKey     : 조회할 사용자 아이디
                    , 페이징 정보
                 */
                baseAjax("GET", "private/{0}/docs".format(data.folderId), data, callback);
            },
            
            // 내 최근 문서 목록 조회
            selectNewDocument : function (data, callback) {
                baseAjax("GET", "private/recent/created", data, callback);
            },
            
            // 내 임시 저장 문서
            selectTempSaveList : function (data, callback) {
                baseAjax("GET", "private/tempSave", data, callback);
            },
            
            // 내 최근 열람 문서 목록 조회
            selectRecentReadDocument : function (data, callback) {
                baseAjax("GET", "history/doc/recent", data, callback);
            },
            // 내 만기 문서 목록을 조회한다
            selectExpireDocList : function (data, callback) {
                baseAjax("GET", "private/expired", data, callback);
            },
            // 사용자 휴지통 문서 목록을 조회한다
            selectTrashDocList : function (paging, callback) {
                baseAjax("GET", "private/trash", paging, callback);
            },
            // 비밀관리 기록부 조회
            selectSecurityDocList : function (paging, callback) {
                baseAjax("GET", "private/securityDocList", paging, callback);
            },
        },
        url : {
            selectUrlLinkList : function(paging, callback) {
                baseAjax("GET", "url", paging, callback);
            },
            selectUrlLinkInfo : function(urlLinkId, callback) {
                baseAjax("GET", "url/{0}".format(urlLinkId), null, callback);
            },
            selectUrlDocInfo : function(urlLinkId, callback) {
                baseAjax("GET", "url/{0}/doc".format(urlLinkId), null, callback);
            },
            insertUrlLink : function (data, callback) {
                baseAjax("POST", "url", data, callback);
            },
            resetReadCount : function (linkId, callback) {
                baseAjax("POST", "url/{0}/resetCount".format(linkId), null, callback);
            },
            expandExpired : function (data, callback) {
                baseAjax("POST", "url/{0}/expandExpired".format(data.linkId), data, callback);
            }
        },
        folder : {
            // 문서함 루트 폴더 목록 조회
            selectRootFolderList : function (data, callback) {
                /*
                    data.boxId      : 조회할 문서함 아이디
                    data.userKey     : 조회할 사용자 아이디
                 */
                baseAjax("GET", "folders", data, callback);
            },
            // 내가 속한 부서 루트 목록 조회
            selectMyGroupFolderList : function (data, callback) {
                /*
                    data.boxId      : 조회할 문서함 아이디
                    data.userKey     : 조회할 사용자 아이디
                 */
                baseAjax("GET", "folders/groupFolder", data, callback);
            },
            // 부서 하위 폴더 목록 조회
            selectGroupChildFolderList : function (data, callback, isAsync) {
                /*
                    data.boxId              : 조회할 문서함 아이디
                    data.parentFolderId     : 조회할 부모 폴더 아이디
                    data.userKey             : 조회할 사용자 아이디
                 */
                baseAjax("GET", "folders/{0}/groupChild".format(data.parentFolderId), data, callback, null, isAsync);
            },
            // 하위 폴더 목록 조회
            selectChildFolderList : function (data, callback, isAsync) {
                /*
                    data.boxId              : 조회할 문서함 아이디
                    data.parentFolderId     : 조회할 부모 폴더 아이디
                    data.userKey             : 조회할 사용자 아이디
                 */
                baseAjax("GET", "folders/{0}/child".format(data.parentFolderId), data, callback, null, isAsync);
            },
            // 폴더 정보 조회
            selectFolderInfo : function (folderId, callback) {
                baseAjax("GET", "folders/{0}".format(folderId), null, callback);
            },
            // 폴더 등록
            insertFolder : function (data, callback) {
                baseAjax("POST", "folders", data, callback);
            },
            // 폴더 수정
            modifyFolder : function (data, callback) {
                baseAjax("POST", "folders/{0}/update".format(data.folderId), data, callback);
            },
            // 폴더 이름 변경
            renameFolder : function (data, callback) {
                baseAjax("POST", "folders/{0}/rename".format(data.folderId), data, callback);
            },
            // 폴더 삭제
            deleteFolder : function (folderId, callback) {
                baseAjax("DELETE", "folders/{0}".format(folderId), null, callback);
            },
            // 폴더 북마크 등록
            insertBookmark : function (folderId, callback) {
                baseAjax("POST", "folders/{0}/bookmark".format(folderId), null, callback);
            },
            // 폴더 북마크 삭제
            deleteBookmark : function (folderId, callback) {
                baseAjax("DELETE", "folders/{0}/bookmark".format(folderId), null, callback);
            },
            // 북마크 폴더 목록 조회
            selectBookmarkFolderList : function (userKey, callback) {
                baseAjax("GET", "users/{0}/bookmark/folders".format(userKey), null, callback);
            }
        },
        box : {
            // 문서함 목록 조회
            selectBoxList : function (callback) {
                baseAjax("GET", "box", null, callback);
            }
        },
        group : {
            // 최상위 그룹 목록 조회
            selectRootGroupList : function (boxId, callback) {
                baseAjax("GET", "groups", {boxId : boxId}, callback);
            },
            // 하위 그룹 목록 조회
            selectChildGroupList : function (parentGroupId, callback, isAsync) {
                baseAjax("GET", "groups/{0}/child".format(parentGroupId), null, callback, null, isAsync);
            },
            // 부서 상세 조회
            selectGroupInfo : function (groupId, callback) {
                baseAjax("GET", "groups/{0}".format(groupId), null, callback);
            },
            // 그룹 등록
            insertGroup : function (data, callback) {
                baseAjax("POST", "groups", data, callback);
            },
            // 그룹 수정
            modifyGroup : function (data, callback) {
                baseAjax("POST", "groups/{0}/update".format(data.groupId), data, callback);
            },
            // 그룹 삭제
            deleteGroup : function (groupId, callback) {
                baseAjax("DELETE", "groups/{0}".format(groupId), null, callback);
            },
            // 그룹 사용자 등록
            insertGroupUser : function (groupId, userKeyList, callback) {
                baseAjax("POST", "groups/{0}/users/{1}".format(groupId, userKeyList), null, callback);

            }
        },
        permission : {
            // 권한 목록
            selectPermissionList : function (callback) {
                baseAjax("GET", "permissions", null, callback);
            },
            // 권한 목록 (페이지)
            selectPermissionList : function (paging, callback) {
                baseAjax("GET", "permissions/paging", paging, callback);
            },
            // 권한 상세 정보 조회
            selectPermissionInfo : function (permissionId, callback) {
                baseAjax("GET", "permissions/{0}".format(permissionId), null, callback);
            },
            // 사용자가 사용 가능한 권한 목록 조회
            selectAvailablePermissionList : function (userKey, callback) {
                baseAjax("GET", "users/{0}/availablePermission".format(userKey), null, callback);
            },
            // 권한 등록
            insertPermission : function (data, callback) {
                baseAjax("POST", "permissions", data, callback);
            },
            // 권한 수정
            modifyPermission : function (data, callback) {
                baseAjax("POST", "permissions/{0}/update".format(data.permissionId), data, callback);
            },
            // 권한 삭제
            deletePermission : function (permissionId, callback) {
                baseAjax("DELETE", "permissions/{0}".format(permissionId), null, callback);
            }
        },
        role : {
            // 역할 목록
            selectRoleList : function (callback) {
                baseAjax("GET", "roles", null, callback);
            },
            // 역할 목록 (페이징)
            selectRoleListPage : function (data, callback) {
                baseAjax("GET", "roles/paging", data, callback);
            },
            // 역할 상세 정보 조회
            selectRoleInfo : function (roleId, callback) {
                baseAjax("GET", "roles/{0}".format(roleId), null, callback);
            },
            // 역할 등록
            insertRole : function (data, callback) {
                baseAjax("POST", "roles", data, callback);
            },
            // 역할 수정
            modifyRole : function (data, callback) {
                baseAjax("POST", "roles/{0}/update".format(data.roleId), data, callback);
            },
            // 역할 삭제
            deleteRole : function (roleId, callback) {
                baseAjax("DELETE", "roles/{0}".format(roleId), null, callback);
            }
        },
        type : {
            // 문서 유형 목록
            selectTypeList : function (callback) {
                baseAjax("GET", "types", null, callback);
            },
            // 문서 유형 목록 (페이징)
            selectTypeListPage : function (data, callback) {
                baseAjax("GET", "types/paging", data, callback);
            },
            // 문서 유형 상세 정보 조회
            selectTypeInfo : function (typeId, callback) {
                baseAjax("GET", "types/{0}".format(typeId), null, callback);
            },
            // 문서 유형 등록
            insertType : function (data, callback) {
                baseAjax("POST", "types", data, callback);
            },
            // 문서 유형 수정
            modifyType : function (data, callback) {
                baseAjax("POST", "types/{0}/update".format(data.typeId), data, callback);
            },
            // 문서 유형 삭제
            deleteType : function (typeId, callback) {
                baseAjax("DELETE", "types/{0}".format(typeId), null, callback);
            }
        },
        history : {
                recent : function (data, callback) {
                    baseAjax("GET", "history/doc/recent", data, callback);
                },
                securityCard : function (docId, callback) {
                    baseAjax("GET", "docHistory/{0}".format(docId), null, callback);
                }
        },
        statistics : {
            mostViewDocList : function (data, callback) {
                baseAjax("GET", "statistics/mostView", data, callback);
            },
            byUserDataList : function (data, callback) {
                baseAjax("GET", "statistics/byUser", data, callback);
            },
            byGroupDataList : function (data, callback) {
                baseAjax("GET", "statistics/byGroup", data, callback);
            },
            byTypeDataList : function (data, callback) {
                baseAjax("GET", "statistics/byType", data, callback);
            },
            traceDoc : function (data, callback) {
                baseAjax("GET", "statistics/traceDoc", data, callback);
            }
        },
        changeOwner : {
            insertChangeOwner : function (data, callback) {
                baseAjax("POST", "changeOwner", data, callback);
            },
            giveList : function (giverId, callback) {
                baseAjax("GET", "changeOwner/give/{0}".format(giverId), null, callback);
            },
            takeList : function (takerId, callback) {
                baseAjax("GET", "changeOwner/take/{0}".format(takerId), null, callback);
            },
            countMyWorkspaceDoc : function (userKey, callback) {
                baseAjax("GET", "changeOwner/owner/{0}/count".format(userKey), null, callback);
            },
            takeOwnership : function (changeId, callback) {
                baseAjax("POST", "changeOwner/{0}/take".format(changeId), null, callback);
            }
        }
    },
    file : {
        download : function (fileId) {
            var finalUrl = "{0}//{1}{2}/io/{3}".format(
                window.location.protocol,
                window.location.host,
                window.location.pathname.substring(0, window.location.pathname.indexOf("/",2)),
                fileId
            );
            // window.open("./io/download/" + fileId, "_blank");
            // $.fileDownload('./io/' + fileId);
            $.fileDownload(finalUrl);
        }
    },
    alert : {
        info : function (title, msg) {
            if (msg == undefined) msg = "";
			Swal.fire(msg, title, "info");
        },
        success : function (title, msg) {
            Swal.fire(msg, title, "success");
        },
        warn : function (title, msg) {
            Swal.fire(msg, title, "warning");
        },
        error : function (title, msg) {
            if (msg == undefined) msg = "";
            Swal.fire(msg, title, "error");
        },
        confirm : function (title, msg, okCallback) {
            Swal.fire({
                title : title,
                text : msg,
                icon : "warning",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: "확인",
                cancelButtonText: "닫기",
                closeOnConfirm : false
            }).then((result) => {
                if (result.isConfirmed) {
                    okCallback();
                }
            });
        }
    },
    modal : {
        openedModalList : [], // 열려있는 모달 아이디 목록
        overlayObj : $(".md-overlay"),
        modalObj : $("#modalDiv"),
        show : function () {

            // 클릭 이벤트 재 할당
            $(enixClever.modal.overlayObj).on('click', enixClever.modal.close);

            // SHOW
            this.overlayObj.addClass("md-show");
            this.modalObj.addClass("md-show");
        },
        confirm : function (successCallback, errorCallback) {

        },
        load : function (url, data, successCallback, modalClass, styleAdd) {
            let cb = successCallback;

			// 현재 가장 위에 열려있는 모달을 가져온다
            var lastModal = enixClever.modal.openedModalList.last();

            // 기존 팝업이 존재할 경우 상단으로 조금 옮긴다
            if (lastModal != undefined) {
                $(lastModal).addClass("slaveModal");
            }

			var modalId = "#" + enixClever.utils.uuidGenerate();
            $("body").append('<div class="md-modal md-effect-1 {0}" id="{1}" style="{2}";></div>'.format(modalClass, modalId.replace("#", ""), styleAdd));

            // 음역 레이어 없을 경우 생성
            if ($(".md-overlay").length == 0) {
                $('body').append('<div class="md-overlay"></div>');

                // 클릭 이벤트 재 할당
                $(".md-overlay").on('click', enixClever.modal.close);
            }

            // 팝업 레이어 목록에 추가
            enixClever.modal.openedModalList.push(modalId);

			$(modalId).load(url + "?ranToken=" + Math.random(), function () {
				
                // modal의 js를 로드한다
                loadScript(function() {
                    initModal(data, cb);
                });

                $(modalId).addClass("md-show");


            });
        },
        close : function () {
            $(enixClever.modal.openedModalList.pop()).remove();
            var lastModal = enixClever.modal.openedModalList.last();

            if (lastModal == undefined) {
                $(".md-overlay").remove();
            } else {
                $(lastModal).removeClass("slaveModal");
            }
            // enixClever.modal.overlayObj.removeClass("md-show");
            // enixClever.modal.modalObj.removeClass("md-show");

            // 클릭 이벤트 해제
            // $(enixClever.modal.overlayObj).unbind('click', enixClever.modal.close);
        }
    },
    utils : {
        setCookie : function(key, value) {
            $.cookie(key, value);
        },
        getCookie : function(key) {
            return $.cookie(key);
        },
        removeCookie : function(key) {
            $.removeCookie(key);
        },
        uuidGenerate : function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        getParameterByName : function(name) {
            var req = new XMLHttpRequest();
            req.open('GET', document.location, false);
            req.send(null);
            return req.getResponseHeader(name);
        },
    }
}

let enixTree = {
    getGroupNodeListFromJson : function(groupList) {
        var nodeList = [];
        $.each(groupList, function(idx, item) {
            nodeList.push({
                folder : true,
                title : item.groupName,
                lazy : item.childCount > 0,
                data : item,
                icon : getFolderIcon("folder-icon-group")
            });
        });

        return nodeList;
    },
    getFolderNodeListFromJson : function(groupList, selectFirst) {
        var nodeList = [];
        $.each(groupList, function(idx, item) {
            nodeList.push({
                folder : true,
                title : item.folderName,
                lazy : item.childCount > 0,
                data : item,
                icon : getFolderIcon(item.parentFolderId)
            });
        });

        return nodeList;
    },
    getContextItem : function (node) {
        var data = node.data;
        var permission = node.permissionInfo;
    }
}


function getFolderIcon(iconPart){
	
	let rtnVal ; 
	
	if(iconPart == "_TOP"){
		rtnVal = "folder-icon-home";
	}
	
	return rtnVal;
	
}


let uiHandller = {
    appendOptionList : function (selector, optionName, list, displayKey, valueKey, callback) {
        
        $(selector).empty();

        $.each(list, function (idx, item) {
			
			if(item["isBaseType"] == "Y"){
				isChecked = " checked";	
			}else{
				isChecked = "";
			}
			
			var tag = '<input type="radio" name="{0}" value="{1}" id="{1}" {3} "><label for="{1}">{2}</label>'.format(optionName, item[valueKey], item[displayKey], isChecked);
			
			$(selector).append(tag);
			
        });

        if (typeof callback == 'function') {
            callback();
        }
    },
    setSwitch : function (selector) {
        new Switchery(selector, { color: '#62d1f3', jackColor: '#fff', size:'medium' });
    }
}

let baseAjax = function(methodType, url, data, successCallback, errorCallback, async, contentType) {
    var finalUrl = "{0}//{1}{2}/{3}".format(
        window.location.protocol,
        window.location.host,
        window.location.pathname.substring(0, window.location.pathname.indexOf("/",2)),
        url
    );


    $.ajax({
        type : methodType,
        url : finalUrl,
        data : (methodType === "PUT" || methodType === "POST" ? (data ? JSON.stringify(data) : null) : data),
        // data : data,
        async : (async == null ? true : false),
        success : function (res) {
	
	        switch (res.status) {
                case "SUCCESS" :
                    if (typeof(successCallback ) == "function") {
                        successCallback(res);
                    }
                    break;
                case "FAIL" :
                case "ERROR" :
                    if (typeof(errorCallback ) == "function") {
                        errorCallback(res.message);
                    } else {
                        // console.error(res);
                        enixClever.alert.error(res.message);
                    }
                    break;
                case "INVALID_SESSION" :
                    break;
            }

        },
        error : function (e) {
			
			if (e.status == 500) {
				
            } else if (e.status == 401) {
    
            } else if (e.status == 901) {
				alert("로그인 정보가 없습니다.\n로그인 페이지로 이동합니다.");
				location.href = "/enixClever/login";
			}
            
            if (typeof(errorCallback) == "function") {
                errorCallback(e);
            } else {
	
            }
        },
        contentType : (methodType === "POST" ? "application/json" : (contentType == null ? "application/x-www-form-urlencoded" : contentType)),
        dataType : "JSON"
    });
};

String.prototype.format = String.prototype.f = function () {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

Array.prototype.last = function() {
    return this[this.length - 1];
}

jQuery.fn.inputs = function() {
    let $this = $(this);

    return {
        setInputWarning : function() {
            $this.removeClass().addClass("form-control-warning form-txt-warning");
        },
        setInputError : function() {
            $this.removeClass().addClass("form-control-error form-txt-error");
        },
        setInputNormal : function() {
            $this.removeClass().addClass("form-control");
        }
    }
}

function executeFunctionByName(functionName, context , args ) {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for(var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}


jQuery.fn.serializeObject = function() {
    let obj = null;
    try {
        if (this[0].tagName && this[0].tagName.toUpperCase() == "FORM" ) {
            let arr = this.serializeArray();

            $.each(this.find("input:checkbox"), function() {
                let _checkboxItem = this;
                let _exists = false;

                $.each(arr, function(formItem) {
                    if (formItem.name == _checkboxItem.name) {
                        formItem.value = _checkboxItem.value;
                        _exists = true;
                    }
                });

                if (!_exists) {
                    arr.push({name : this.name, value : this.checked ? "Y" : "N"});
                }
            });

            if (arr) {
                obj = {};
                jQuery.each(arr, function() {

                        obj[this.name] = this.value;
                });
            }
        }
    } catch(e) {
        console.error(e.message);
    } finally {}

    return obj;
};



var _temp_title = [
,"삶이 있는 한 희망은 있다"
,"산다는것 그것은 치열한 전투이다."
,"하루에 3시간을 걸으면 7년 후에 지구를 한바퀴 돌 수 있다."
,"언제나 현재에 집중할수 있다면 행복할것이다."
,"진정으로 웃으려면 고통을 참아야하며 , 나아가 고통을 즐길 줄 알아야 해"
,"직업에서 행복을 찾아라. 아니면 행복이 무엇인지 절대 모를 것이다"
,"신은 용기있는자를 결코 버리지 않는다"
,"행복의 문이 하나 닫히면 다른 문이 열린다 그러나 우리는 종종 닫힌 문을 멍하니 바라보다가"
,"痢??향해 열린 문을 보지 못하게 된다"
,"피할수 없으면 즐겨라"
,"단순하게 살아라. 현대인은 쓸데없는 절차와 일 때문에 얼마나 복잡한 삶을 살아가는가?-이드리스 샤흐"
,"먼저 자신을 비웃어라. 다른 사람이 당신을 비웃기 전에"
,"먼저핀꽃은 먼저진다 남보다 먼저 공을 세우려고 조급히 서둘것이 아니다"
,"행복한 삶을 살기위해 필요한 것은 거의 없다."
,"절대 어제를 후회하지 마라 . 인생은 오늘의 나 안에 있고 내일은 스스로 만드는 것이다 L.론허바드"
,"어리석은 자는 멀리서 행복을 찾고, 현명한 자는 자신의 발치에서 행복을 키워간다"
,"너무 소심하고 까다롭게 자신의 행동을 고민하지 말라 . 모든 인생은 실험이다 . 더많이 실험할수록 더나아진다"
,"한번의 실패와 영원한 실패를 혼동하지 마라"
,"내일은 내일의 태양이 뜬다"
,"피할수 없으면 즐겨라"
,"절대 어제를 후회하지 마라. 인생은 오늘의 내 안에 있고 내일은 스스로 만드는것이다."
,"계단을 밟아야 계단 위에 올라설수 있다,"
,"오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다,"
,"좋은 성과를 얻으려면 한 걸음 한 걸음이 힘차고 충실하지 않으면 안 된다,"
,"행복은 습관이다,그것을 몸에 지니라"
,"성공의 비결은 단 한 가지, 잘할 수 있는 일에 광적으로 집중하는 것이다.- 톰 모나건"
,"자신감 있는 표정을 지으면 자신감이 생긴다"
,"평생 살 것처럼 꿈을 꾸어라.그리고 내일 죽을 것처럼 오늘을 살아라."
,"네 믿음은 네 생각이 된다 . 네 생각은 네 말이 된다. 네말은 네 행동이 된다 네행동은 네 습관이된다 . 네 습관은 네 가치가 된다 . 네 가치는 네 운명이 된다"
,"일하는 시간과 노는 시간을 뚜렷이 구분하라 . 시간의 중요성을 이해하고 매순간을 즐겁게 보내고 유용하게 활용하라. 그러면 젋은 날은 유쾌함으로 가득찰것이고 늙어서도 후회할 일이 적어질것이며 비록 가난할 때라도 인생을 아름답게 살아갈수있다"
,"절대 포기하지 말라. 당신이 되고 싶은 무언가가 있다면, 그에 대해 자부심을 가져라. 당신 자신에게 기회를 주어라. 스스로가 형편없다고 생각하지 말라. 그래봐야 아무 것도 얻을 것이 없다. 목표를 높이 세워라.인생은 그렇게 살아야 한다."
,"1퍼센트의 가능성, 그것이 나의 길이다."
,"그대 자신의 영혼을 탐구하라.다른 누구에게도 의지하지 말고 오직 그대 혼자의 힘으로 하라. 그대의 여정에 다른 이들이 끼어들지 못하게 하라. 이 길은 그대만의 길이요, 그대 혼자 가야할 길임을 명심하라. 비록 다른 이들과 함께 걸을 수는 있으나 다른 그 어느 누구도 그대가 선택한 길을 대신 가줄 수 없음을 알라."
,"디언 속담"
,"고통이 남기고 간 뒤를 보라! 고난이 지나면 반드시 기쁨이 스며든다."
,"삶은 소유물이 아니라 순간 순간의 있음이다 영원한 것이 어디 있는가 모두가 한때일뿐 그러나 그 한때를 최선을 다해 최대한으로 살수 있어야 한다 삶은 놀라운 신비요 아름다움이다. 법정스님"
,"꿈을 계속 간직하고 있으면 반드시 실현할 때가 온다."
,"화려한 일을 추구하지 말라. 중요한 것은 스스로의 재능이며, 자신의 행동에 쏟아 붓는 사랑의 정도이다."
,"마음만을 가지고 있어서는 안된다. 반드시 실천하여야 한다."
,"흔히 사람들은 기회를 기다리고 있지만 기회는 기다리는 사람에게 잡히지 않는 법이다. 우리는 기회를 기다리는 사람이 되기 전에 기회를 얻을 수 있는 실력을 갖춰야 한다. 일에 더 열중하는 사람이 되어야한다."
,"나이가 60이다 70이다 하는 것으로 그 사람이 늙었다 젊었다 할 수 없다. 늙고 젊은 것은 그 사람의 신념이 늙었느냐 젊었느냐 하는데 있다."
,"만약 우리가 할 수 있는 일을 모두 한다면 우리들은 우리자신에 깜짝 놀랄 것이다."
,"나는 누구인가 스스로 물으라 자신의 속얼굴이 드러나 보일 때까지 묻고 묻고 물어야 한다건성으로 묻지말고 목소리 속의 목소리로 귀 속의 귀에 대고 간절하게 물어야 한다해답은 그 물음 속에 있다. 법정스님- 산에는 꽃이 피네"
,"행복은 결코 많고 큰데만 있는 것이 아니다 작은 것을 가지고도 고마워 하고 만족할 줄 안다면 그는 행복한 사람이다. 여백과 공간의 아름다움은 단순함과 간소함에 있다. 법정스님"
,"물러나서 조용하게 구하면 배울 수 있는 스승은 많다. 사람은 가는 곳마다 보는 것마다 모두 스승으로서"
,"?것이 많은 법이다."
,"눈물과 더불어 빵을 먹어 보지 않은 자는 인생의 참다운 맛을 모른다."
,"진짜 문제는 사람들의 마음이다. 그것은 절대로 물리학이나 윤리학의 문제가 아니다."
,"해야 할 것을 하라. 모든 것은 타인의 행복을 위해서, 동시에 특히 나의 행복을 위해서이다."
,"사람이 여행을 하는 것은 도착하기 위해서가 아니라 여행하기 위해서이다."
,"화가 날 때는 100까지 세라. 최악일 때는 욕설을 퍼부어라."
,"재산을 잃은 사람은 많이 잃은 것이고, 친구를 잃은 사람은 더많이 잃은 것이며, 용기를 잃은 사람은 모든것을 잃은 것이다."
,"돈이란 바닷물과도 같다. 그것은 마시면 마실수록 목이 말라진다."
,"이룰수 없는 꿈을 꾸고 이길수 없는 적과 싸우며, 이룰수 없는 사랑을 하고 견딜 수 없는 고통을 견디고,"
,"뻤?없는 저 하늘의 별도 잡자."
,"고개 숙이지 마십시오. 세상을 똑바로 정면으로 바라보십시오."
,"고난의 시기에 동요하지 않는 것, 이것은 진정 칭찬받을 만한 뛰어난 인물의 증거다."
,"사막이 아름다운 것은 어딘가에 샘이 숨겨져 있기 때문이다"
,"행복의 한 쪽 문이 닫히면 다른 쪽 문이 열린다. 그러나 흔히 우리는 닫혀진 문을 오랫동안 보기 때문에 우리를 위해 열려 있는 문을 보지 못한다."
,"만족할 줄 아는 사람은진정한 부자이고, 탐욕스러운 사람은진실로 가난한 사람이다."
,"성공해서 만족하는 것은 아니다. 만족하고 있었기 때문에 성공한 것이다.-알랭"
,"곧 위에 비교하면 족하지 못하나,아래에 비교하면 남음이 있다."
,"그대의 하루 하루를 그대의 마지막 날이라고 생각하라"
,"자신을 내보여라. 그러면 재능이 드러날 것이다."
,"자신의 본성이 어떤것이든 그에 충실하라 . 자신이 가진 재능의 끈을 놓아 버리지 마라. 본성이 이끄는 대로 따르면 성공할것이다"
,"당신이 할수 있다고 믿든 할수 없다고 믿든 믿는 대로 될것이다."
,"단순하게 살라. 쓸데없는 절차와 일 때문에 얼마나 복잡한 삶을 살아가는가?"
,"당신이 인생의 주인공이기 때문이다 . 그사실을 잊지마라 . 지금까지 당신이 만들어온 의식적 그리고 무의식적 선택으로 인해 지금의 당신이 있는것이다 ."
,"지금이야 말로 일할때다. 지금이야말로 싸울때다. 지금이야말로 나를 더 훌륭한 사람으로 만들때다 오늘 그것을 못하면 내일 그것을 할수있는가- 토마스 아켐피스"
,"모든것들에는 나름의 경이로움과 심지어 어둠과 침묵이 있고 , 내가 어떤 상태에 있더라도 나는 그속에서 만족하는 법을 배운다"
,"작은 기회로 부터 종종 위대한 업적이 시작된다"
,"인생이란 학교에는 불행 이란 훌륭한 스승이 있다. 그 스승 때문에 우리는 더욱 단련되는 것이다."
,"세상은 고통으로 가득하지만 그것을 극복하는 사람들로도 가득하다"
,"도저히 손댈 수가 없는 곤란에 부딪혔다면 과감하게 그 속으로 뛰어들라 . 그리하면 불가능하다고 생각했던 일이 가능해진다."
,"용기있는 자로 살아라. 운이 따라주지 않는다면 용기 있는 가슴으로 불행에 맞서라."
,"최고에 도달하려면 최저에서 시작하라."
,"내 비장의 무기는 아직 손안에 있다 .그것은 희망이다"
,"문제는 목적지에 얼마나 빨리 가느내가 아니라 그 목적지가 어디냐는 것이다."
,"한 번 실패와 영원한 실패를 혼동하지 마라."
,"인간의 삶 전체는 단지 한 순간에 불과하다 . 인생을 즐기자"
,"겨울이 오면 봄이 멀지 않으리"
,"일하여 얻으라 . 그러면 운명의 바퀴를 붙들어 잡은것이다"
,"당신의 행복은 무엇이 당신의 영혼을 노래하게 하는가에 따라 결정된다."
,"자신이 해야 할 일을 결정하는 사람은 세상에서 단 한 사람, 오직 나 자신뿐이다."
,"먹고 싶은것을 다 먹는 것은 그렇게 재미있지 않다 . 인생을 경계선 없이 살면 기쁨이 덜하다 . 먹고싶은대로 다 먹을 수있다면 먹고싶은 것을 먹는데 무슨 재미가 있겠나"
,"인생을 다시 산다면 다음번에는 더 많은 실수를 저지르리라"
,"절대 어제를 후회하지 마라 . 인생은 오늘의 나 안에 있고 내일은 스스로 만드는 것이다"
,"인생에서 원하는 것을 엇기 위한 첫번째 단계는 내가 무엇을 원하는지 결정하는 것이다"
,"가난은 가난하다고 느끼는 곳에 존재한다 .- 에머슨"
,"삶이 그대를 속일지라도 슬퍼하거나 노하지 말아라 슬픈 날에 참고 견디라 . 즐거운 날은 오고야 말리니 마음은 미래를 바라느니 현재는 한없이 우울한것 모든건 하염없이 사라지나가 버리고 그리움이 되리니"
,"문제점을 찾지 말고 해결책을 찾으라"
,"우선 무엇이 되고자 하는가를 자신에게 말하라 그리고 해야 할일을 하라"
,"되찾을 수 없는게 세월이니 시시한 일에 시간을 낭비하지 말고 순간순간을 후회 없이 잘 살아야 한다."
,"인생에 뜻을 세우는데 있어 늦은 때라곤 없다"
,"도중에 포기하지 말라. 망설이지 말라. 최후의 성공을 거둘 때까지 밀고 나가자."
,"네 자신의 불행을 생각하지 않게 되는 가장 좋은 방법은 일에 몰두하는 것이다."
,"우리는 두려움의 홍수에 버티기 위해서 끊임없이 용기의 둑을 쌓아야 한다."
,"직접 눈으로 본 일도 오히려 참인지 아닌지 염려스러운데 더구나 등뒤에서 남이 말하는 것이야 어찌 이것을 깊이 믿을 수 있으랴"
,"이미끝나버린 일을 후회하기 보다는 하고 싶었던 일들을 하지못한 것을 후회하라."];

