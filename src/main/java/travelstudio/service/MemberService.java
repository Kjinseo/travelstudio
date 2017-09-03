package travelstudio.service;

import java.util.List;

import travelstudio.domain.Member;

public interface MemberService {
  List<Member> info() throws Exception;
  List<Member> countPost() throws Exception;
  List<Member> search(String keyword) throws Exception;
  void add(Member member) throws Exception;
  Member get(int mno) throws Exception;
  Member inviteInfo(int sendermno) throws Exception;
  List<Member> list() throws Exception;
  Member getByEmailPassword(String email, String password) throws Exception;
  void update(Member member) throws Exception;
  Member searchOneUser(String alias);
  Member subMember(int mno);
  
  
  /*우인재*/
}







