Ext.define("data.collegesecretary.DeleteCollegeSecretaryForm", {
	extend : "Ext.window.Window",
	title : "删除秘书",
	layout :　"form",
	width : 350,
	heigth : 150,
	labelAlign : "right",
	lableWidth : 50,
	frame : true,
	modal : true,
	buttonAlign : "center",
	initComponent : function() {
		var me = this;
		var user_id = Ext.create("Ext.form.field.Text",{
			fieldLabel : "登录名",
			value : me.oldUserId,
			readOnly : true
		});
		var college_name = Ext.create("Ext.form.field.Text",{
			fieldLabel : "学校名称",
			value : me.oldCollegeName,
			readOnly : true
		});
		var del = Ext.create("Ext.Button",{
			text : "确认删除",
			handler : function(){
				Ext.MessageBox.confirm("提示","确认删除？",function(choose){
					if(choose == "yes"){
							Ext.Ajax.request({
								url : "collegesecretary/deleteCollegeSecretary.do",
								params :{
									user_id : me.oldUserId
								},
								success : function(response) {									
										Ext.MessageBox.alert("提示", "删除成功！");
										me.close();
								},
								failure : function(response) {							
										Ext.MessageBox.alert("提示", "服务器异常，请检查网络连接，或者联系管理员！");
								}	
							});
						}
						
					});
				}
			})
			this.items = [user_id,college_name];
			this.buttons =  [del];
			this.callParent(arguments);
	}
});