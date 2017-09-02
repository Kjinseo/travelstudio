package travelstudio.dao;

import java.util.List;

import travelstudio.domain.Follow;

public interface FollowDao {
int insert(Follow follow);
Follow searchBymnomno(Follow follow);
int delete(Follow follow);
List<Follow> listByloginMember(int mno);
}
