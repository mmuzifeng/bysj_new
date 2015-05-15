Ext.define("data.college.UpdateCollegeForm", {
	extend : "Ext.window.Window",
	title : "添加学院",
	layout : "form",
	width : 350,
	height : 150,
	labelAlign : 'right',
	lableWidth : 50,
	frame : true,
	modal : true,
	buttonAlign : "center",
	initComponent : function() {
		var me = this;
		var id = Ext.create("Ext.form.field.Text", {
			fieldLabel : "学院编号",
			value : me.oldId,
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
						url : "college/checkForUpdate.do",
						params : {
							column : "id",
							value : textfield.getValue(),
							oldId : me.oldId
						},
						success : function(response, options) {
							if (response.responseText == 'false') {
								textfield.markInvalid("学院编号已存在!");
								textfield.textValid = "学院编号已存在!";
							} else {
								textfield.clearInvalid();
								textfield.textValid = true;
							}
						}
					});
				}
			}
		});
		var name = Ext.create("Ext.form.field.Text", {
			fieldLabel : "学院名称：",
			value : me.oldName,
			allowBlank : false,
			blankText : "不能为空",
			maxLength : 25,
			maxLengthText : "长度不能超过25",
			textValid : true,
			validator : function(val) {
				return this.textValid;
			},
			listeners : {
				change : function(textfield, newValue, oldValue) {
					Ext.Ajax.request({
						url : "college/checkForUpdate.do",
						params : {
							column : "name",
							value : textfield.getValue(),
							oldId : me.oldId
						},
						success : function(response, options) {
							if (response.responseText == 'false') {
								textfield.markInvalid("学院名称已存在!");
								textfield.textValid = "学院名称已存在!";
							} else {
								textfield.clearInvalid();
								textfield.textValid = true;
							}
						}
					});
				}
			}
		});
		var save = Ext.create("Ext.Button", {
			text : "更新",
			handler : function() {
				if (name.isValid()&&id.isValid()) {
					Ext.MessageBox.confirm("提示", "确定更新吗？", function(choose) {
						if (choose == "yes") {
							Ext.Ajax.request({
								url : "college/updateCollege.do",
								params : {
									oldId : me.oldId,
									id : id.getValue(),
									name : name.getValue()
								},
								success : function(response) {
									if (response.responseText == "1") {
										Ext.MessageBox.alert("提示", "更新成功！");
										me.close();
									} else {
										Ext.MessageBox.alert("提示", "更新失败，请检查数据！");
									}
								},
								failure : function(response) {
									if (response.status == 500) {
										Ext.MessageBox.alert("提示", "更新失败，请检查数据！");
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
		this.items = [ id, name ];
		this.buttons=[save];
		this.callParent(arguments);
	}
});