package cn.edu.cqu.bysj.controller;


import javax.servlet.http.HttpSession;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cn.edu.cqu.bysj.model.RestResponse;
import cn.edu.cqu.bysj.model.User;

@RestController
public class UserController extends BaseController{

	@RequestMapping(value="/login")
	public RestResponse login(String userId,String password,HttpSession session)
	{
		RestResponse response=new RestResponse();
		String role=jt.queryForObject("select role from user where id=? and password=?",String.class,userId,password);
		if(role!=null)
		{
			User user=new User();
			user.setId(userId);
			user.setRole(role);
			switch(role)
			{
			case "c":
				//如果是教学秘书
				//查找对应的学院
				//user.setCollegeId(collegeId);
				break;
			case "s":
				//如果是学生，查找对应的学院（可能有多个）
				break;
			case "t":
				//如果是教师，查找对应的学院（可能有多个）
				break;
			case "m":
				//如果是督导
				break;
			case "u":
				//如果是学校管理员
				break;
			}
			response.put("msg","success" );
			response.put("user", user);
			session.setAttribute("user", user);
		}
		else{
			response.put("msg","fail" );
		}
		return response;
	}
	
	@RequestMapping(value="/user/checkForAdd")
	public boolean checkForAdd(String column,String value)
	{
		int n=jt.queryForObject("select count(*) from user where "+column+"=?",Integer.class, value);
		if(n>0)
			return false;
		else
			return true;
	}
	//以下方法不需要
	/*@RequestMapping(value="/user/updateUser")
	@Transactional
	public int updateUser(String id,String name,String sex,String password,String rol,String tel,String email,String oldId)
	{
		return jt.update("update user set id=?,name=?,sex=?password=?,rol=?,tel=?,email=? where id=?",id,name,sex,password,rol,tel,email,oldId);
	}
	@RequestMapping(value="/user/updateUserPassword")
	@Transactional
	public int updateUserPassword(String id,String password)
	{
		return jt.update("update user set password=? where id=?",password,id);
	}
	@RequestMapping(value="/user/addUser")
	@Transactional
	public int adduser(String id,String name,String sex,String password,String role, String tel,String email)
	{
		return jt.update("insert into user values(?,?,?,?,?,?,?)",id,name,sex,password,role,tel,email);
	}*/
}
