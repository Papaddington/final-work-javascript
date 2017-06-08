package controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import convenience.util.BaseException;
import model.BeanUser;
import service.UserService;
import service.UserServiceI;

@Controller  
public class UserController {
	@Autowired
	private UserServiceI userService;
	
	@RequestMapping(value = "/login.do") 
	@ResponseBody
	public String login(@RequestBody String params) throws JSONException{  
	


    	JSONObject json = new JSONObject(params);
    	String userId = (String) json.get("userId");
    	String password = (String) json.get("password");
    	
    	System.out.println("userId:"+userId);
    	System.out.println("password:"+password);
    	BeanUser user = null;
    	try {
    		user = userService.checkLogin(userId, password);
		} catch (BaseException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
    	JSONObject jo = new JSONObject();
    	if(user != null){
        	System.out.println("loginsuccess");
        	jo.put("userId", user.getUserId());
        	jo.put("userName", user.getUserName());
        	jo.put("msg", "succ");
    	}
    	else{
    		jo.put("msg", "error");
    	}
		return jo.toString(); 
    }    
}
