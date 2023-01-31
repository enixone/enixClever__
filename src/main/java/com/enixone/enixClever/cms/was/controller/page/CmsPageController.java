package com.enixone.enixClever.cms.was.controller.page;

import com.enixone.enixClever.core.annotation.LoginCheckAnnotation;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;

@Controller
public class CmsPageController {

    @LoginCheckAnnotation
    @RequestMapping({"", "/"})
    public String indexPage() {
        return "/cms/index.html";
    }

    @RequestMapping("/login")
    public String loginPage() {
        return "/cms/login/login.html";
    }

    @LoginCheckAnnotation
    @RequestMapping("/manager")
    public String managerPage() {
        return "/manager/index.html";
    }

    @RequestMapping("/external/{urlLinkId}")
    public String externalView(@PathVariable String urlLinkId, HttpServletResponse response) {
        response.addHeader("urlLinkId", urlLinkId);
        return "/cms/external/urlLinkView.html";
    }
}