package service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import convenience.util.BaseException;
import dao.UserDaoI;
import model.BeanUser;

@Service
public class UserService implements UserServiceI{
	@Resource
	private UserDaoI userDaoI;
	public UserService(){
	      System.out.println("UserService Constructor...\n\n\n\n\n\n");
	}
	 
	@Override
	public void updategrade(BeanUser user)throws BaseException{
		// TODO 自动生成的方法存根
		
		userDaoI.addgrade(user);
	}

	@Override
	public BeanUser searchgrade(int rank) throws BaseException {
		// TODO Auto-generated method stub
		BeanUser user=userDaoI.searchUser(rank);
		return user;
	}
}
