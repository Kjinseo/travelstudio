package travelstudio.service;





import java.util.List;

import travelstudio.domain.Detail;

public interface DetailService {
  List<Detail> list() throws Exception;
  void addMap(Detail detail) throws Exception;
  void add(Detail detail) throws Exception;
  void sadd(Detail detail) throws Exception;
//int getSize() throws Exception;
  void deleteBypostno(int postno);
void insertDetailByEmail(Detail detail);
void insertDetailCaptionByPost(Detail detail);
void deleteEmail(String writer);
void insertDetailContent(Detail detail);
void insertDetailCaption(Detail detail);
void insertDetailDate(Detail detail);
void insertDetailLocation(Detail detail);
List<Detail> selectedOneDetail(String postno);
List<Detail> selectAddress(int mno) throws Exception;
List<Detail> carouselNation(int mno) throws Exception;
void addAllphoto(Detail detail);
void pictureNoSearch(int postno);

void insertDetailLocationByPost(Detail detail);

}