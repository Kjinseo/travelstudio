package travelstudio.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import travelstudio.domain.Cowork;

public interface CoworkDao {
int invite(Cowork cowork);
int delete(Cowork cowork);
ArrayList<Cowork> coworkCheck(int mno);
void acceptCowork(HashMap<String, Integer> Map);
void refuseCowork(HashMap<String, Integer> Map);
List<Cowork> searchcoworker(int no);
}
