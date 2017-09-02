package travelstudio.service;





import java.util.List;

import travelstudio.domain.Follow;

public interface FollowService {
  void add(Follow follow) throws Exception;
  Follow searchBymnomno2(Follow follow)throws Exception;
  void delete(Follow follow) throws Exception;
  List<Follow> listByloginMember(int mno);
//  int getSize() throws Exception;
}







