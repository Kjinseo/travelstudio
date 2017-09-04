package travelstudio.control.json;




import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import travelstudio.domain.Cowork;
import travelstudio.domain.Member;
import travelstudio.service.CoworkService;





@RestController
@RequestMapping("/cowork/")
public class CoworkControl {
  
  @Autowired ServletContext servletContext;
  @Autowired CoworkService coworkService;
  
  @RequestMapping("invite")
  public JsonResult invite(Cowork cowork) throws Exception {
    System.out.println("print cowork-------------------");
    System.out.println(cowork);
    ArrayList<String> okMessage = new ArrayList();
    okMessage.add("ok");
    coworkService.invite(cowork);
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("list", okMessage);
//    dataMap.put("totalCount", noticeService.getSize());
    
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }  
  
  @RequestMapping("delete")
  public JsonResult delete(Cowork cowork) throws Exception {
    System.out.println("print cowork-------------------");
    System.out.println(cowork);
    ArrayList<String> aa = new ArrayList();
    aa.add("ok");
    coworkService.delete(cowork);
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("list", aa);
//    dataMap.put("totalCount", noticeService.getSize());
    
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }  
  
  @RequestMapping("checkInvite")
  public JsonResult checkInvite(int mno) throws Exception {
    System.out.printf("멤버번호 보냈다======>%d", mno);
    ArrayList<Cowork> checkNo = coworkService.coworkCheck(mno);
    System.out.println(checkNo);
    HashMap<String,Object> dataMap = new HashMap<>();
    return new JsonResult(JsonResult.SUCCESS, checkNo);
  }
  
  @RequestMapping("acceptRequest")
  public JsonResult acceptRequest(int postNo, HttpSession session) throws Exception {
    coworkService.acceptCowork(getLoginMember(session).getMno(), postNo);
    HashMap<String,Object> dataMap = new HashMap<>();

    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
  @RequestMapping("refuseRequest")
  public JsonResult refuseRequest(int postNo, HttpSession session) throws Exception {
    coworkService.refuseCowork(getLoginMember(session).getMno(), postNo);
    HashMap<String,Object> dataMap = new HashMap<>();

    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
  private Member getLoginMember(HttpSession session) {
    Member loginMember = (Member) session.getAttribute("loginMember");
    return loginMember;
  }

  
}














