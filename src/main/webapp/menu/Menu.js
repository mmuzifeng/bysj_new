Ext.define("menu.Menu", {
			extend : "Ext.tree.Panel",
			listeners : {
				selectionchange : function(tree, selected, eOpts) {
					var data = selected[0].data;
					var cmp = null;
					var p = Ext.getCmp("functionPanel");
					//console.log(data.cmpName);
					if (data.cmpName != null)
						cmp = Ext.create(data.cmpName);
					if (cmp != null) {
						p.removeAll();
						p.add(cmp);
					}
				}
			}
		})