package travelstudio.service;

import java.util.List;
import travelstudio.domain.Comment;
import travelstudio.domain.Member;


public interface CommentService {
  List<Comment> list(String no) throws Exception;
  void add(Comment comment) throws Exception;
//  void update(Comment comment) throws Exception;
  void remove(int no) throws Exception;
//  int getSize() throws Exception;
}







