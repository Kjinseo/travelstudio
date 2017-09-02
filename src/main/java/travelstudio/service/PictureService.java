package travelstudio.service;

import java.util.List;

import travelstudio.domain.Picture;

public interface PictureService {
  void add(String filename) throws Exception;
  void add1(Picture picture) throws Exception;
  void addAllPicture(Picture picture) throws Exception;
  List<Picture> selectPicNo(String path);
//  List<Post> list() throws Exception;
//  List<Post> getWriteCount(Post post) throws Exception;
//  int getSize() throws Exception;
  Picture selectByPost(String pictureno);
  Picture searchthispicture(String path);
  Picture searchPicNo(String path);
//  void delete(int deletepno);
  void delete(int deletepno);
}







