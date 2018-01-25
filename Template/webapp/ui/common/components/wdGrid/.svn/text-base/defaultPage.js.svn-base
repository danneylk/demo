// 处理导航条
function initPage(obj, objs) {
	var _this = obj;
	var pagectr = $(objs.pager);
	if($(pagectr).find(".czdivbox").length > 0) {
		return false;
	}
	pagectr[0].style.borderWidth = objs.pageStyle.borderWidth + "px";
	pagectr[0].style.borderStyle = objs.pageStyle.borderStyle;
	pagectr[0].style.borderColor = objs.pageStyle.borderColor;
	pagectr[0].style.backgroundColor = objs.pageStyle.pageBackgroundColor;

	$(pagectr).addClass("wd-page");
	var records = objs.data.records; // 获取总记录数
	// 无数据box
	var emptyczdivbox = document.createElement("div");
	emptyczdivbox.innerHTML = objs.nodatavalue; //"无数据";
	emptyczdivbox.style.fontSize = "12px";
	emptyczdivbox.style.display = "none";
	pagectr[0].appendChild(emptyczdivbox);
	// 导航条box
	var czdivbox = document.createElement("div");
	$(czdivbox).addClass("czdivbox");
	if(records == 0) {
		czdivbox.style.display = "none";
		emptyczdivbox.style.display = "block";
		return;
	}
	// 处理最左按钮
	var div_fleft_all = document.createElement("div");
	div_fleft_all.id = _this[0].id + "div_fleft_all";
	$(div_fleft_all).addClass("czdiv");
	$(div_fleft_all).addClass("div_fleft_all");
	$(div_fleft_all).bind("click", function() {
		bindTableRow(this, objs, this)
	});
	czdivbox.appendChild(div_fleft_all);

	// 处理左按钮
	var div_fleft = document.createElement("div");
	div_fleft.id = _this[0].id + "div_fleft";
	$(div_fleft).addClass("czdiv");
	$(div_fleft).addClass("div_fleft");
	$(div_fleft).bind("click", function() {
		bindTableRow(this, objs, this);
	});
	czdivbox.appendChild(div_fleft);

	// 处理分割符
	var div_blank = document.createElement('div');
	$(div_blank).addClass('span_blank');
	czdivbox.appendChild(div_blank);

	if(!objs.simplenav) {
		czdivbox.style.minWidth = "600px";
		// 处理文本（第）
		var div_span = document.createElement('div');
		$(div_span).addClass('div_span')
		div_span.innerHTML = objs.pagetext.span1; //"第";
		czdivbox.appendChild(div_span);

		// 处理文本框
		var input_page = document.createElement('input');
		input_page.type = "text";
		input_page.id = _this[0].id + "page";
		$(input_page).bind('keydown', function(e) {
			if(e.which == 13) {
				var reg = new RegExp('^(^[0-9]*[1-9][0-9]*$)*$');
				if(reg.test(this.value) && this.value.length > 0) {
					if(this.value > objs.data.total) { // 大于最大页数显示最大页数的数据2015-11-4调整
						this.value = objs.data.total;
					}
					bindTableRow(this, objs, this);
				} else {
					this.value = objs.data[page]; // 非法字符显示上次的值2015-11-4调整
				}
			}
		});
		input_page.value = objs.data.page;
		$(input_page).addClass('input_page');
		czdivbox.appendChild(input_page);

		// 处理文本（页）
		var div_span = document.createElement('div');
		$(div_span).addClass('div_span')
		div_span.innerHTML = objs.pagetext.span2; //"页";
		czdivbox.appendChild(div_span);

		// 处理文本（共X页）
		var div_span = document.createElement('div');
		$(div_span).addClass('div_span')
		div_span.innerHTML = objs.pagetext.span3 + "&nbsp;<span id='" + _this[0].id + "total'>" + objs.data.total + "</span>&nbsp;" + objs.pagetext.span9;
		czdivbox.appendChild(div_span);

		// 处理分割符
		var div_blank = document.createElement('div');
		$(div_blank).addClass('span_blank');
		czdivbox.appendChild(div_blank);
	} else {
		czdivbox.style.minWidth = "300px";
	}
	// 处理右按钮
	var div_right = document.createElement("div");
	div_right.id = _this[0].id + "div_right";
	$(div_right).addClass("czdiv");
	if(objs.data.page < objs.data.total) {
		$(div_right).addClass("div_right_active");
	} else {
		$(div_right).addClass("div_right");
	}
	$(div_right).bind("click", function() {
		bindTableRow(this, objs, this)
	});
	czdivbox.appendChild(div_right);

	// 处理最右按钮
	var div_rightall = document.createElement("div");
	div_rightall.id = _this[0].id + "div_rightall";
	$(div_rightall).addClass("czdiv");
	if(objs.data.page < objs.data.total) {
		$(div_rightall).addClass("div_rightall_active");
	} else {
		$(div_rightall).addClass("div_rightall");
	}
	$(div_rightall).bind("click", function() {
		bindTableRow(this, objs, this)
	});
	czdivbox.appendChild(div_rightall);

	// 处理下拉页数
	var div_selectbox = document.createElement('div');
	div_selectbox.id = _this[0].id + "select";
	$(div_selectbox).addClass("div_selectbox");
	var div_select = document.createElement('select');
	// 下拉项处理
	var select_option;
	for(var i = 0; i < objs.rowList.length; i++) {
		div_select.options.add(new Option(objs.rowList[i], objs.rowList[i]));
	}
	div_selectbox.appendChild(div_select);
	$(div_selectbox).bind("change", function() {
		bindTableRow(this, objs, this);
	});
	// 设置默认显示pagesize
	for(var j = 0; j < div_selectbox.lastChild.length; j++) {
		if(div_selectbox.lastChild[j].value == objs.pagesize) {
			div_selectbox.lastChild[j].selected = true;
		}
	}
	czdivbox.appendChild(div_selectbox);

	// 处理文本（页数描述）
	var div_pagedetailbox = document.createElement('div');
	div_pagedetailbox.style.width = objs.pagecountwidth + "px";
	$(div_pagedetailbox).addClass('div_pagedetailbox');
	// 处理文本（当前X-X条）
	var div_span = document.createElement('div');
	$(div_span).addClass('div_span')
	var nedpagecount = 0;
	if(objs.data.rows.length < objs.pagesize) {
		nedpagecount = parseInt(objs.data.page - 1) * objs.pagesize + objs.data.rows.length;
	} else {
		nedpagecount = objs.data.page * objs.pagesize;
	}

	var spanstart = parseInt(parseInt(objs.data.page - 1) * objs.pagesize + 1);
	var titlespanstart = parseInt(parseInt(objs.data.page - 1) * objs.pagesize + 1);
	if(spanstart > 999) {
		spanstart = spanstart.toString().substring(0, 3) + "..";
	}
	var spanend = nedpagecount;
	var titlespanend = nedpagecount;
	if(spanend > 999) {
		spanend = spanend.toString().substring(0, 3) + "..";
	}
	div_span.innerHTML = objs.pagetext.span4 + "&nbsp;<span id='" + _this[0].id + "rowstart' title='" + titlespanstart + "'>" + spanstart + "</span>&nbsp;-&nbsp;<span id='" + _this[0].id + "rowend' title='" + titlespanend + "'>" + spanend + "</span>&nbsp;" + pan10;
	div_pagedetailbox.appendChild(div_span);
	// 处理文本（共X条）
	var div_span = document.createElement('div');
	$(div_span).addClass('div_span');

	var spanrecords = objs.data.records;
	var titlespanrecords = objs.data.records;
	if(spanrecords > 999) {
		spanrecords = spanrecords.toString().substring(0, 3) + "..";
	}
	div_span.innerHTML = objs.pagetext.span3 + "&nbsp;<span id='" + _this[0].id + "records' title='" + titlespanrecords + "'>" + spanrecords + "</span>&nbsp;" + objs.pagetext.span5;
	div_pagedetailbox.appendChild(div_span);

	czdivbox.appendChild(div_pagedetailbox);

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
		case objs.tableId + "div_fleft_all":
			if(objs.data.page != 1) {
				getDataJson(objs, "1", _this);
			}
			break;
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
		case objs.tableId + "div_rightall":
			if(objs.data.page != objs.data.total) {
				grid_data = getDataJson(objs, objs.data.total, _this);
			}
			break;
		case objs.tableId + "page":
			getDataJson(objs, obj.value, _this);
			break;
		case objs.tableId + "select":
			var pagesize = $("#" + objs.tableId + "select").find("option:selected").text();
			objs.pagesize = pagesize;
			getDataJson(objs, "1", _this);
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
	//	crossDomainAjax(objs, url, objs.postData, function(data) {

};

