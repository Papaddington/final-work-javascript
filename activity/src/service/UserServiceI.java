package service;

import org.springframework.stereotype.Component;

import convenience.util.BaseException;
import model.BeanUser;

@Component
public interface UserServiceI {
	public BeanUser checkLogin(String userId, String password)throws BaseException;
}
