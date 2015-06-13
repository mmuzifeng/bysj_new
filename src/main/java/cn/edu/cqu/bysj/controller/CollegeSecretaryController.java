package cn.edu.cqu.bysj.controller;

import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CollegeSecretaryController  extends BaseController  {

	@RequestMapping(value="/collegeSecretary/listAllCollegeSecretary")
	public List<Map<String,Object>> listAllCollegeSecretary()
	{
		return jt.queryForList("select *,user.id as user_id,user.name as user_name,college.id as college_id,college.name as college_name from college_secretary inner join user on user.id=college_secretary.user_id inner join college on college.id=college_secretary.college_id");
	}
	@RequestMapping(value="/collegeSecretary/addCollegeSecretary")
	@Transactional
	public int addCollegeSecretary(String id,String name,String sex,String password,String role, String tel,String email,String user_id,String college_id)
	{
		 int return_u = jt.update("insert into user values(?,?,?,?,?,?,?)",id,name,sex,password,role,tel,email);
		 int return_c =	jt.update("insert into college_secretary (user_id,college_id) values(?,?)",user_id,college_id);
		 if(return_c !=0 && return_u !=0)
			 return 1;
		 else
			 return 0;
	}
	@RequestMapping(value="/collegeSecretary/updateCollegeSecretary")
	@Transactional
	public int updateCollegeSecretary(String name,String sex,String password,String role, String tel,String email,String user_id,String college_id,String oldUser_id)
	{
		 
		 int return_d = jt.update("delete from college_secretary where user_id=?",oldUser_id);
		 int return_u = jt.update("update user set id=?,name=?,sex=?,password=?,role=?,tel=?,email=? where id=?",user_id,name,sex,password,role,tel,email,oldUser_id);;
		 int return_c =	jt.update("insert into college_secretary (user_id,college_id) values(?,?)",user_id,college_id);
		 if(return_c !=0 && return_u !=0 && return_d!=0)
			 return 1;
		 else
			 return 0;
	}
	@RequestMapping(value="/collegesecretary/deleteCollegeSecretary")
	@Transactional
	public int deleteCollegeSecretary(String user_id) {
		int return_u = jt.update("delete from college_secretary where user_id=?",user_id);
		int return_c = jt.update("delete from user  where id=?",user_id);
		if(return_u!=0 && return_c!=0) 
			return 1;
		else
				return 0;	
	}
	@RequestMapping(value="/collegeSecretary/checkForAdd")
	public boolean checkForAdd(String column,String value)
	{
		int n=jt.queryForObject("select count(*) from college_secretary  where "+column+"=?",Integer.class, value);
		if(n>0)
			return false;
		else
			return true;
	}
}
