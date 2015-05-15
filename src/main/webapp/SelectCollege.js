Ext.create('Ext.data.Store', {
			storeId : 'simpsonsStore',
			fields : ['name', 'email', 'phone'],
			data : {
				'items' : [{
							'name' : 'Lisa',
							"email" : "lisa@simpsons.com",
							"phone" : "555-111-1224"
						}, {
							'name' : 'Bart',
							"email" : "bart@simpsons.com",
							"phone" : "555-222-1234"
						}, {
							'name' : 'Homer',
							"email" : "homer@simpsons.com",
							"phone" : "555-222-1244"
						}, {
							'name' : 'Marge',
							"email" : "marge@simpsons.com",
							"phone" : "555-222-1254"
						}]
			},
			proxy : {
				type : 'memory',
				reader : {
					type : 'json',
					rootProperty : 'items'
				}
			}
		});
Ext.define("SelectCollege", {
			extend : "Ext.grid.Panel",
			title : 'Simpsons',
			store : Ext.data.StoreManager.lookup('simpsonsStore'),
			title : "请选择要进入的学院",
			columns : [{
						text : 'Name',
						dataIndex : 'name'
					}, {
						text : 'Email',
						dataIndex : 'email',
						flex : 1
					}, {
						text : 'Phone',
						dataIndex : 'phone'
					}],
			//height : 200,
			width : 400,
			style : 'margin:0 auto;margin-top:100px;',
			renderTo : Ext.getBody(),
			listeners : {
				select : function(grid, record, index, eOpts) {
					console.log("haha");
					Ext.getBody().empty();
					Ext.create("MainFrame");
				}
			}
		});