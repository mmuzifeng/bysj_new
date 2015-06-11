Ext.define("data.collegesecretary.ShowCollegeSecretaryForm",{
	extend : "Ext.window.Window",
	title : "秘书信息查看",
	layout : "form",
	width : 350,
	height : 350,
	labelAlign : 'right',
	lableWidth : 50,
	frame : true,
	modal : true,
	initComponent : function() {
		var me = this;
		var college_name = Ext.create("Ext.form.field.Text",{
			fieldLabel : "学院",
			value : me.oldCollegeName,
			readOnly : true
			
		});
		var id = Ext.create("Ext.form.field.Text",{
			fieldLabel : "登录名",
			value : me.oldUserId,
			readOnly : true
		});
		var name = Ext.create("Ext.form.field.Text",{
			fieldLabel : "教学秘书",
			value : me.oldUserName,
			readOnly : true
		});
		var password = Ext.create("Ext.form.field.Text",{
			fieldLabel : "密码",
			value : me.oldUserPassword,
			readOnly : true
		});
		var email = Ext.create("Ext.form.field.Text",{
			fieldLabel : "邮箱",
			value : me.oldUserEmail,
			readOnly : true
		});
		var tel = Ext.create("Ext.form.field.Text",{
			fieldLabel : "电话",
			value : me.oldUserTel,
			readOnly : true
		});
		var sex = Ext.create("Ext.form.field.Text",{
			fieldLabel : "性别",
			value : me.oldUserSex,
			readOnly : true
		});
		this.items = [college_name,id,name,password,email,tel,sex];
		this.callParent(arguments);
	}

});