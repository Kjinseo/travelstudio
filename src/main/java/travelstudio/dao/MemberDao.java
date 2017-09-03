package travelstudio.dao;

import java.util.List;
import java.util.Map;

import travelstudio.domain.Member;

public interface MemberDao {
 List<Member> selectList();
 List<Member> countPost();
  List<Member> selectSearchList(String keyword);
  Member selectOne(int mno);
  int update(Member member);
  Member searchOneUser(String alias);
  
  Member inviteInfo(int sendermno);
  
  Member selectOneByEmailPassword(Map<String,Object> valueMap);
  int insert(Member member);
  
  Member subMember(int no);
  
}
