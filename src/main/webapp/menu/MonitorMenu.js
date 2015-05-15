Ext.define("menu.MonitorMenu", {
	extend : "menu.Menu",
	requires:[],
	rootVisible : false,
	store:{
		root : {
				id : "ROOT",
				expanded : true,
				children : [
					{
						text : "首页",
						leaf : true
					},
					{
						text:"个人信息管理",
						children:[
							{
								text:"联系信息",
								cmpName:"",
								leaf:true
							}
						]
					}
				]
		}
	}
});