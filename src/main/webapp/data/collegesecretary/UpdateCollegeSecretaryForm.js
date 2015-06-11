Ext.define("data.collegesecretary.UpdateCollegeSecretaryForm",{
	extend : "Ext.window.Window",
	title : "秘书信息修改",
	layout : "form",
	width : 350,
	height : 350,
	labelAlign : 'right',
	lableWidth : 50,
	buttonAlign : "center",
	frame : true,
	modal : true,
	initComponent : function() {
		var me = this;
		var college_name = Ext.create("Ext.form.field.ComboBox",{
			width : 300,
			fieldLabel : "学院名称",
			maxLength : 10,
			store : {
					fields : [ "name","id" ],
					proxy : {
						type : "ajax",
						url : "college/listAllCollege.do"
					},
					autoLoad : true
				},
			 display : me.oldCollegeName,
			 value : me.oldCollegeId,
			 valueField : "id",
			 displayField : "name",
			 editable : false,
			 allowBlank : false,
			 triggerAction :  "all",
			 queryMode: 'local'
		});
		var id = Ext.create("Ext.form.field.Text",{
			fieldLabel : "登录名",
			allowBlank : false,
			blankText : "不能为空",
			value : me.oldUserId,
			maxLength : 10,
			maxLengthText : "长度不能超过10",
			textValid : true,
			validator : function(val) {
				return this.textValid;
			},
			listeners : {
				change : function(textfield, newValue, oldValue) {
					Ext.Ajax.request({
						url : "user/checkForAdd.do",
						params : {
							column : "id",
							value : textfield.getValue()
						},
						success : function(response, options) {
							if (response.responseText == 'false') {
								textfield.markInvalid("用户已存在!");
								textfield.textValid = "用户已存在!";
							} else {
								textfield.clearInvalid();
								textfield.textValid = true;
							}
						}
					});
				}
			}
		});
		var name = Ext.create("Ext.form.field.Text",{
			fieldLabel : "教学秘书",
			value : me.oldUserName,
			allowBlank : false,
			blankText : "不能为空",
			maxLength : 10,
			maxLengthText : "长度不能超过10",
		});
		var password = Ext.create("Ext.form.field.Text",{
			fieldLabel : "密码",
			value : me.oldUserPassword,
			allowBlank : false,
			blankText : "不能为空",
			maxLength : 10,
			maxLengthText : "长度不能超过10",
		});
		var email = Ext.create("Ext.form.field.Text",{
			fieldLabel : "邮箱",
			value : me.oldUserEmail,
			allowBlank : false,
			blankText : "不能为空",
			maxLength : 10,
			maxLengthText : "长度不能超过10",
		});
		var tel = Ext.create("Ext.form.field.Text",{
			fieldLabel : "电话",
			value : me.oldUserTel,
			allowBlank : false,
			blankText : "不能为空",
			maxLength : 10,
			maxLengthText : "长度不能超过10",
		});
		var sex = Ext.create("Ext.form.field.Text",{
			fieldLabel : "性别",
			value : me.oldUserSex,
			allowBlank : false,
			blankText : "不能为空",
			maxLength : 10,
			maxLengthText : "长度不能超过10",
		});
		var updat = Ext.create("Ext.Button", {
			text : "确认修改",
			handler : function() {
				if (college_name.isValid()&&id.isValid()&&name.isValid()&&password.isValid()&&email.isValid()&&tel.isValid()&&sex.isValid()) {
					Ext.MessageBox.confirm("提示", "确定修改吗？", function(choose) {
						if (choose == "yes") {
							Ext.Ajax.request({
								url : "collegeSecretary/updateCollegeSecretary.do",
								params : {
									oldUser_id : me.oldUserId,
									college_id : college_name.getValue(),
									user_id : id.getValue(),
									name : name.getValue(),
									sex : sex.getValue(),
									password : password.getValue(),
									tel : tel.getValue(),
									email : email.getValue(),
									role : "c"
								},
								success : function(response) {
									if (response.responseText == "1") {
										Ext.MessageBox.alert("提示", "修改成功！");
										me.close();
									} else {
										Ext.MessageBox.alert("提示", "修改失败，请检查数据！");
									}
								},
								failure : function(response) {
									if (response.status == 500) {
										Ext.MessageBox.alert("提示", "修改失败，请检查数据！");
									} else {
										Ext.MessageBox.alert("提示", "服务器异常，请检查网络连接，或者联系管理员！");
									}
								}
							});
						}
					});
				}
			}
		})
		this.items = [college_name,id,name,password,email,tel,sex];
		this.buttons = [updat];
		this.callParent(arguments);
	}

});