package travelstudio.control.json;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import net.coobird.thumbnailator.Thumbnails;
import travelstudio.domain.Detail;
import travelstudio.domain.Member;
import travelstudio.domain.Post;
import travelstudio.service.DetailService;
import travelstudio.service.PostService;

@RestController
@RequestMapping("/post/")
public class PostControl {
  
  @Autowired ServletContext servletContext;
  @Autowired DetailService detailService;
  @Autowired PostService postService;
  @Autowired ServletContext ctx;
  
  @RequestMapping("ListandGood")
  public JsonResult ListandGood() throws Exception {
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("ListandGood", postService.ListandGood());
//    dataMap.put("totalCount", noticeService.getSize());
    
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
  
  
  @RequestMapping("list")
  public JsonResult list() throws Exception {
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("list", postService.list());
//    dataMap.put("totalCount", noticeService.getSize());
    
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
@RequestMapping("selectOneUserPost")
  public JsonResult selectOneUserPost(int number) throws Exception {
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("selectOneUserPost", postService.selectOneUserPost(number));
//    dataMap.put("totalCount", noticeService.getSize());
    
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }



@RequestMapping("invitingUserPost")
public JsonResult invitingUserPost(int[] requestPost) throws Exception {
  HashMap<String,Object> dataMap = new HashMap<>();
  System.out.println(requestPost);
  List toLoadPostNo = new ArrayList();
  for(int i = 0; i < requestPost.length; i++) {
    toLoadPostNo.add(postService.requestedPost(requestPost[i]));
  }
  
  dataMap.put("invitingUserPost", toLoadPostNo);
  System.out.printf("List 호출할게=================>");
  System.out.println(toLoadPostNo);
  
  return new JsonResult(JsonResult.SUCCESS, dataMap);
}
  

  @RequestMapping("info1")
  public JsonResult info1(String number) throws Exception {
    System.out.println(number);
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("info", postService.info1(number));
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
  @RequestMapping("search")
  public JsonResult search(String keyword) throws Exception {
    
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("list", postService.search(keyword));
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
  @RequestMapping("count")
  public JsonResult getWriteCount(Post post) throws Exception {
    System.out.println(post);
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("list", postService.getWriteCount(post));
    return new JsonResult(JsonResult.SUCCESS,dataMap);
  }
  
/*  @RequestMapping("add")
  public String add(Post post) throws Exception {
    System.out.println("1");
    postService.add(post);
    return "a";
    
  }  */
  
  @RequestMapping("selectOne")
  public JsonResult selectOne(String number) throws Exception {
    /*System.out.printf("%s 셀렉트원",number);*/
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("selectedPost", postService.selectOne(number));
//    dataMap.put("totalCount", noticeService.getSize());
    
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
  
  @RequestMapping("add")
  public JsonResult add(Post post, String[] content, String[] caption, String[] travelDate, String[] location, HttpServletRequest req, MultipartFile[] files) throws Exception {
    
    HttpServletRequest httpRequest= (HttpServletRequest) req;
    Member loginMember = (Member)httpRequest.getSession().getAttribute("loginMember");
    

    System.out.println("%%%%%%%%%%%%%%%%%%%%%%%");
    System.out.println(post);
    
    if(files!=null){
      String newFilename = this.getNewFilename();
      File file = new File(ctx.getRealPath("/upload/" + newFilename));
    files[0].transferTo(file);
    post.setCont("/mypage/upload/" + newFilename);
    File thumbnail = new File(ctx.getRealPath("/upload/" + newFilename + "_1920"));
    Thumbnails.of(file).size(2500, 2500).outputFormat("png").toFile(thumbnail);
    }
    
    post.setMno(loginMember.getMno());
    postService.add(post);
    
    
    
    /*System.out.println(post.getCont());*/
    /*System.out.println(post);
     * 
    System.out.println(post.getPostno());*/
    
    Detail detail = new Detail();
    Detail detailCaption = new Detail();
    Detail detailTravelDate = new Detail();
    Detail detailLocation = new Detail();
    
    detail.setPostno(post.getPostno());
    /*System.out.println(post.getCont());*/
    
    detail.setWriter(loginMember.getEmail());
    
    System.out.println(content);
    if(content!=null){
    for(int i=0;i<content.length;i+=2){
      detail.setCont(content[i+1]);
      System.out.println("콘텐츠 하나씩 출력");
      System.out.println(content[i]);
      detail.setSrtno(Integer.parseInt((content[i])));
      System.out.println(content[i]);
      detailService.insertDetailContent(detail);
    }
    }
    detailService.insertDetailByEmail(detail);
    
    
    detailCaption.setPostno(post.getPostno());
    detailCaption.setWriter(loginMember.getEmail());
    
    if(caption!=null){
    for(int j=0; j < caption.length;j+=2){
      System.out.printf("caption 넘기기 ========>");
      System.out.printf("%s,%s\n",caption[j],caption[j+1]);
      detailCaption.setSrtno(Integer.parseInt(caption[j]));
      detailCaption.setCapt(caption[j+1]);
      detailService.insertDetailCaption(detailCaption);
    }
    }
    detailService.insertDetailByEmail(detailCaption);
    
    System.out.printf("날짜확인=========>");
    detailTravelDate.setPostno(post.getPostno());
    detailTravelDate.setWriter(loginMember.getEmail());
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    Date dateTypeCasting = null;
    
    String oldstring = null;
    
    for(int k=0; k < travelDate.length; k+=2) {
      
      detailTravelDate.setSrtno(Integer.parseInt(travelDate[k]));
      /*Date date = new SimpleDateFormat("yyyy-MM-dd").parse([k+1]);*/
      detailTravelDate.setDate(travelDate[k+1]);
//      detailTravelDate.setDate(travelDate[k+1]);
      detailService.insertDetailDate(detailTravelDate);
    }
    detailService.insertDetailByEmail(detailTravelDate);
    
    
    detailLocation.setPostno(post.getPostno());
    detailLocation.setWriter(loginMember.getEmail());
    for(int k=0; k < location.length; k+=2) {
      
      detailLocation.setSrtno(Integer.parseInt(travelDate[k]));
      detailLocation.setAddress(location[k+1]);
//      detailTravelDate.setDate(travelDate[k+1]);
      detailService.insertDetailLocation(detailLocation);
    }
    detailService.insertDetailByEmail(detailLocation);
    
    detailService.deleteEmail(loginMember.getEmail());
    
    System.out.println("detailTravelDate==============>");
    detailService.deleteEmail(loginMember.getEmail());
    System.out.println();
    
    
    
    
    return new JsonResult(JsonResult.SUCCESS, post);
  }  
  
  @RequestMapping("delete")
  public JsonResult delete(int postno) throws Exception {
    /*System.out.printf("%s 셀렉트원",number);*/
    HashMap<String,Object> dataMap = new HashMap<>();
//    dataMap.put("selectedPost", postService.selectOne(number));
//    dataMap.put("totalCount", noticeService.getSize());
    System.out.printf("postno 넘기기 성공==========>%d", postno);
    List<Integer> picno = new ArrayList();
    detailService.pictureNoSearch(postno);
    
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
  int count = 0;
  synchronized private String getNewFilename() {
    if (count > 100) {
      count = 0;
    }
    return String.format("%d_%d", System.currentTimeMillis(), ++count); 
  }
  
  

}









