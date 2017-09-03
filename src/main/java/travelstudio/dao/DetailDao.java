package travelstudio.dao;

import java.util.ArrayList;
import java.util.List;

import travelstudio.domain.Detail;

public interface DetailDao {
  List<Detail> selectList();
  int insert(Detail detail);
  void insert_map(Detail detail);
//  int getSize();
//  List<Member> selectListByNames(Map<String,Object> valueMap);
//  Member selectOne(int no);
//  Member selectOneByEmailPassword(Map<String,Object> valueMap);
//  int insert(Member member);
//  int update(Member member);
//  int delete(int no) throws Exception;
//int getSize();
//List<Member> selectListByNames(Map<String,Object> valueMap);
//Member selectOne(int no);
//Member selectOneByEmailPassword(Map<String,Object> valueMap);
//int insert(Member member);
//int update(Member member);
//int delete(int no) throws Exception;
  void insertDetailCaptionByPost(Detail detail);
void insertDetailByEmail(Detail detail);
void deleteEmail(String writer);
void deleteBypostno(int postno);
void insertDetailContent(Detail detail);
void insertDetailCaption(Detail detail);
void insertDetailDate(Detail detail);
void insertDetailLocation(Detail detail);
List<Detail> selectedOneDetail(String postno);
List<Detail> selectAddress(int mno);
List<Detail> carouselNation(int mno);
void addAllphoto(Detail detail);
ArrayList<Detail> picnosearch(int postno);
void deletePicture(int picno);
void deleteDetail(int postno);
void addAllphoto2(Detail detail);
void deletePost(int postno);
void insertDetailLocationByPost(Detail detail);
}
