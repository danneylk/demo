// 处理导航条
function initPage(obj, objs) {
	var _this = obj;
	var pagectr = $(objs.pager);
	$(pagectr).addClass("wd-page");

	// 导航条box
	var czdivbox = document.createElement("div");
	czdivbox.style.width = "140px";
	$(czdivbox).addClass("czdivbox");

	// 处理左按钮
	var div_fleft = document.createElement("div");
	div_fleft.id = _this[0].id + "div_fleft";
	$(div_fleft).addClass("updownczdiv");
	div_fleft.style.margin = "0px";
	$(div_fleft).addClass("div_leftnormal");
	$(div_fleft).bind("click", function() {
		bindTableRow(this, objs, this);
	});
	czdivbox.appendChild(div_fleft);

	// 显示页数
	var div_page = document.createElement('div');
	div_page.id = _this[0].id + "div_showpagecount";
	div_page.className = "div_page";
	div_page.innerHTML = objs.data.page + "/" + objs.data.total;
	czdivbox.appendChild(div_page);

	// 处理右按钮
	var div_right = document.createElement("div");
	div_right.id = _this[0].id + "div_right";
	div_right.style.margin = "0px";
	$(div_right).addClass("updownczdiv");
	if(objs.data.page < objs.data.total) {
		$(div_right).addClass("div_right_over");
	} else {
		$(div_right).addClass("div_rightnormal");
	}
	$(div_right).bind("click", function() {
		bindTableRow(this, objs, this)
	});
	czdivbox.appendChild(div_right);

	pagectr[0].appendChild(czdivbox);
};

// 按钮点击事件处理 
function bindTableRow(obj, objs, _this) {
	if($("#" + objs.tableId + "wd-checkall")[0] != undefined) {
		$("#" + objs.tableId + "wd-checkall")[0].checked = false;
	}
	var grid_data = "";
	objs.allLineHeight = $("#" + objs.tableId)[0].clientHeight;
	switch(obj.id) {

		case objs.tableId + "div_fleft":
			if(objs.data.page != 1) {
				getDataJson(objs, parseInt(objs.data.page) - 1, _this);
			}
			break;
		case objs.tableId + "div_right":
			if(objs.data.page != objs.data.total) {
				getDataJson(objs, parseInt(objs.data.page) + 1, _this);
			}
			break;
		default:
			break;
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
			jQuery("#" + objs.tableId).wdDeleteTableRow({
				tableobj: $("#" + objs.tableId)
			});
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
};

function addPage(_this, json, _wdobjs) {
//	$("#" + _this[0].id + "page").val(json[_wdobjs.constant.page]); // 当前页
//	$("#" + _this[0].id + "total").html(json.total); // 总页数 
//	$("#" + _this[0].id + "rowstart").html(parseInt(json[_wdobjs.constant.page] - 1) * _wdobjs.pagesize + 1); // 行数开始
	$("#" + _this[0].id + "div_showpagecount").innerHTML = json[_wdobjs.constant.page] + "/" + json.total;
//	// 行数结束
//	var nedpagecount = 0;
//	if(json.rows.length < _wdobjs.pagesize) {
//		nedpagecount = parseInt(json[_wdobjs.constant.page] - 1) * _wdobjs.pagesize + json.rows.length;
//	} else {
//		nedpagecount = json[_wdobjs.constant.page] * _wdobjs.pagesize;
//	}
//	$("#" + _this[0].id + "rowend").html(nedpagecount);
//	$("#" + _this[0].id + "records").html(json.records); // 总行数
	// 最左按钮处理、左按钮处理、最右按钮处理、右按钮处理
	if(json[_wdobjs.constant.page] == json.total && json[_wdobjs.constant.page] == 1) {
		// 左按钮处理
		$("#" + _this[0].id + "div_fleft").removeClass("div_left_over");
		$("#" + _this[0].id + "div_fleft").addClass("div_leftnormal");
		// 右按钮处理
		$("#" + _this[0].id + "div_right").removeClass("div_right_over");
		$("#" + _this[0].id + "div_right").addClass("div_rightnormal");
	} else if(json[_wdobjs.constant.page] == json.total && json[_wdobjs.constant.page] != 1) {
		// 左按钮处理
		$("#" + _this[0].id + "div_fleft").removeClass("div_leftnormal");
		$("#" + _this[0].id + "div_fleft").addClass("div_left_over");
		// 右按钮处理
		$("#" + _this[0].id + "div_right").removeClass("div_right_over");
		$("#" + _this[0].id + "div_right").addClass("div_rightnormal");
	} else if(json[_wdobjs.constant.page] != json.total) {
		if(json[_wdobjs.constant.page] == 1) {
			// 左按钮处理
			$("#" + _this[0].id + "div_fleft").removeClass("div_left_over");
			$("#" + _this[0].id + "div_fleft").addClass("div_leftnormal");
			// 右按钮处理
			$("#" + _this[0].id + "div_right").removeClass("div_rightnormal");
			$("#" + _this[0].id + "div_right").addClass("div_right_over");
		} else {
			// 左按钮处理
			$("#" + _this[0].id + "div_fleft").removeClass("div_leftnormal");
			$("#" + _this[0].id + "div_fleft").addClass("div_left_over");
			// 右按钮处理
			$("#" + _this[0].id + "div_right").removeClass("div_rightnormal");
			$("#" + _this[0].id + "div_right").addClass("div_right_over");
		}
	}
}