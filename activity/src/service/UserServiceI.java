package service;

import org.springframework.stereotype.Component;

import convenience.util.BaseException;
import model.BeanUser;

@Component
public interface UserServiceI {
	public void updategrade(BeanUser user)throws BaseException;
	public BeanUser searchgrade(int rank)throws BaseException;
}
