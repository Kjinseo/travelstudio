package travelstudio.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import travelstudio.dao.FollowDao;
import travelstudio.domain.Follow;
import travelstudio.service.FollowService;

@Service
public class FollowServiceImpl implements FollowService {
  @Autowired FollowDao followDao;
  

 @Override
 public void add(Follow follow) throws Exception {
   followDao.insert(follow);
 }


@Override
public Follow searchBymnomno2(Follow follow) throws Exception {
  Follow follow2 = followDao.searchBymnomno(follow);
  System.out.println("good--------------------------------");
  System.out.println(follow2);
  return follow2;
}

public void delete(Follow follow) throws Exception {
  followDao.delete(follow);
}


@Override
public List<Follow> listByloginMember(int mno) {
  return  followDao.listByloginMember(mno);
}

}







