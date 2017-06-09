package dao;

import convenience.util.BaseException;
import model.BeanUser;

public interface UserDaoI {
	/** 添加用户 */
	 public void addUser();
	 /** 删除用户 */
	 public void delUser();
	 /** 更新用户 */
	 public void updateUser();
	 public BeanUser searchUser(int rank) throws BaseException;
	 public void addgrade(BeanUser user) throws BaseException;
}
