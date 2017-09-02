package travelstudio.domain;


/* 역할: memb 테이블의 값을 보관할 때 사용할 클래스
 * => 복합 데이터를 다룰 때, 이렇게 클래스를 정의하여 사용한다.
 * => 이런 복합 데이터를 보관하는 용도로 사용하는 클래스를
 *    "도메인(domain)" 클래스 또는 "DTO(Data Transfer Object)"라 부른다.
 */


public class Member {
  int mno;
  String email;
  String password;
  String alias;
  String intro;
  String pwd;
  String path;
  
  
public String getPath() {
    return path;
  }
  public void setPath(String path) {
    this.path = path;
  }
 
public String getPwd() {
    return pwd;
  }


  public void setPwd(String pwd) {
    this.pwd = pwd;
  }

  public int getMno() {
    return mno;
  }
  
  public void setMno(int mno) {
    this.mno = mno;
  }
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public String getPassword() { 
    return password;
  }
  public void setPassword(String password) {
    this.password = password;
  }
  public String getAlias() {
    return alias;
  }
  public void setAlias(String alias) {
    this.alias = alias;
  }
  public String getIntro() {
    return intro;
  }
  public void setIntro(String intro) {
    this.intro = intro;
  }
  
  @Override
  public String toString() {
    return "Member [mno=" + mno + ", email=" + email + ", password=" + password + ", alias=" + alias + ", intro="
        + intro + "]";
  }
  
  
  
  
  
}
