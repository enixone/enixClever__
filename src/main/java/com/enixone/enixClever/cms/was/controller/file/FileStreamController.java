package com.enixone.enixClever.cms.was.controller.file;

import com.enixone.enixClever.cms.was.base.BaseController;
import com.enixone.enixClever.cms.was.model.FileVO;
import com.enixone.enixClever.cms.was.utils.FileUtils;
import com.enixone.enixClever.core.common.Result;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.net.URLEncoder;
import java.nio.file.Paths;

@Controller
@RequestMapping("/io")
public class FileStreamController extends BaseController {

    @Value("${temp.uploadPath}")
    private String uploadPath;

    @ResponseBody
    @RequestMapping(value = "", method = RequestMethod.POST)
    public Result fileUpload(final MultipartHttpServletRequest request, @RequestParam String name,  MultipartFile uploadFile, final Result result) throws Exception {
        MultipartFile file = request.getFile("file");

        if (file != null) {

        	logger.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>file.getName : " + file.getName());
        	logger.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>file.getSize : " + file.getSize());
        	
        	String fileName = FileUtils.getFileBaseName(name);
            String tempPath = Paths.get(uploadPath, fileName).toString();

            file.transferTo(new File(tempPath));

        } else {
            logger.info("file is null");
        }

        result.setSuccess();
        return result;
    }

    @RequestMapping(value = "/{fileId}", method = RequestMethod.GET)
    public void fileDownload(@PathVariable String fileId, HttpServletResponse response) {
        try {
            FileVO vo = fileService.selectFileInfo(fileId);

            File downloadFile = new File(vo.getFilePath());
            byte[] fileByte = org.apache.commons.io.FileUtils.readFileToByteArray(downloadFile);

            response.setContentType("application/octet-stream");
            response.setContentLength(fileByte.length);
            response.setHeader("Content-Disposition", "attachment; fileName=\"" + URLEncoder.encode(vo.getFileName(),"UTF-8")+"\";");
            response.setHeader("Content-Transfer-Encoding", "binary");
            response.getOutputStream().write(fileByte);

            response.getOutputStream().flush();
            response.getOutputStream().close();

        } catch (Exception e) {

        }
    }
}
