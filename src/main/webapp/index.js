//全局变量用于记录当前登录的用户
var user;
Ext.require("LoginForm");
Ext.onReady(function(){
	Ext.tip.QuickTipManager.init();
	Ext.form.Field.prototype.msgTarget='side'; 
	var form = Ext.create('LoginForm');
	form.show();
});
