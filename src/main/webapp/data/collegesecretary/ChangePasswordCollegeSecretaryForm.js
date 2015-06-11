Ext.define("data.collegesecretary.ChangePasswordCollegeSecretaryForm", {
	extend : "Ext.window.Window",
	title : "密码修改",
	layout : "form",
	width : 350,
	height : 200,
	labelAlign : 'right',
	lableWidth : 50,
	buttonAlign : "center",
	frame : true,
	modal : true,
	initComponent: function(){
		var me = this;
		var id = Ext.create("Ext.form.field.Text",{
			fieldLabel : "登录名",
			value : me.oldUserId,
			//value : "1",
			readOnly : true
		});
		var password = Ext.create("Ext.form.field.Text",{
			fieldLabel : "输入新密码",
			allowBlank : false,
			blankText :　"不能为空",
			maxLength : 10,
			maxLengtgText : "长度不能超过10",
			textValid : true,
			validator : function(val) {
				return this.textValid;
			}
		});
		var password_2 = Ext.create("Ext.form.field.Text",{
			fieldLabel : "再次确认密码",
			allowBlank : false,
			blankText :　"不能为空",
			maxLength : 10,
			maxLengtgText : "长度不能超过10",
			textValid : true,
			validator : function(val) {
				return this.textValid;
			},
			listeners : {
				change : function (textfield){
					if (textfield.getValue() != password.getValue()) {
								textfield.markInvalid("两次输入的密码不一致");
								textfield.textValid = "两次输入的密码不一致";
								} else {
									textfield.clearInvalid();
									textfield.textValid = true;
								}
							}
						}
		});
		var save = Ext.create("Ext.Button",{
			text : "修改",
			handler : function() {
				if(id.isValid()&&password.isValid()) {
					Ext.MessageBox.confirm("提示", "确定保存吗？",function(choose){
						if(choose = "yes") {
							Ext.Ajax.request({
								url : "user/updateUserPassword.do",
								params : {
									id : id.getValue(),
									password : password.getValue(),
								},
							success : function(response) {
								if (response.responseText == "1") {
									Ext.MessageBox.alert("提示", "修改成功！");
									me.close();
								} else {
									Ext.MessageBox.alert("提示", "保存失败，请检查数据！");
								}
							},
							failure : function(response) {
								if (response.status == 500) {
									Ext.MessageBox.alert("提示", "保存失败，请检查数据！");
								} else {
									Ext.MessageBox.alert("提示", "服务器异常，请检查网络连接，或者联系管理员！");
								}
							},	
						})
						}
					})
				}
			}
		});
		this.items = [id,password,password_2];
		this.buttons = [save];
		this.callParent(arguments);
	}
	
});
