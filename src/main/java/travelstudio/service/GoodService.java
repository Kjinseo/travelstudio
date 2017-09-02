package travelstudio.service;





import java.util.List;

import travelstudio.domain.Good;
import travelstudio.domain.Post;

public interface GoodService {
  void add(Good good) throws Exception;
  Good searchBymnopostno(Good good)throws Exception;
  void delete(Good good) throws Exception;
  List<Good> selectOneForHeart() throws Exception;
//  int getSize() throws Exception;
}







