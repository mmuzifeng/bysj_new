Ext.define("data.collegesecretary.ManageCollegeSecretary", {
	extend : "Ext.grid.Panel",
	title : "教学秘书管理",
	autoScroll : true,
	viewConfig : {
		enableTextSelection : true
	},
	store : {
		fields : [ "user_id", "user_name","college_name","college_id","password","tel","email","sex" ],
		proxy : {
			type : "ajax",
			url : "collegeSecretary/listAllCollegeSecretary.do"
		},
		autoLoad : true
	},
	columns : [  {
		header : "学院名称",
		width : 200,
		dataIndex : "college_name"
	},
	{
		header : "姓名",
		width : 100,
		dataIndex : "user_name"
	},
	{
		header : "登录名",
		width : 100,
		dataIndex : "user_id"
	},{
		header :"电话",
		width : 100,
		dataIndex : "tel"
	},{
		header : "邮箱",
		width : 100,
		dataIndex : "email"
	}],
	initComponent : function() {
		Ext.syncRequire("data.collegesecretary.AddCollegeSecretaryForm");
		Ext.syncRequire("data.collegesecretary.UpdateCollegeSecretaryForm");
		Ext.syncRequire("data.collegesecretary.ShowCollegeSecretaryForm");
		var me = this;
		var toolbar = Ext.create('Ext.toolbar.Toolbar', {
			items : [ {
				text : "添加新秘书",
				handler : function() {
					var win=Ext.create("data.collegesecretary.AddCollegeSecretaryForm",{
						listeners:{
							close:function( panel, eOpts )
							{
								me.getStore().load();
							}
						}
					});
					win.show();	
				}
			},{
				text : "秘书信息修改",
				handler : function() {
					var m = me.getSelection();
					if (m.length == 0) {
						Ext.MessageBox.alert("提示", "未选中任何数据！");
					} else {
						var win=Ext.create("data.collegesecretary.UpdateCollegeSecretaryForm",{
							oldUserId:m[0].get("user_id"),
							oldCollegeName:m[0].get("college_name"),
							oldCollegeId:m[0].get("college_id"),
							oldUserName:m[0].get("user_name"),
							oldUserPassword:m[0].get("password"),
							oldUserTel:m[0].get("tel"),
							oldUserEmail:m[0].get("email"),
							oldUserSex:m[0].get("sex"),
							listeners:{
								close:function( panel, eOpts )
								{
									me.getStore().load();
								}
							}
						});
						win.show();	
					}
				}
			},{
				text : "查看秘书信息",
				handler : function() {
					var m = me.getSelection();
					if(m.length == 0){
					Ext.MessageBox.alert("提示","未选中任何数据！");	
					}else {
						var win = Ext.create("data.collegesecretary.ShowCollegeSecretaryForm",{
							oldUserId:m[0].get("user_id"),
							oldCollegeName:m[0].get("college_name"),
							oldUserName:m[0].get("user_name"),
							oldUserPassword:m[0].get("password"),
							oldUserTel:m[0].get("tel"),
							oldUserEmail:m[0].get("email"),
							oldUserSex:m[0].get("sex"),
							listeners:{
								close:function( panel, eOpts )
								{
									me.getStore().load();
								}
							}
						});
						win.show();	
					}
				} 
			},{
				text : "删除秘书",
				handler : function() {
					var m = me.getSelection();
					if(m.length == 0){
						Ext.MessageBox.alert("提示","未选中任何数据！");	
					}else {
						Ext.MessageBox.confirm("提示","确认删除？",function(choose){
							if(choose == "yes"){
									Ext.Ajax.request({
										url : "collegesecretary/deleteCollegeSecretary.do",
										params :{
											user_id : m[0].get("user_id")
										},
										success : function(response) {	
											if (response.responseText == "1") {
												Ext.MessageBox.alert("提示", "删除成功！");
												me.getStore().load();
											}else{
												Ext.MessageBox.alert("提示", "删除失败！");
											}
												
										},
										failure : function(response) {							
												Ext.MessageBox.alert("提示", "服务器异常，请检查网络连接，或者联系管理员！");
										}	
									});
								}
								
							});
						}
					}
			},{
				text : "重置密码",
				handler : function() {
					var m = me.getSelection();
					if(m.length == 0){
						Ext.MessageBox.alert("提示","未选中任何数据！");	
					}else {
						Ext.MessageBox.confirm("提示","重置密码？",function(choose){
							if(choose == "yes"){
									Ext.Ajax.request({
										url : "collegesecretary/resetPassword.do",
										params :{
											user_id : m[0].get("user_id")
										},
										success : function(response) {		
											if (response.responseText == "1") {
												Ext.MessageBox.alert("提示", "重置密码成功！");
												me.getStore().load();
											}else{
												Ext.MessageBox.alert("提示", "重置密码失败！");
											}
												
										},
										failure : function(response) {							
												Ext.MessageBox.alert("提示", "服务器异常，请检查网络连接，或者联系管理员！");
										}	
									});
								}
								
							});
					}
				} 
			}
			]
		});
		this.tbar = toolbar;
		this.callParent(arguments);
	}

})