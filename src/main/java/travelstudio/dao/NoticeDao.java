package travelstudio.dao;

import java.util.List;
import java.util.Map;

import travelstudio.domain.Notice;

public interface NoticeDao {
  List<Notice> selectList();
//  Notice selectOne(int no);
//  Notice selectOneByEmailPassword(Map<String,Object> valueMap);
//  int countAll();
//  int insert(Notice notice);
//  int delete(int no);
//  int update(Notice notice);
//  void insertPhoto(Map<String,Object> valueMap);
//  List<String> selectPhotoList(int teacherNo);
//  void deletePhoto(int teacherNo);
}
