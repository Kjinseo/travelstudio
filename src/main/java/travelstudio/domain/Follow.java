package travelstudio.domain;


/* 역할: memb 테이블의 값을 보관할 때 사용할 클래스
 * => 복합 데이터를 다룰 때, 이렇게 클래스를 정의하여 사용한다.
 * => 이런 복합 데이터를 보관하는 용도로 사용하는 클래스를
 *    "도메인(domain)" 클래스 또는 "DTO(Data Transfer Object)"라 부른다.
 */
public class Follow{
 int mno, mno2, postno;

public int getMno() {
  return mno;
}

public void setMno(int mno) {
  this.mno = mno;
}

public int getPostno() {
  return postno;
}

public void setPostno(int postno) {
  this.postno = postno;
}

public int getMno2() {
  return mno2;
}

public void setMno2(int mno2) {
  this.mno2 = mno2;
  
}

@Override
public String toString() {
  return "Follow [mno=" + mno + ", mno2=" + mno2 + ", postno=" + postno + "]";
}
 
}
