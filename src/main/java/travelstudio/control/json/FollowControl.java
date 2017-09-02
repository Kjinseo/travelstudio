package travelstudio.control.json;
import java.util.HashMap;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import travelstudio.domain.Follow;
import travelstudio.domain.Member;
import travelstudio.service.FollowService;
import travelstudio.service.PostService;





@RestController
@RequestMapping("/follow/")
public class FollowControl {
  
  @Autowired ServletContext servletContext;
  @Autowired FollowService followService;
  @Autowired PostService postService;
  
  @RequestMapping("add")
  public String add(Follow follow) throws Exception {
    System.out.println("print follow-------------------");
    System.out.println(follow);
    followService.add(follow);
    return "ok";
  }  
  
  @RequestMapping("searchBymnomno2")
  public JsonResult searchBymnopostno(Follow follow) throws Exception {
    if(follow.getMno()==0){
      return new JsonResult(JsonResult.FAIL, follow);
    }
    System.out.println(follow);
    System.out.println("--------------------good");
    Follow follow2 = followService.searchBymnomno2(follow);
    System.out.println(follow2);
    System.out.println("good2===============================");
    if(follow2==null){
      return new JsonResult(JsonResult.FAIL, follow2);
    }else{
      return new JsonResult(JsonResult.SUCCESS, follow2);
    }
  }  
  
  
  @RequestMapping("delete")
  public String delete(Follow follow) throws Exception {
    
    followService.delete(follow);
    return "ok";
  }  
  
  @RequestMapping("listByloginMember")
  public JsonResult listByloginMember(HttpServletRequest req) throws Exception {
    HttpServletRequest httpRequest= (HttpServletRequest) req;
    Member loginMember = (Member)httpRequest.getSession().getAttribute("loginMember");
    
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("list", followService.listByloginMember(loginMember.getMno()));
    System.out.println("listByloginMember---------------------");
    System.out.println(loginMember.getMno());
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }  


  /*
  @RequestMapping("addMap")
  public String addMap(Detail detail, HttpServletRequest req) throws Exception {
    HttpServletRequest httpRequest = (HttpServletRequest) req;
    Member loginMember = (Member)httpRequest.getSession().getAttribute("loginMember");
    detail.setWriter(loginMember.getEmail());
    System.out.println(detail);
    detailService.addMap(detail);
    return "a";
    
  }  */
  
  
  
}









