package cn.edu.cqu.bysj.model;
/**
 * 用于保存登录用户的信息
 * @author liuji
 *
 */
public class User {
	/**
	 * 用户编号
	 */
	private String id;
	/**
	 * 角色
	 */
	private String role;
	/**
	 * 进入的学院
	 */
	private String collegeId;
	/**
	 * 是否系主任
	 */
	private boolean  dhead;
	/**
	 * 是否教学负责人
	 */
	private boolean  chead;
	
	public boolean isDhead() {
		return dhead;
	}
	public void setDhead(boolean dhead) {
		this.dhead = dhead;
	}
	public boolean isChead() {
		return chead;
	}
	public void setChead(boolean chead) {
		this.chead = chead;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getCollegeId() {
		return collegeId;
	}
	public void setCollegeId(String collegeId) {
		this.collegeId = collegeId;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
}
