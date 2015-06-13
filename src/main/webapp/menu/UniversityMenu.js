Ext.define("menu.UniversityMenu", {
	extend : "menu.Menu",
	requires:["data.college.ManageCollege"],
	requires:["data.collegesecretary.ManageCollegeSecretary"],
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
						text:"教学秘书管理",
						cmpName:"data.collegesecretary.ManageCollegeSecretary",
						leaf:true
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