Ext.define("data.college.ManageCollege", {
	extend : "Ext.grid.Panel",
	//requires:["data.college.AddCollegeForm","data.college.UpdateCollegeForm"],
	title : "学院信息管理",
	autoScroll : true,
	viewConfig : {
		enableTextSelection : true
	},
	store : {
		fields : [ "id", "name" ],
		proxy : {
			type : "ajax",
			url : "college/listAllCollege.do"
		},
		autoLoad : true
	},
	columns : [ {
		header : "学院编号",
		width : 100,
		dataIndex : "id"
	}, {
		header : "学院名称",
		width : 300,
		dataIndex : "name"
	} ],
	initComponent : function() {
		Ext.syncRequire("data.college.AddCollegeForm");
		Ext.syncRequire("data.college.UpdateCollegeForm");
		var me = this;
		var toolbar = Ext.create('Ext.toolbar.Toolbar', {
			items : [ {
				text : "添加",
				handler : function() {
					var win=Ext.create("data.college.AddCollegeForm",{
						listeners:{
							close:function( panel, eOpts )
							{
								me.getStore().load();
							}
						}
					});
					win.show();	
				}
			}, {
				text : "修改",
				handler : function() {
					var m = me.getSelection();
					if (m.length == 0) {
						Ext.MessageBox.alert("提示", "未选中任何数据！");
					} else {
						var win=Ext.create("data.college.UpdateCollegeForm",{
							oldId:m[0].get("id"),
							oldName:m[0].get("name"),
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
			}, {
				text : "删除",
				handler : function() {
					var m = me.getSelection();
					if (m.length == 0) {
						Ext.MessageBox.alert("提示", "未选中任何数据！");
					} else {
						Ext.MessageBox.confirm("提示", "确认删除选中的数据吗？", function(choose) {
							if (choose == "yes") {
								Ext.Ajax.request({
									url : "college/deleteCollege.do",
									params : {
										id : m[0].get("id")
									},
									success : function(response) {
										if (response.responseText == "1") {
											Ext.MessageBox.alert("提示", "删除成功！");
											me.getStore().load();
										} else {
											Ext.MessageBox.alert("提示", "删除失败！");
										}
									},
									failure : function(response) {
										Ext.MessageBox.alert("提示", "服务器异常，请检查网络连接，或者联系管理员");
									}
								});
							}
						});
					}

				}
			} ]
		});
		this.tbar = toolbar;
		this.callParent(arguments);
	}

})