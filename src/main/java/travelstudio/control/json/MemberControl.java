package travelstudio.control.json;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;

import net.coobird.thumbnailator.Thumbnails;
import travelstudio.domain.Member;
import travelstudio.service.MemberService;
import travelstudio.service.PostService;

@RestController
@RequestMapping("/member/")
@SessionAttributes({"loginMember"})
public class MemberControl {
  
  @Autowired ServletContext servletContext;
  @Autowired MemberService memberService;
  @Autowired PostService postService;
  
  @RequestMapping("info")
  public JsonResult info() throws Exception {
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("info", memberService.info());
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
  @RequestMapping("countPost")
  public JsonResult countPost() throws Exception {
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("countPost", memberService.countPost());
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
  @RequestMapping("invitingUserPost")
  public JsonResult invitingUserPost(int[] sendermno) throws Exception {
    System.out.printf("sendermno==========>");
    System.out.println(sendermno[0]);
    HashMap<String,Object> dataMap = new HashMap<>();
    List invitingUser = new ArrayList();
    for (int i = 0; i < sendermno.length; i++) {
      invitingUser.add(memberService.inviteInfo(sendermno[i]));
    }
    dataMap.put("invitingUserInfo", invitingUser);      
      
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
  @RequestMapping("search")
  public JsonResult search(String keyword) throws Exception {
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("info", memberService.search(keyword));
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  

  
  
@RequestMapping("detail")
  public JsonResult detail(int mno) throws Exception {
    System.out.print("=======>");
    System.out.println(mno);
    Member member = memberService.get(mno);
    /*System.out.println(member);*/
    if (member == null) {
      return new JsonResult(JsonResult.FAIL, mno + "번 강사가 없습니다.");
    }
    return new JsonResult(JsonResult.SUCCESS, member);
  }


@RequestMapping("update")
public JsonResult update(Member member,HttpServletRequest req, Model model) throws Exception {
  HttpServletRequest httpRequest = (HttpServletRequest) req;
  Member loginMember = (Member)httpRequest.getSession().getAttribute("loginMember");
  member.setMno(loginMember.getMno());
  memberService.update(member);
  
  model.addAttribute("loginMember", member);
  return new JsonResult(JsonResult.SUCCESS, "ok");
}

/*우인재*/
@RequestMapping("add")
public JsonResult add(Member member) throws Exception {
  memberService.add(member);
  return new JsonResult(JsonResult.SUCCESS, "ok");
}

@RequestMapping("header")
public JsonResult header(HttpServletRequest req, HttpServletResponse res) throws Exception {
  HttpServletRequest httpRequest = (HttpServletRequest) req;
  Member loginMember = (Member)httpRequest.getSession().getAttribute("loginMember");
  /*System.out.println(loginMember);*/
  HashMap<String,Object> dataMap = new HashMap<>();
  dataMap.put("loginMember", loginMember);
  return new JsonResult(JsonResult.SUCCESS, dataMap);
}

@RequestMapping("searchOneUser")
public JsonResult searchOneUser(String alias) throws Exception {
  
  /*alias="'"+alias+"'";*/
  /*System.out.println(alias);*/
  HashMap<String,Object> dataMap = new HashMap<>();
  Member member = memberService.searchOneUser(alias);
  
  dataMap.put("Member", member);
  dataMap.put("list", postService.selectOneUserPost(member.getMno()));
  
//  dataMap.put("list", postService.selectOne(String.valueOf(member.getMno())));
//  dataMap.put("totalCount", noticeService.getSize());
  
  return new JsonResult(JsonResult.SUCCESS, dataMap);
}

@RequestMapping("list")
public JsonResult list() throws Exception {
  
  
  HashMap<String,Object> dataMap = new HashMap<>();
  dataMap.put("list", memberService.list());
//  dataMap.put("totalCount", noticeService.getSize());
  
  return new JsonResult(JsonResult.SUCCESS, dataMap);
}

@RequestMapping("subMember")
public JsonResult selectAddress(int mno) throws Exception {
  /*System.out.println("------");*/
 /*System.out.println(mno);*/
  HashMap<String,Object> dataMap = new HashMap<>();
  dataMap.put("subMember", memberService.subMember(mno));
  return new JsonResult(JsonResult.SUCCESS, dataMap);
}

@RequestMapping("myPhotoUpload")
public JsonResult myPhotoUpload(MultipartFile[] files) throws Exception {
  System.out.println(files);
  ArrayList<Object> fileList = new ArrayList<>();
  for (int i = 0; i < files.length; i++) {
    if (files[i].isEmpty()) 
      continue;

    String filename = getNewFilename();
    File file =new File(servletContext.getRealPath("/upload/" + filename));
    files[i].transferTo(file);
    
    File thumbnail = new File(servletContext.getRealPath("/upload/" + filename + "_100"));
    Thumbnails.of(file).size(100, 100).outputFormat("png").toFile(thumbnail);
    
    HashMap<String,Object> fileMap = new HashMap<>();
    fileMap.put("filename", filename);
    fileMap.put("filesize", files[i].getSize());
    fileList.add(fileMap);
  }
  return new JsonResult(JsonResult.SUCCESS, fileList);
}

int count = 0;
synchronized private String getNewFilename() {
  if (count > 100) {
    count = 0;
  }
  return String.format("%d_%d", System.currentTimeMillis(), ++count); 
}






  
}









