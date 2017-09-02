package travelstudio.control.json;

import java.util.HashMap;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import travelstudio.domain.Comment;
import travelstudio.domain.Member;
import travelstudio.service.CommentService;



@RestController
@RequestMapping("/comment/")
public class CommentControl {
  
  @Autowired ServletContext servletContext;
  @Autowired CommentService commentService;
  
  @RequestMapping("list")
  public JsonResult list(String number) throws Exception {
    
    
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("list", commentService.list(number));
//    dataMap.put("totalCount", noticeService.getSize());
    
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  

  @RequestMapping("update")
  public JsonResult update(Comment comment) throws Exception {
    /*commentService.update(comment);*/
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }
  
  @RequestMapping("delete")
  public JsonResult delete(int no) throws Exception {
    commentService.remove(no);
    System.out.println("delete ok");
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }  
  
  @RequestMapping("add")
  public JsonResult add(Comment comment, HttpServletRequest req) throws Exception {
    HttpServletRequest httpRequest= (HttpServletRequest) req;
    Member loginMember = (Member)httpRequest.getSession().getAttribute("loginMember");
    comment.setMno(loginMember.getMno());
    commentService.add(comment);
    System.out.println("1");
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }  
  
}


//  @RequestMapping("detail")
//  public JsonResult detail(int no) throws Exception {
//    Teacher teacher = teacherService.get(no);
//    if (teacher == null) {
//      return new JsonResult(JsonResult.FAIL, no + "번 강사가 없습니다.");
//    }
//    return new JsonResult(JsonResult.SUCCESS, teacher);
//  }
//  







