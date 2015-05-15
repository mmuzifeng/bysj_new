Ext.define("menu.UniversityMenu", {
	extend : "menu.Menu",
	requires:["data.college.ManageCollege"],
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
						text:"基础数据管理",
						children:[
							{
								text:"学院信息管理",
								cmpName:"data.college.ManageCollege",
								leaf:true
							}
						]
					}
				]
		}
	}
});