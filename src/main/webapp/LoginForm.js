//登录窗口
Ext.define("LoginForm", {
	extend : "Ext.window.Window",
	//requires : [ "MainFrame", "SelectCollege" ],
	id : 'loginForm',
	title : '重庆大学本科毕业设计系统',
	width : 300,
	height : 150,
	closable : false,
	resizable : false,
	draggable : false,
	layout : 'form',
	labelAlign : 'right',
	lableWidth : 50,
	frame : true,
	buttonAlign : "center",
	initComponent : function() {
		Ext.syncRequire("MainFrame");
		Ext.syncRequire("SelectCollege");
		var me = this;
		this.userId = Ext.create("Ext.form.field.Text", {
			fieldLabel : '用户名',
			id : 'userId',
			name : 'userId',
			anchor : '70%',
			listeners : {
				specialkey : function(field, e) {
					if (e.getKey() == e.ENTER) {
						me.doLogin();
					}
				}
			}
		});
		this.password = Ext.create("Ext.form.field.Text", {
			fieldLabel : '密码',
			id : 'password',
			name : 'password',
			anchor : '70%',
			inputType : 'password',
			listeners : {
				specialkey : function(field, e) {
					if (e.getKey() == e.ENTER) {
						me.doLogin();
					}
				}
			}
		});
		this.items = [ this.userId, this.password ];

		this.loginButton = Ext.create("Ext.Button", {
			text : '登录',
			handler : function() {
				me.doLogin();
			}
		})
		this.buttons = [ this.loginButton ];
		this.callParent(arguments);
	},
	doLogin : function() {
		var me = this;
		Ext.Ajax.request({
			url : 'login.do',
			params : {
				userId : me.userId.getValue(),
				password : me.password.getValue()
			},
			success : function(response) {
				response = Ext.decode(response.responseText);
				if (response.msg == 'success') {
					me.close();
					user = response.user;
					if (user.role == 's' || user.role == 't' || user.role == "m") {
						if (user.collegeId == null) {
							Ext.create("SelectCollege");
						}

					} else {
						Ext.create("MainFrame");
					}
				} else {
					Ext.MessageBox.alert('消息', '登录失败，请检查用户名和密码！');
				}
			},
			failure : function(response) {
				Ext.MessageBox.alert("提示", "服务器异常，请检查网络连接，或者联系管理员");
			}
		})
	}
});