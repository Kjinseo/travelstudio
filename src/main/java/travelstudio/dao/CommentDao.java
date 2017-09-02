package travelstudio.dao;

import java.util.List;

import travelstudio.domain.Comment;


public interface CommentDao {
  List<Comment> selectList(String no);
  int insert(Comment commnet);
  Comment selectOne(int no);
  int delete(int no);
  int update(Comment commnet);
}
