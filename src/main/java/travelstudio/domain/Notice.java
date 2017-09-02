package travelstudio.domain;


/* 역할: memb 테이블의 값을 보관할 때 사용할 클래스
 * => 복합 데이터를 다룰 때, 이렇게 클래스를 정의하여 사용한다.
 * => 이런 복합 데이터를 보관하는 용도로 사용하는 클래스를
 *    "도메인(domain)" 클래스 또는 "DTO(Data Transfer Object)"라 부른다.
 */


public class Notice {
  String nono;
  String title;
  String cont;
  String pdate;
  
  
  
  
  public String getNono() {
    return nono;
  }
  public void setNono(String nono) {
    this.nono = nono;
  }
  public String getTitle() {
    return title;
  }
  public void setTitle(String title) {
    this.title = title;
  }
  public String getCont() {
    return cont;
  }
  public void setCont(String cont) {
    this.cont = cont;
  }
  public String getPdate() {
    return pdate;
  }
  public void setPdate(String pdate) {
    this.pdate = pdate;
  }
  
  
  @Override
  public String toString() {
    return "notice [nono=" + nono + ", title=" + title + ", cont=" + cont + ", pdate=" + pdate + "]";
  }
  
  
  
  
  
}
