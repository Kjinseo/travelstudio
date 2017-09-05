package travelstudio.service;

import java.util.ArrayList;
import java.util.List;

import travelstudio.domain.Cowork;

public interface CoworkService {
  void invite(Cowork cowork) throws Exception;
  void delete(Cowork cowork) throws Exception;
  ArrayList<Cowork> coworkCheck(int mno) throws Exception;
  void acceptCowork(int memberNo, int postNo);
  void refuseCowork(int memberNo, int postNo);
  List<Cowork> searchcoworker(int no) throws Exception;
//  int getSize() throws Exception;
}








