package travelstudio.dao;

import java.util.List;

import travelstudio.domain.Good;
import travelstudio.domain.Post;

public interface GoodDao {
//  int getSize();
//  List<Member> selectListByNames(Map<String,Object> valueMap);
//  Member selectOne(int no);
int insert(Good good);
Good searchBymnopostno(Good good);
int delete(Good good);
List<Good> selectOneForHeart();

/*Picture selectByPost(String pictureno);*/
//  int update(Member member);
//  int delete(int no) throws Exception;
}
