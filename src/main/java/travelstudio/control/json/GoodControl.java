package travelstudio.control.json;




import java.util.HashMap;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import travelstudio.domain.Good;
import travelstudio.domain.Post;
import travelstudio.service.GoodService;
import travelstudio.service.PostService;





@RestController
@RequestMapping("/good/")
public class GoodControl {
  
  @Autowired ServletContext servletContext;
  @Autowired GoodService goodService;
  @Autowired PostService postService;
  
  @RequestMapping("add")
  public String add(Good good,int number) throws Exception {
    
    goodService.add(good);
    Post post = new Post();
    post.setGood(number);
    post.setPostno(good.getPostno());
    postService.like(post);
    return "ok";
  }  
  
  @RequestMapping("searchBymnopostno")
  public JsonResult searchBymnopostno(Good good) throws Exception {
    if(good.getMno()==0){
      return new JsonResult(JsonResult.FAIL, good);
    }
    /*System.out.println(good);*/
    /*System.out.println("--------------------good");*/
    Good good2 = goodService.searchBymnopostno(good);
    /*System.out.println(good2);*/
    /*System.out.println("good2===============================");*/
    if(good2==null){
      return new JsonResult(JsonResult.FAIL, good2);
    }else{
      return new JsonResult(JsonResult.SUCCESS, good2);
    }
  }  
  
  
  @RequestMapping("delete")
  public String delete(Good good,int number) throws Exception {
    
    goodService.delete(good);
    Post post = new Post();
    post.setGood(number);
    post.setPostno(good.getPostno());
    postService.like(post);
    return "ok";
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
  
  @RequestMapping("selectOneForHeart")
  public JsonResult selectOneForHeart() throws Exception {
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("selectOneForHeart", goodService.selectOneForHeart());
//    dataMap.put("totalCount", noticeService.getSize());
    
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
  
  
}









