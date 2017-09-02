package travelstudio.control.json;

import java.util.HashMap;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import travelstudio.service.NoticeService;

@RestController
@RequestMapping("/notice/")
public class NoticeControl {
  
  @Autowired ServletContext servletContext;
  @Autowired NoticeService noticeService;
  
  @RequestMapping("list")
  public JsonResult list() throws Exception {
    
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("list", noticeService.list());
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
/*  @RequestMapping("detail")
  public JsonResult detail(int no) throws Exception {
    Teacher teacher = teacherService.get(no);
    if (teacher == null) {
      return new JsonResult(JsonResult.FAIL, no + "번 강사가 없습니다.");
    }
    return new JsonResult(JsonResult.SUCCESS, teacher);
  }
  
  @RequestMapping("update")
  public JsonResult update(Teacher teacher) throws Exception {
    teacherService.update(teacher);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }
  
  @RequestMapping("delete")
  public JsonResult delete(int no) throws Exception {
    teacherService.remove(no);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }  
  
  @RequestMapping("add")
  public JsonResult add(Teacher teacher) throws Exception {
    teacherService.add(teacher);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }*/  
  
/*  private List<String> processMultipartFiles(MultipartFile[] files) throws Exception {
    ArrayList<String> photoList = new ArrayList<>();
    for (MultipartFile file : files) {
      if (file.isEmpty())
        continue;
      String filename = getNewFilename();
      file.transferTo(new File(servletContext.getRealPath("/teacher/photo/" + filename)));
      photoList.add(filename);
    }
    return photoList;
  }
  
  
  int count = 0;
  synchronized private String getNewFilename() {
    if (count > 100) {
      count = 0;
    }
    return String.format("%d_%d", System.currentTimeMillis(), ++count); 
  }*/
}









