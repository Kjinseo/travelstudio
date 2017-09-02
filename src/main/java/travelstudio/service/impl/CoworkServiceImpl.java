package travelstudio.service.impl;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import travelstudio.dao.CoworkDao;
import travelstudio.domain.Cowork;
import travelstudio.service.CoworkService;

@Service
public class CoworkServiceImpl implements CoworkService {
  @Autowired CoworkDao coworkDao;
  

 @Override
 public void invite(Cowork cowork) throws Exception {
   coworkDao.invite(cowork);
 }
 @Override
 public void delete(Cowork cowork) throws Exception {
   coworkDao.delete(cowork);
 }
 @Override
 public ArrayList<Cowork> coworkCheck(int mno) throws Exception {
   System.out.println("이거라도 출력해봐");
   System.out.println(mno);
   System.out.println(coworkDao.coworkCheck(mno));
//   return coworkDao.coworkCheck(mno);
  return coworkDao.coworkCheck(mno);
   
   
 }
 
 public void acceptCowork(int memberNo, int postNo) {
   System.out.println(memberNo);
   System.out.println(postNo);
   HashMap<String, Integer> Map = new HashMap<>();
   Map.put("mno", memberNo);
   Map.put("pno", postNo);
   System.out.println(Map);
   coworkDao.acceptCowork(Map);
 }
 
 public void refuseCowork(int memberNo, int postNo) {
   System.out.println(memberNo);
   System.out.println(postNo);
   HashMap<String, Integer> Map = new HashMap<>();
   Map.put("mno", memberNo);
   Map.put("pno", postNo);
   System.out.println(Map);
   coworkDao.refuseCowork(Map);
 }
}







