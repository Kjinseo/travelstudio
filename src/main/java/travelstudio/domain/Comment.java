package travelstudio.domain;


/* 역할: memb 테이블의 값을 보관할 때 사용할 클래스
 * => 복합 데이터를 다룰 때, 이렇게 클래스를 정의하여 사용한다.
 * => 이런 복합 데이터를 보관하는 용도로 사용하는 클래스를
 *    "도메인(domain)" 클래스 또는 "DTO(Data Transfer Object)"라 부른다.
 */


public class Comment extends Member{
 int reno;
 int postno;
 
 String cont;
 String date;
 boolean isGood;
 
 

@Override
public String toString() {
  return "Comment [reno=" + reno + ", postno=" + postno + ", mno=" + mno + ", cont=" + cont + ", date=" + date
      + ", isGood=" + isGood + "]";
}
/*public int getMemberno() {
  return memberno;
}
public void setMemberno(int memberno) {
  this.memberno = memberno;
}*/
public int getReno() {
  return reno;
}
public void setReno(int reno) {
  this.reno = reno;
}
public int getPostno() {
  return postno;
}
public void setPostno(int postno) {
  this.postno = postno;
}
/*public int getMno() {
  return mno;
}
public void setMno(int mno) {
  this.mno = mno;
}*/
public String getCont() {
  return cont;
}
public void setCont(String cont) {
  this.cont = cont;
}
public String getDate() {
  return date;
}
public void setDate(String date) {
  this.date = date;
}
public boolean isGood() {
  return isGood;
}
public void setGood(boolean isGood) {
  this.isGood = isGood;
}
 
 


 
 
  
}
