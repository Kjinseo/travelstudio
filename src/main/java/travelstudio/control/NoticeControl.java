package travelstudio.control;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import travelstudio.service.NoticeService;

@Controller
@RequestMapping("/notice/")
public class NoticeControl {
  
  @Autowired ServletContext servletContext;
  @Autowired NoticeService noticeService;
  
  @RequestMapping("list")
  public String list(Model model) throws Exception {
    
    model.addAttribute("list", noticeService.list());
    
    return "notice/list";
  }
  /*
  @RequestMapping("detail")
  public String detail(int no, Model model) throws Exception {
    Teacher teacher = teacherService.get(no);
    if (teacher == null) {
      throw new Exception(no + "번 강사가 없습니다.");
    }
    model.addAttribute("teacher", teacher);
    return "teacher/detail";
  }
  
  @RequestMapping("update")
  public String update(Teacher teacher, MultipartFile[] photo) throws Exception {
    teacher.setPhotoList(processMultipartFiles(photo));
    teacherService.update(teacher);
    return "redirect:list.do";
  }
  
  @RequestMapping("delete")
  public String delete(int no) throws Exception {
    teacherService.remove(no);
    return "redirect:list.do";
  }  
  
  @RequestMapping("form")
  public void form() throws Exception {}

  @RequestMapping("add")
  public String add(Teacher teacher, MultipartFile[] photo) throws Exception {
    teacher.setPhotoList(processMultipartFiles(photo));
    teacherService.add(teacher);
    return "redirect:list.do";
  }  
  
  private List<String> processMultipartFiles(MultipartFile[] files) throws Exception {
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









