Ext.define("MainFrame",{
	extend:"Ext.container.Viewport",
	//requires:["menu.UniversityMenu","menu.CollegeMenu","menu.Menu"],
	layout : 'border',
	renderTo:Ext.getBody(),
	initComponent : function(){
		var menu;
		if(user.role=="u")
		{
			Ext.syncRequire("menu.UniversityMenu");
			menu=Ext.create("menu.UniversityMenu",{
				title: '导航菜单',
				region:'west',
				width:250,
				collapsible :true
			});
		}else if(user.role=="c")
		{
			Ext.syncRequire("menu.CollegeMenu");
			menu=Ext.create("menu.CollegeMenu",{
				title: '导航菜单',
				region:'west',
				width:250,
				collapsible :true
			});
		}
		var functionPanel=Ext.create("Ext.panel.Panel",{
				region:'center',
				id:'functionPanel',
				layout:'fit'
			});
		this.items=[menu,functionPanel];
		this.callParent(arguments);
	}
});