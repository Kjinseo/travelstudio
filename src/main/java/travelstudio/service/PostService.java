package travelstudio.service;
import java.util.List;

import travelstudio.domain.Post;

public interface PostService {
  List<Post> koreaList() throws Exception; // 국내 여행 리스트 가져오기
  List<Post> foreignList() throws Exception; // 해외 여행 리스트 가져오기
  List<Post> foreignAllList() throws Exception; // 해외 여행 전체 리스트 가져오기
  List<Post> ListandGood() throws Exception;
  void add(Post post) throws Exception;
  List<Post> info1(String number) throws Exception;
  List<Post> getWriteCount(Post post) throws Exception;
  Post selectOne(String postno)throws Exception;
  List<Post> search(String keyword)throws Exception;
  List<Post> selectOneUserPost(int number) throws Exception;
  Post requestedPost(int postno) throws Exception;
  void like(Post post)throws Exception;
  void BackgroundUpdate(Post post)throws Exception;
  List<Post> listCoworkPost(int no);//초대받은 게시물 리스트 가져오기
//  int getSize() throws Exception;
}







