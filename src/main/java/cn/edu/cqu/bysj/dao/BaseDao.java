package cn.edu.cqu.bysj.dao;

import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
@Component
public class BaseDao {
	protected JdbcTemplate jt;
	@Autowired
	public void setDataSource(DataSource dataSource) {
		jt = new JdbcTemplate(dataSource);
	}
	public List<Map<String,Object>> queryForList(String sql,Object ...args)
	{
		return jt.queryForList(sql, args);
	}
	public Long queryForLong(String sql,Object ...args)
	{
		return jt.queryForObject(sql, Long.class,args);
	}
}
