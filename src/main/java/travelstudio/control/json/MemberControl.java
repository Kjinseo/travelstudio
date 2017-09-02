package travelstudio.control.json;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import travelstudio.domain.Member;
import travelstudio.service.MemberService;
import travelstudio.service.PostService;

@RestController
@RequestMapping("/member/")
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
public JsonResult update(Member member,HttpServletRequest req) throws Exception {
  HttpServletRequest httpRequest = (HttpServletRequest) req;
  Member loginMember = (Member)httpRequest.getSession().getAttribute("loginMember");
  member.setMno(loginMember.getMno());
  memberService.update(member);
  loginMember.setAlias(member.getAlias());
  loginMember.setIntro(member.getIntro());
  return new JsonResult(JsonResult.SUCCESS, "ok");
}

@RequestMapping(path="upload1")
public Object upload1(MultipartFile[] files, HttpServletRequest req) throws Exception {
  HttpServletRequest httpRequest = (HttpServletRequest) req;
  Member loginMember = (Member)httpRequest.getSession().getAttribute("loginMember");
  
  HashMap<String,Object> resultMap = new HashMap<>();
 /* ProfileService.photoUp*/
  ArrayList<Object> fileList = new ArrayList<>();
  
  for (int i = 0; i < files.length; i++) {
    files[i].transferTo(new File(servletContext.getRealPath("/mypage/upload/" + files[i].getOriginalFilename())));
    /*System.out.println(files[i].getOriginalFilename());*/
    HashMap<String,Object> fileMap = new HashMap<>();
    fileMap.put("filename", files[i].getOriginalFilename());
    fileMap.put("filesize", files[i].getSize());
    fileList.add(fileMap);
    Member member = new Member();
    
    
    String newFile =files[i].getOriginalFilename();
    /*System.out.println(newFile);*/
    member.setPath(newFile);
    member.setMno(loginMember.getMno());
    
    memberService.insertPhoto(member);
    loginMember.setPath(newFile);
    
  }
  resultMap.put("fileList", fileList);
  return resultMap;
}


/*우인재*/
@RequestMapping("add")
public JsonResult add(Member member) throws Exception {
  memberService.add(member);
  /*System.out.println("1");*/
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

/*    
  
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









