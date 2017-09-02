package travelstudio.dao;

import java.util.List;
import java.util.Map;

import travelstudio.domain.Member;
import travelstudio.domain.Picture;

public interface PictureDao {
  List<Member> selectList();
//  int getSize();
//  List<Member> selectListByNames(Map<String,Object> valueMap);
//  Member selectOne(int no);
  Member selectOneByEmailPassword(Map<String,Object> valueMap);
int insert(String filename);
int insert1(Picture picture);
int insertAllPhoto(Picture picture);
List<Picture> selectPicNo(String path);
Picture selectByPost(String pictureno);
Picture searchthispicture(String path);
Picture searchPicNo(String path);
//  int update(Member member);
//  int delete(int no) throws Exception;
void delete(int deletepno);
}
