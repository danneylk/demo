// 处理导航条
function initPage(obj, objs) {
	var _this = obj;
	var pagectr = $(objs.pager);

	var addBut = document.createElement('div');
	addBut.className = "loadmorePage";
	addBut.innerHTML = objs.pagetext.span10;
	$(addBut).bind("click", function() {
		bindTableRow(this, objs, this);
	});
	pagectr[0].appendChild(addBut);
};

// 按钮点击事件处理 
function bindTableRow(obj, objs, _this) {
	if(objs.data.page != objs.data.total) {
		getDataJson(objs, parseInt(objs.data.page) + 1, _this);
	}
};

// 底部操作处理
function getDataJson(objs, pageindex, _this) {
	var grid_data = "";
	var url = objs.url;
	if(url.indexOf('?') > 0) {
		url = url + "&time=" + new Date().getTime()
	} else {
		url = url + "?time=" + new Date().getTime()
	}
	if(objs.submitType.toUpperCase() == "FORM") {
		for(var i = 0; i < objs.postData.length; i++) {
			if(objs.postData[i].name == objs.constant.page) {
				objs.postData[i].value = pageindex;
			}
			if(objs.postData[i].name == objs.constant.rows) {
				objs.postData[i].value = objs.pagesize;
			}
		}
		if(!objs.postData.length) {
			objs.postData[objs.constant.page] = pageindex;
			objs.postData[objs.constant.rows] = objs.pagesize;
		}
	} else {
		objs.postData[objs.constant.page] = pageindex;
		objs.postData[objs.constant.rows] = objs.pagesize;
	}
	url = url;
	var ajaxObj = {
		objs: objs,
		url: url,
		postData: objs.postData,
		callFun: function(data) {
			if(typeof(data) == "string") {
				grid_data = eval("(" + data + ")");
			} else {
				grid_data = data;
			}
			objs.data["page"] = pageindex; // 当前页数
			grid_data["page"] = pageindex;
			objs.data["records"] = grid_data[objs.constant.records]; // 获取结果集总记录数 2015-10-15 调整
			if(grid_data.rows == undefined) { // 结果集
				grid_data["rows"] = grid_data[objs.constant.datarows];
			}
			if(grid_data.records == undefined) { // 总页数
				grid_data["total"] = Math.ceil(objs.data.records / objs.pagesize); // 苏州处理
				objs.data["total"] = Math.ceil(objs.data.records / objs.pagesize);
			} else {
				grid_data["total"] = Math.ceil(grid_data.records / objs.pagesize);
				objs.data["total"] = Math.ceil(grid_data.records / objs.pagesize);
			}
//			jQuery("#" + objs.tableId).wdDeleteTableRow({
//				tableobj: $("#" + objs.tableId)
//			});
			jQuery("#" + objs.tableId).wdAddTableRow({
				grid_data: grid_data,
				tableobj: $("#" + objs.tableId),
				objs: objs
			});

			if(objs.pageChangeFun) {
				objs.pageChangeFun.call('', grid_data);
			}

		}
	}
	jQuery("#" + objs.tableId).wdAjax({
		objs: ajaxObj
	});
}