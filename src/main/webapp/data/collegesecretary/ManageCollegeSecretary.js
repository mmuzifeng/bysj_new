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
		header : "教学秘书",
		width : 100,
		dataIndex : "user_name"
	},
	{
		header : "登录名",
		width : 100,
		dataIndex : "user_id"
	}/*,{
		width : 0,
		dataIndex : "college_id"
	},{
		width : 0,
		dataIndex : "password"
	},{
		width : 0,
		dataIndex : "tel"
	},{
		width : 0,
		dataIndex : "email"
	},{
		width : 0,
		dataIndex : "sex"
	}*/],
	initComponent : function() {
		Ext.syncRequire("data.collegesecretary.AddCollegeSecretaryForm");
		Ext.syncRequire("data.collegesecretary.UpdateCollegeSecretaryForm");
		Ext.syncRequire("data.collegesecretary.ShowCollegeSecretaryForm");
		Ext.syncRequire("data.collegesecretary.DeleteCollegeSecretaryForm");
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
						var win = Ext.create("data.collegesecretary.DeleteCollegeSecretaryForm",{
							oldUserId:m[0].get("user_id"),
							oldCollegeName:m[0].get("college_name"),
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
			}
			]
		});
		this.tbar = toolbar;
		this.callParent(arguments);
	}

})