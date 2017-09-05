package travelstudio.dao;

import java.util.List;
import java.util.Map;

import travelstudio.domain.Post;

public interface PostDao {
  List<Post> selectList();
  List<Post> ListandGood();
  List<Post> getWriteCount(Post post);
  int insert(Post post);
  void insertPhoto(Map<String,Object> valueMap);
  Post selectOne(String postno);
  List<Post> search(String keyword);
  List<Post> selectOneUserPost(int number);
  Post requestedPost(int postno);
  List<Post> info1(String number);
  void updateLike(Post post);
  void BackgroundUpdate(Post post);
  List<Post> selectCoworkPost(int no);//초대받은 게시물 리스트 가져오기
  List<Post> selectKoreaList();
  List<Post> selectForeignList();
  List<Post> selectForeignAllList();
  
//  int getSize();
//  List<Member> selectListByNames(Map<String,Object> valueMap);
//  Member selectOne(int no);
//  Member selectOneByEmailPassword(Map<String,Object> valueMap);
//  int insert(Member member);
//  int update(Member member);
//  int delete(int no) throws Exception;
}
