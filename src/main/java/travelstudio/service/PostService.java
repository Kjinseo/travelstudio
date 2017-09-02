package travelstudio.service;





import java.util.List;

import travelstudio.domain.Post;

public interface PostService {
  List<Post> list() throws Exception;
  List<Post> ListandGood() throws Exception;
  void add(Post post) throws Exception;
  List<Post> info1(String number) throws Exception;
  List<Post> getWriteCount(Post post) throws Exception;
  Post selectOne(String postno)throws Exception;
  List<Post> search(String keyword)throws Exception;
  List<Post> selectOneUserPost(int number) throws Exception;
  Post requestedPost(int postno) throws Exception;
  void like(Post post)throws Exception;
  
//  int getSize() throws Exception;
}







