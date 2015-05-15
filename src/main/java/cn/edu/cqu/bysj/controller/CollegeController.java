package cn.edu.cqu.bysj.controller;

import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CollegeController extends BaseController {
	
	@RequestMapping(value="/college/listAllCollege")
	public List<Map<String,Object>> listAllCollege()
	{
		return jt.queryForList("select * from college order by id");
	}
	@RequestMapping(value="/college/deleteCollege")
	@Transactional
	public int deleteCollege(String id)
	{
		return jt.update("delete from college where id=?",id);
	}
	@RequestMapping(value="/college/addCollege")
	@Transactional
	public int addCollege(String id,String name)
	{
		return jt.update("insert into college values(?,?)",id,name);
	}
	@RequestMapping(value="/college/updateCollege")
	@Transactional
	public int updateCollege(String oldId,String id,String name)
	{
		return jt.update("update College set id=?,name=? where id=?",id,name,oldId);
	}
	@RequestMapping(value="/college/checkForAdd")
	public boolean checkForAdd(String column,String value)
	{
		int n=jt.queryForObject("select count(*) from college where "+column+"=?",Integer.class, value);
		if(n>0)
			return false;
		else
			return true;
	}
	@RequestMapping(value="/college/checkForUpdate")
	public boolean checkForUpdate(String column,String value,String oldId)
	{
		int n=jt.queryForObject("select count(*) from college where "+column+"=? and id<>?",Integer.class, value,oldId);
		if(n>0)
			return false;
		else
			return true;
	}

}
