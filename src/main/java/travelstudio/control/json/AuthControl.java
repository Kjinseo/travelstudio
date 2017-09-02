package travelstudio.control.json;


import javax.servlet.ServletContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import travelstudio.domain.Member;
import travelstudio.service.MemberService;

@RestController
@RequestMapping("/auth/")
@SessionAttributes({"loginMember"})
public class AuthControl {
  @Autowired
  MemberService memberService;

  @RequestMapping(path="login", method=RequestMethod.POST)
  public JsonResult login(String email, String password, String saveEmail, 
      Model model, HttpServletRequest request ,HttpServletResponse response) throws Exception {
    
    Member member = null;
//    if (userType.equals("teacher")) {
    System.out.println(email);
    System.out.println(password);
      member = memberService.getByEmailPassword(email, password);
      System.out.println(member);
//    }
    
    if (member != null) { 
      model.addAttribute("loginMember", member);
      
      String sessionId = "id_" + System.currentTimeMillis();
      ServletContext context = request.getSession().getServletContext();

      context.setAttribute(sessionId, member);
      
      // 쿠키 생성
      Cookie cookie = new Cookie("sessionId", sessionId);
      
      // 쿠키 사용처의 범위를 지정
      cookie.setPath(request.getContextPath()); // ==> /project01
      
      // 쿠키를 클라이언트로 보내는 방법? 응답 헤더에 추가한다.
      response.addCookie(cookie);
      
      
      if (saveEmail != null) {
        Cookie cookie2 = new Cookie("email", email);
        cookie2.setMaxAge(60 * 60 * 24 * 7); 
        response.addCookie(cookie2);
        System.out.println(cookie2);
      } else {
        Cookie cookie2 = new Cookie("email", "");
        cookie2.setMaxAge(0);
        response.addCookie(cookie2);
        
      }
      return new JsonResult(JsonResult.SUCCESS, "ok");
      
    } else {
      return new JsonResult(JsonResult.FAIL, "fail");
    }
  }
  
  @RequestMapping("logout")
  public JsonResult logout(HttpSession session, SessionStatus status) throws Exception {
    status.setComplete();
    session.invalidate();  // 세션 무효화.
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }
  
  @RequestMapping("userinfo")
  public JsonResult userinfo(HttpSession session) throws Exception {
    Member loginMember = (Member)session.getAttribute("loginMember");
    return new JsonResult(JsonResult.SUCCESS, loginMember);
  }
}