function addPage(_this, json, _wdobjs) {
	$("#" + _this[0].id + "page").val(json[_wdobjs.constant.page]); // 当前页
	$("#" + _this[0].id + "total").html(json.total); // 总页数 
	$("#" + _this[0].id + "rowstart").html(parseInt(json[_wdobjs.constant.page] - 1) * _wdobjs.pagesize + 1); // 行数开始
	// 行数结束
	var nedpagecount = 0;
	if(json.rows.length < _wdobjs.pagesize) {
		nedpagecount = parseInt(json[_wdobjs.constant.page] - 1) * _wdobjs.pagesize + json.rows.length;
	} else {
		nedpagecount = json[_wdobjs.constant.page] * _wdobjs.pagesize;
	}
	$("#" + _this[0].id + "rowend").html(nedpagecount);
	$("#" + _this[0].id + "records").html(json.records); // 总行数
	// 最左按钮处理、左按钮处理、最右按钮处理、右按钮处理
	if(json[_wdobjs.constant.page] == json.total && json[_wdobjs.constant.page] == 1) {
		// 最左按钮处理
		$("#" + _this[0].id + "div_fleft_all").removeClass("div_fleft_all_active");
		$("#" + _this[0].id + "div_fleft_all").addClass("div_fleft_all");
		// 左按钮处理
		$("#" + _this[0].id + "div_fleft").removeClass("div_fleft_active");
		$("#" + _this[0].id + "div_fleft").addClass("div_fleft");
		// 右按钮处理
		$("#" + _this[0].id + "div_right").removeClass("div_right_active");
		$("#" + _this[0].id + "div_right").addClass("div_right");
		// 最右按钮处理
		$("#" + _this[0].id + "div_rightall").removeClass("div_rightall_active");
		$("#" + _this[0].id + "div_rightall").addClass("div_rightall");
	} else if(json[_wdobjs.constant.page] == json.total && json[_wdobjs.constant.page] != 1) {
		// 最左按钮处理
		$("#" + _this[0].id + "div_fleft_all").removeClass("div_fleft_all");
		$("#" + _this[0].id + "div_fleft_all").addClass("div_fleft_all_active");
		// 左按钮处理
		$("#" + _this[0].id + "div_fleft").removeClass("div_fleft");
		$("#" + _this[0].id + "div_fleft").addClass("div_fleft_active");
		// 右按钮处理
		$("#" + _this[0].id + "div_right").removeClass("div_right_active");
		$("#" + _this[0].id + "div_right").addClass("div_right");
		// 最右按钮处理
		$("#" + _this[0].id + "div_rightall").removeClass("div_rightall_active");
		$("#" + _this[0].id + "div_rightall").addClass("div_rightall");
	} else if(json[_wdobjs.constant.page] != json.total) {
		if(json[_wdobjs.constant.page] == 1) {
			// 最左按钮处理
			$("#" + _this[0].id + "div_fleft_all").removeClass("div_fleft_all_active");
			$("#" + _this[0].id + "div_fleft_all").addClass("div_fleft_all");
			// 左按钮处理
			$("#" + _this[0].id + "div_fleft").removeClass("div_fleft_active");
			$("#" + _this[0].id + "div_fleft").addClass("div_fleft");
			// 右按钮处理
			$("#" + _this[0].id + "div_right").removeClass("div_right");
			$("#" + _this[0].id + "div_right").addClass("div_right_active");
			// 最右按钮处理
			$("#" + _this[0].id + "div_rightall").removeClass("div_rightall");
			$("#" + _this[0].id + "div_rightall").addClass("div_rightall_active");
		} else {
			// 最左按钮处理
			$("#" + _this[0].id + "div_fleft_all").removeClass("div_fleft_all");
			$("#" + _this[0].id + "div_fleft_all").addClass("div_fleft_all_active");
			// 左按钮处理
			$("#" + _this[0].id + "div_fleft").removeClass("div_fleft");
			$("#" + _this[0].id + "div_fleft").addClass("div_fleft_active");
			// 右按钮处理
			$("#" + _this[0].id + "div_right").removeClass("div_right");
			$("#" + _this[0].id + "div_right").addClass("div_right_active");
			// 最右按钮处理
			$("#" + _this[0].id + "div_rightall").removeClass("div_rightall");
			$("#" + _this[0].id + "div_rightall").addClass("div_rightall_active");
		}
	}
}