package travelstudio.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import travelstudio.dao.CommentDao;
import travelstudio.dao.MemberDao;
import travelstudio.domain.Comment;
import travelstudio.service.CommentService;

@Service
public class CommentServiceImpl implements CommentService {
  
  @Autowired
  MemberDao memberDao;
  
  @Autowired 
  CommentDao commentDao;
  
  public List<Comment> list(String no) throws Exception {
    
    return commentDao.selectList(no);
  }
  
  public void add(Comment comment) throws Exception {
    
    commentDao.insert(comment);
  }
  
  public void remove(int no) throws Exception {
    
    int count = commentDao.delete(no);
    if (count < 1) {
      throw new Exception(no + "댓글을 삭제하지 못했습니다.");
    }
    
    try {
      count = commentDao.delete(no);
    } catch (Exception e) {}
  }
  
 /* public void update(Comment comment) throws Exception {
    int count = memberDao.update(comment);
    if (count < 1) {
      throw new Exception(comment.getMemberno() + "댓글을 찾을 수 없습니다.");
    }
    
    count = commentDao.update(comment);
    if (count < 1) {
      throw new Exception(comment.getMemberno() + "댓글을 찾을 수 없습니다.");
    }
  }*/
}

 
// public void add(Comment comment) throws Exception {
//   commentDao.insert(comment);
//   
// }
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
  //XML 태그로 트랜잭션을 설정하게 되면 @Transactional 애노테이션은 필요없다.
  //@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)







