package travelstudio.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import travelstudio.dao.DetailDao;
import travelstudio.domain.Detail;
import travelstudio.service.DetailService;

@Service
public class DetailServiceImpl implements DetailService {
  @Autowired DetailDao detailDao;
  
  public List<Detail> list() throws Exception {
    return detailDao.selectList();
  }
  
 
 public void add(Detail detail) throws Exception {
   /*detailDao.insert(detail);*/
   detailDao.insert_map(detail);
 }
 public void addMap(Detail detail) throws Exception {
   /*detailDao.insert(detail);*/
   detailDao.insert_map(detail);
 }
 
 
 @Override
 public void pictureNoSearch(int postno) {
   
   ArrayList<Detail> picno = detailDao.picnosearch(postno);
//   ArrayList<String> arr1 ;
   System.out.printf("picno리턴 받는다=========>");
   System.out.println(picno);
   for(int i =0; i < picno.size(); i++) {
     detailDao.deletePicture(picno.get(i).getPicno());
   }
   
   detailDao.deleteDetail(postno);
   detailDao.deletePost(postno);
   
 }
 
@Override
public void insertDetailByEmail(Detail detail) {
  detailDao.insertDetailByEmail(detail);
}
@Override
public void sadd(Detail detail) throws Exception {
  detailDao.insert(detail);
  
}


@Override
public void deleteEmail(String writer) {
  detailDao.deleteEmail(writer);
  
}


@Override
public void insertDetailContent(Detail detail) {
  detailDao.insertDetailContent(detail);
}
@Override
public void insertDetailCaption(Detail detail) {
  detailDao.insertDetailCaption(detail);
}

@Override
public void insertDetailDate(Detail detail) {
  System.out.println(detail);
  detailDao.insertDetailDate(detail);
}

@Override
public void insertDetailLocation(Detail detail) {
  System.out.println(detail);
  detailDao.insertDetailLocation(detail);
}

@Override
public List<Detail> selectedOneDetail(String postno) {
  return detailDao.selectedOneDetail(postno);
}


@Override
public List<Detail> selectAddress(int mno) throws Exception {
  return detailDao.selectAddress(mno);
}

public List<Detail> carouselNation(int mno) throws Exception {
  return detailDao.carouselNation(mno);
}
@Override
public void addAllphoto(Detail detail) {
  System.out.printf("detail====================>");
  System.out.println(detail);
  detailDao.addAllphoto(detail);
  
}


@Override
public void insertDetailCaptionByPost(Detail detail) {
  detailDao.insertDetailCaptionByPost(detail);
}

@Override
public void deleteBypostno(int postno) {
  detailDao.deleteBypostno(postno);
  
}
@Override
public void insertDetailLocationByPost(Detail detail) {
  // TODO Auto-generated method stub
  detailDao.insertDetailLocationByPost(detail);
}

//  
//  public Teacher get(int no) throws Exception {
//    return teacherDao.selectOne(no);
//  }
//  
//  public Teacher getByEmailPassword(String email, String password) throws Exception {
//    HashMap<String,Object> valueMap = new HashMap<>();
//    valueMap.put("email", email);
//    valueMap.put("password", password);
//    
//    return teacherDao.selectOneByEmailPassword(valueMap);
//  }


  
//  @Override
//  public int getSize() throws Exception {
//    return noticeDao.countAll();
//  }
  
//  // XML 태그로 트랜잭션을 설정하게 되면 @Transactional 애노테이션은 필요없다.
//  //@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
//  public void add(Teacher teacher) throws Exception {
//    memberDao.insert(teacher);
//    teacherDao.insert(teacher);
//    this.insertPhoto(teacher.getNo(), teacher.getPhotoList()); // 강사 사진 추가
//  }
//  
//  //XML 태그로 트랜잭션을 설정하게 되면 @Transactional 애노테이션은 필요없다.
//  //@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
//  public void update(Teacher teacher) throws Exception {
//    int count = memberDao.update(teacher);
//    if (count < 1) {
//      throw new Exception(teacher.getNo() + "번 강사를 찾을 수 없습니다.");
//    }
//    
//    count = teacherDao.update(teacher);
//    if (count < 1) {
//      throw new Exception(teacher.getNo() + "번 강사를 찾을 수 없습니다.");
//    }
//    
//    // 강사 사진 갱신
//    teacherDao.deletePhoto(teacher.getNo()); // 강사의 모든 사진을 지운다.
//    this.insertPhoto(teacher.getNo(), teacher.getPhotoList()); // 강사 사진 추가
//  }
//  
//  private void insertPhoto(int teacherNo, List<String> photoPathList) {
//    if (photoPathList == null)
//      return;
//    
//    HashMap<String,Object> valueMap = new HashMap<>();
//    valueMap.put("teacherNo", teacherNo);
//    
//    for (String photoPath : photoPathList) {
//      valueMap.put("photoPath", photoPath);
//      teacherDao.insertPhoto(valueMap);
//    }
//  }
//  
//  //XML 태그로 트랜잭션을 설정하게 되면 @Transactional 애노테이션은 필요없다.
//  //@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
//  public void remove(int no) throws Exception {
//    teacherDao.deletePhoto(no);
//    int count = teacherDao.delete(no);
//    if (count < 1) {
//      throw new Exception(no + "번 강사를 찾을 수 없습니다.");
//    }
//    
//    try {
//      count = memberDao.delete(no);
//    } catch (Exception e) {}
//  }
}







