$(document).ready(function(){
	// 인증 체크
	enixClever.user.load(function () {
        // 사용자 정보 출력
        console.log(">>userInfo=====================================");
        console.log(enixClever.user.userInfo);
    });
});


let constants = {
    url : {
        myDocument      : "/enixClever/manage/list/myDocument.html",				
        recentDocument  : "/enixClever/manage/list/recentDocument.html",			
        myRecentRead    : "/enixClever/manage/myDocument/recentDocument.html",
        myBookmarkDoc   : "/enixClever/manage/myPlace/bookmarkDocument.html",
        myBookmarkFolder: "/enixClever/manage/myPlace/bookmarkFolder.html",
        myExpired       : "/enixClever/manage/myPlace/myExpired.html",
        myTrash         : "/enixClever/manage/myPlace/myTrash.html",
        myUrlLink       : "/enixClever/manage/myPlace/myUrlLink.html",
        myGiveOwnership : "/enixClever/manage/myPlace/myGiveOwnership.html",
        myTakeOwnership : "/enixClever/manage/myPlace/myTakeOwnership.html",

		securityOwn		: "/enixClever/manage/security/securityOwn.html",


        boxGroup        : "/enixClever/manage/workPlace/selectPermission.html",
        boxGlobal       : "/enixClever/manage/workPlace/globalPlace.html",
        boxCoWork       : "/enixClever/manage/workPlace/coWorkPlace.html",
        
        //통계 메뉴
        statMost        : "/enixClever/manage/statistics/mostRead.html",
        statUser        : "/enixClever/manage/statistics/byUser.html",
        statGroup       : "/enixClever/manage/statistics/byGroup.html",
        // statDate        : "/enixClever/manage/statistics/period.html",
        statType        : "/enixClever/manage/statistics/byType.html",
        statTracking    : "/enixClever/manage/statistics/docTrace.html",
        
        // 시스템 관리 메뉴
        sysIndex		: "/enixClever/manage/system/Index.html",
        sysUser         : "/enixClever/manage/system/userManagement.html",
        sysGroup        : "/enixClever/manage/system/groupManagement.html",
        sysRole         : "/enixClever/manage/system/roleManagement.html",
        sysPermission   : "/enixClever/manage/system/permissionManagement.html",
        sysType         : "/enixClever/manage/system/typeManagement.html",
        sysFolder       : "/enixClever/manage/system/folderManagement.html",
        sysExpired      : "/enixClever/manage/system/expiredManagement.html",
        sysTrash        : "/enixClever/manage/system/trashManagement.html",
        sysVolume       : "/enixClever/manage/system/volume/volumeManagement.html",
        encryption      : "/enixClever/manage/system/",

        selectAccessor  : "/enixClever/manage/group/selectAccessor.html",
        selectGroup     : "/enixClever/manage/group/selectGroup.html",
        selectFolder    : "/enixClever/manage/common/selectFolder.html",
        selectPermission: "/enixClever/manage/permission/selectPermission.html",
        selectUserList  : "/enixClever/manage/user/selectUser.html",
      
       
        

        folderCreate    : "/enixClever/manage/folder/folderCreate.html",
        folderModify    : "/enixClever/manage/folder/folderModify.html",
        folderRename    : "/enixClever/manage/folder/folderRename.html",
        documentCreate  : "/enixClever/manage/document/documentCreate.html",
        documentModify  : "/enixClever/manage/document/documentModify.html",
        documentDetail  : "/enixClever/manage/document/documentDetail.html",
        documentView    : "/enixClever/manage/document/documentView.html",
        groupCreate     : "/enixClever/manage/group/groupCreate.html",
        groupModify     : "/enixClever/manage/group/groupModify.html",
        permissionCreate: "/enixClever/manage/permission/permissionCreate.html",
        permissionModify: "/enixClever/manage/permission/permissionModify.html",
        roleCreate      : "/enixClever/manage/role/roleCreate.html",
        roleModify      : "/enixClever/manage/role/roleModify.html",
        typeCreate      : "/enixClever/manage/type/typeCreate.html",
        typeModify      : "/enixClever/manage/type/typeModify.html",
        userCreate      : "/enixClever/manage/user/userCreate.html",
        userModify      : "/enixClever/manage/user/userModify.html",
        userDetail		: "/enixClever/manage/user/userDetail.html",

        urlCreate      : "/enixClever/manage/url/urlCreate.html",
        urlExpand      : "/enixClever/manage/url/urlExpand.html",
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
            // 사용자/직책 검색
            searchUserList : function (data, callback, errorCallback) {
                baseAjax("GET", "users/searchUserList",data, callback, errorCallback);
            },
            // 사용자 검색
            selectUser : function (data, callback, errorCallback) {
                baseAjax("POST", "users/selectUser",data, callback, errorCallback);
            },
            // 사용자 목록 조회
            selectUserList : function (statusCode, pagination, callback, errorCallback) {
                baseAjax("GET", "users/status/{0}".format(statusCode), pagination, callback, errorCallback);
            },
            // 유저테이블 메인 검색
            selectMainUser : function (data, pagination, callback, errorCallback) {
                baseAjax("POST", "users/main",data, pagination, callback, errorCallback);
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
            // 유저 승인 및 복원
            approvalUser : function (data, callback) {
                baseAjax("POST", "users/{0}/approval".format(data.innerText), data, callback);
            },
            // 그룹 구성원 조회
            selectgroupMember : function (groupId, pagination, callback, errorCallback) {
				baseAjax("GET","users/{0}/member".format(groupId), pagination, callback, errorCallback);
			},
           
            
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
                baseAjax("GET", "folders/{0}/docs".format(data.folderId), data, callback);
            },
            // 문서 북마크 등록
            insertBookmark : function (docId, callback) {
                baseAjax("POST", "docs/{0}/bookmark".format(docId), null, callback);
            },
            // 문서 북마크 삭제
            deleteBookmark : function (docId, callback) {
                baseAjax("DELETE", "docs/{0}/bookmark".format(docId), null, callback);
            },
            // 북마크 문서 목록 조회
            bookmarkDocList : function (data, callback) {
                baseAjax("GET", "users/{0}/bookmark/docs".format(data.userKey), data, callback);
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
        },
        code : {
		  	// 직급 코드 조회
            selectPosition : function (callback) {
                baseAjax("GET", "codes/position", null, callback);
            },
		},
        myDocument : {
            // 내 문서함 루트 목록 조회
            selectMyDocument : function (data, callback) {
                /*
                    data.userKey     : 조회할 사용자 아이디
                 */
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
            // 내 최근 열람 문서 목록 조회
            selectRecentReadDocument : function (data, callback) {
                baseAjax("GET", "private/recent/read", data, callback);
            },
            // 내 관심 문서 목록 조회
            // selectBookmarkDocument : function (data, callback) {
            //     baseAjax("GET", "./private/bookmark/doc", data, callback);
            // }
            // 내 만기 문서 목록을 조회한다
            selectExpiredDocList : function (data, callback) {
                baseAjax("GET", "private/expired", data, callback);
            },
            // 사용자 휴지통 문서 목록을 조회한다
            selectTrashDocList : function (paging, callback) {
                baseAjax("GET", "private/trash", paging, callback);
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
            selectRootGroupList : function (data, callback) {
                baseAjax("GET", "groups", data, callback);
            },
            // 하위 그룹 목록 조회
            selectChildGroupList : function (parentGroupId, callback, isAsync) {
                baseAjax("GET", "groups/{0}/child".format(parentGroupId), null, callback, null, isAsync);
            },
            // 부서 상세 조회
            selectGroupInfo : function (groupId, callback) {
                baseAjax("GET", "groups/{0}".format(groupId), null, callback);
            },
             // 그룹 검색
            searchGroupList : function (data, callback, errorCallback) {
                baseAjax("GET", "groups/searchGroupList",data, callback, errorCallback);
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
            },
            
		
			
			
        },
        permission : {
            // 권한 목록
            selectPermission : function (callback) {
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
            },
            // 역할(직책) 검색
            searchRoleList : function (data, callback, errorCallback) {
                baseAjax("GET", "roles/searchRoleList",data, callback, errorCallback);
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
            doc : {
                recent : function (data, callback) {
                    baseAjax("GET", "history/doc/recent", data, callback);
                }
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
				alert(title);
        },
        success : function (title, msg) {
            alert(title);
        },
        warn : function (title, msg) {
            alert(title);
        },
        error : function (title, msg) {
            if (msg == undefined) msg = "";
            alert(title);
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
        load : function (url, data, successCallback, modalClass) {
            let cb = successCallback;

			// 현재 가장 위에 열려있는 모달을 가져온다
            var lastModal = enixClever.modal.openedModalList.last();

            // 기존 팝업이 존재할 경우 상단으로 조금 옮긴다
            if (lastModal != undefined) {
                $(lastModal).addClass("slaveModal");
            }

            var modalId = "#" + enixClever.utils.uuidGenerate();
            $("body").append('<div class="md-modal md-effect-1 {0}" id="{1}"></div>'.format(modalClass, modalId.replace("#", "")));


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
                // icon : "pe-7s-users",
                // icon : "lnr-users",
                icon : getFolderIcon(item.parentGroupId)
                // selected : (idx === 0 && selectFirst == undefined ? false : selectFirst),
                // expanded : (idx === 0 && selectFirst == undefined ? false : selectFirst),
                // expanded : (idx === 0 ? true : false)
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
                icon : null
            });
        });

        return nodeList;
    },
    getContextItem : function (node) {
        var data = node.data;
        var permission = node.permissionInfo;
    }
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

let selectHandller = {
    appendOptionList : function (selector, list, displayKey, valueKey, callback, selectValue, prefixMassage) {
        $(selector).empty();

		let tempSelKey = "";
		console.log("prefixMassage",prefixMassage);
		$(selector).append('<option>▣ {0} 선택해주세요.</option>'.format(prefixMassage));
		
        $.each(list, function (idx, item) {
			tempSelKey = item[valueKey] == selectValue ?  "selected": "";
	        $(selector).append('<option value="{1}" {2}>{0}</option>'.format(item[displayKey], item[valueKey], tempSelKey));
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


function getFolderIcon(iconPart){
	
	let rtnVal; 
	
	if (iconPart == "_TOP") {
		rtnVal = "folder-icon-group-top";
	}else{
		rtnVal = "folder-icon-group";
	}
	
	return rtnVal;
	
}

