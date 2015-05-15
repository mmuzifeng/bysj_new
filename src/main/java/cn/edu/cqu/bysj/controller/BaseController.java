package cn.edu.cqu.bysj.controller;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

public class BaseController {
	protected JdbcTemplate jt;
	@Autowired
	public void setDataSource(DataSource dataSource) {
		jt = new JdbcTemplate(dataSource);
	}
}
