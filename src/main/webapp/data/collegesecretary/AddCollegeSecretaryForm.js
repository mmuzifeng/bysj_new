Ext.define("data.collegesecretary.AddCollegeSecretaryForm", {
	extend : "Ext.window.Window",
	title : "添加新秘书",
	layout : "form",
	width : 350,
	height : 350,
	labelAlign : "right",
	lableWidth : 50,
	frame : true,
	modal : true,
	buttonAlign : "center",
	initComponent : function() {
		var me = this; 
		var college_id = Ext.create("Ext.form.field.ComboBox",{
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
				 valueField : "id",
				 displayField : "name",
				 editable : false,
				 allowBlank : false,
				 emptyText : "请选择学院",
				 triggerAction :  "all",
				 queryMode: 'local'
		});
		var user_id = Ext.create("Ext.form.field.Text",{
			fieldLabel : "登录名",
			allowBlank : false,
			blankText : "不能为空",
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
			fieldLabel : "姓名",
			allowBlank : false,
			blankText : "不能为空",
			maxLength : 25,
			maxLengthText : "长度不能超过25",
			textValid : true,
			validator : function(val) {
				return this.textValid;
			},
		});
		var email = Ext.create("Ext.form.field.Text",{
			fieldLabel : "邮箱",
			allowBlank : false,
			blankText : "不能为空",
			maxLength : 25,
			maxLengthText : "长度不能超过25",
			textValid : true,
			validator : function(val) {
				return this.textValid;
			},
		});
		var tel = Ext.create("Ext.form.field.Text",{
			fieldLabel : "电话",
			allowBlank : false,
			blankText : "不能为空",
			maxLength : 25,
			maxLengthText : "长度不能超过25",
			textValid : true,
			validator : function(val) {
				return this.textValid;
			},
		});
		var sex = Ext.create("Ext.form.field.Text",{
			fieldLabel : "性别",
			allowBlank : false,
			blankText : "不能为空",
			maxLength : 25,
			maxLengthText : "长度不能超过25",
			textValid : true,
			validator : function(val) {
				return this.textValid;
			},
		});

		var save = Ext.create("Ext.Button", {
			text : "保存",
			handler : function() {
				if (name.isValid()&&user_id.isValid()&&college_id.isValid()&&email.isValid()&&tel.isValid()&&sex.isValid()) {
					Ext.MessageBox.confirm("提示", "确定保存吗？", function(choose) {
						if (choose == "yes") {
							Ext.Ajax.request({
								url : "collegeSecretary/addCollegeSecretary.do",
								params : {
									user_id : user_id.getValue(),
									college_id : college_id.getValue(),
									id : user_id.getValue(),
									name : name.getValue(),
									sex : sex.getValue(),
									password : "000000",
									role : "c",
									tel : tel.getValue(),
									email : email.getValue()
								},
								success : function(response) {
									if (response.responseText == "1") {
										Ext.MessageBox.alert("提示", "保存成功,默认密码为：000000");
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
								}	
							});
							
						}
					});
				}
			}
		});
		this.items = [college_id,user_id,name,email,tel,sex];
		this.buttons =  [save];
		this.callParent(arguments);
	}
});