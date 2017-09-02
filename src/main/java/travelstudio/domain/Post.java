package travelstudio.domain;

import java.util.Arrays;

/* 역할: memb 테이블의 값을 보관할 때 사용할 클래스
 * => 복합 데이터를 다룰 때, 이렇게 클래스를 정의하여 사용한다.
 * => 이런 복합 데이터를 보관하는 용도로 사용하는 클래스를
 *    "도메인(domain)" 클래스 또는 "DTO(Data Transfer Object)"라 부른다.
 */


public class Post extends Member{
  int postno;
  String title;
  String badge;
  String tag;
  String sdt;
  String edt;
  String pdt;
  String cont;
  String capt;
  String detail;
  String ispublic;
  int good;
  
  public int getGood() {
    return good;
  }
  public void setGood(int good) {
    this.good = good;
  }
  /*int mno;*/
  public int getPostno() {
    return postno;
  }
  public void setPostno(int postno) {
    this.postno = postno;
  }
  public String getTitle() {
    return title;
  }
  public void setTitle(String title) {
    this.title = title;
  }
  public String getBadge() {
    return badge;
  }
  public void setBadge(String badge) {
    this.badge = badge;
  }
  public String getTag() {
    return tag;
  }
  public void setTag(String tag) {
    this.tag = tag;
  }
  public String getSdt() {
    return sdt;
  }
  public void setSdt(String sdt) {
    this.sdt = sdt;
  }
  public String getEdt() {
    return edt;
  }
  public void setEdt(String edt) {
    this.edt = edt;
  }
  public String getPdt() {
    return pdt;
  }
  public void setPdt(String pdt) {
    this.pdt = pdt;
  }

  public String getCont() {
    return cont;
  }
  public void setCont(String cont) {
    this.cont = cont;
  }
  public String getCapt() {
    return capt;
  }
  public void setCapt(String capt) {
    this.capt = capt;
  }
  public String getDetail() {
    return detail;
  }
  public void setDetail(String detail) {
    this.detail = detail;
  }
  public String getIspublic() {
    return ispublic;
  }
  public void setIspublic(String ispublic) {
    this.ispublic = ispublic;
  }
@Override
public String toString() {
  return "Post [postno=" + postno + ", title=" + title + ", badge=" + badge + ", tag=" + tag + ", sdt=" + sdt + ", edt="
      + edt + ", pdt=" + pdt + ", cont=" + cont + ", capt=" + capt + ", detail=" + detail + ", ispublic=" + ispublic
      + ", good=" + good + "]";
}
  
 
  
  
}
