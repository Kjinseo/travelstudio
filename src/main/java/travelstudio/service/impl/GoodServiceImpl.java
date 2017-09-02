package travelstudio.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import travelstudio.dao.GoodDao;
import travelstudio.domain.Good;
import travelstudio.domain.Post;
import travelstudio.service.GoodService;

@Service
public class GoodServiceImpl implements GoodService {
  @Autowired GoodDao goodDao;
  

 @Override
 public void add(Good good) throws Exception {
   goodDao.insert(good);
 }


@Override
public Good searchBymnopostno(Good good) throws Exception {
  Good good2 = goodDao.searchBymnopostno(good);
  System.out.println("good--------------------------------");
  System.out.println(good2);
  return good2;
}

public void delete(Good good) throws Exception {
  goodDao.delete(good);
}

public List<Good> selectOneForHeart() throws Exception {
  return goodDao.selectOneForHeart();
}

}







