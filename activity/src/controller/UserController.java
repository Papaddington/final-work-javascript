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
import dao.UserDao;
import model.BeanUser;
import service.UserService;
import service.UserServiceI;

@Controller  
public class UserController {
	@Autowired
	private UserServiceI userService;
	
	@RequestMapping(value = "/update.do") 
	@ResponseBody
	public String update(@RequestBody String params) throws JSONException, BaseException{  
	

    	JSONObject json = new JSONObject(params);
    	int rank =(int)json.get("rank");
    	String name = (String) json.get("name");
    	int grade=(int)json.get("grade");
    	
    	System.out.println("rank:"+rank);
    	System.out.println("name:"+name);
    	System.out.println("grade:"+grade);
    	BeanUser user = new BeanUser();
    	user.setGrade(grade);
    	user.setName(name);
    	user.setRank(rank);
    	
    	JSONObject jo = new JSONObject();
    	if(user != null){
        	System.out.println("update success");
        	userService.updategrade(user);
        	jo.put("msg", "update succ");
    	}
    	else{
    		jo.put("msg", "error");
    	}
		return jo.toString(); 
    }    
	
	@RequestMapping(value = "/search.do") 
	@ResponseBody
	public String search(@RequestBody String params) throws JSONException, BaseException{  
	

    	
    	BeanUser user = userService.searchgrade(1);
    	
    	JSONObject jo = new JSONObject();
    	if(user.getGrade() != 0){
        	System.out.println("get rank1");
        	jo.put("rank1name", user.getName());
        	jo.put("rank1grade", user.getGrade());
    		jo.put("msg1", "succ");
    	}
    	else{
    		jo.put("msg1", "rank1 null");
    	}
    	user = userService.searchgrade(2);
    	if(user.getGrade() != 0){
        	System.out.println("get rank2");
        	jo.put("rank2name", user.getName());
        	jo.put("rank2grade", user.getGrade());
    		jo.put("msg2", "succ");
    	}
    	else{
    		jo.put("msg2", "rank2 null");
    	}
    	user = userService.searchgrade(3);
    	if(user.getGrade() != 0){
        	System.out.println("get rank3");
        	jo.put("rank3name", user.getName());
        	jo.put("rank3grade", user.getGrade());
        	jo.put("msg3", "succ");
    	}
    	else{
    		jo.put("msg3", "rank3 null");
    	}
    	
    	
		return jo.toString(); 
    }    
}
