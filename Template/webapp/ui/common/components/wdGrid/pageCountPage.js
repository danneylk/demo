function initPage(obj, objs) {
	var _this = obj;
	var pagectr = $(objs.pager);
	if($(pagectr).find(".czdivbox").length > 0){
		return false;
	}
	var records = objs.data.records; // 获取总记录数
	var wholeDiv = document.createElement('div');
	wholeDiv.className = 'wdgrid-pageWholeWide';
	wholeDiv.setAttribute('onselectstart', 'return false');
	$(pagectr).append(wholeDiv);

	var pagebox = document.createElement('div');
	pagebox.className = 'wdgrid-pagebox';
	wholeDiv.appendChild(pagebox);

	if (objs.data.total > 1) {
		var pageLeft = document.createElement('div');
		pageLeft.id = objs.tableId + "pageprev";
		pageLeft.className = "wdgrid-pageBtn wdgrid-pageprev";
		pagebox.appendChild(pageLeft);

		$(pageLeft).click(function() {
			if (objs.data.page != 1) {
				var pageIndex = objs.data.page - 1;
				getJsonData(objs, pageIndex, _this)
			}
		});

		var pageNumbox = document.createElement('div');
		pageNumbox.className = 'wdgrid-pageNumBox';
		pagebox.appendChild(pageNumbox);

		var pageRight = document.createElement('div');
		pageRight.id = objs.tableId + "pagenext";
		pageRight.className = "wdgrid-pageBtn wdgrid-pagenext-active";
		pagebox.appendChild(pageRight);
		$(pageRight).click(function() {
			if (parseInt(objs.data.page) != objs.data.total) {
				var pageIndex = parseInt(objs.data.page) + 1;
				getJsonData(objs, pageIndex, _this);
			}
		});

		var pagenum = objs.data.page;
		var startcompare = 5;
		var endcompare = parseInt(objs.data.total) - 4;
		var totalpage = parseInt(objs.data.total);
		if (totalpage > 100) {
			totalpage = 100;
		}

		for (var n = 0; n < 9; n++) {
			if (totalpage == n) {
				return false;
			}
			var cyclenum = n + 1;
			var num = document.createElement('span');

			num.innerHTML = cyclenum;
			if (n == 0) {
				num.style.marginLeft = '0';
			}
			if (n == 1 && pagenum > startcompare) {
				num.innerHTML = "…";
			}
			if (n == 2) {
				if (pagenum > startcompare && pagenum < endcompare) {
					num.innerHTML = pagenum - 2;
				} else if (pagenum >= endcompare) {
					num.innerHTML = totalpage - 6;
				}
			}
			if (n == 3) {
				if (pagenum > startcompare && pagenum < endcompare) {
					num.innerHTML = pagenum - 1;
				} else if (pagenum >= endcompare) {
					num.innerHTML = totalpage - 5;
				}
			}
			if (n == 4) {
				if (pagenum > startcompare && pagenum < endcompare) {
					num.innerHTML = pagenum;
				} else if (pagenum >= endcompare) {
					num.innerHTML = totalpage - 4;
				}
			}
			if (n == 5) {
				if (pagenum > startcompare && pagenum < endcompare) {
					num.innerHTML = pagenum + 1;
				} else if (pagenum >= endcompare) {
					num.innerHTML = totalpage - 3;
				}
			}
			if (n == 6) {
				if (pagenum > startcompare && pagenum < endcompare) {
					num.innerHTML = pagenum + 2;
				} else if (pagenum >= endcompare) {
					num.innerHTML = totalpage - 2;
				}
			}
			if (n == 7) {
				if (pagenum < endcompare) {
					num.innerHTML = "…";
				} else {
					num.innerHTML = totalpage - 1;
				}
			}
			if (n == 8) {
				num.innerHTML = totalpage;
			}
			if (totalpage <= 9) {
				num.innerHTML = cyclenum;
			}
			$(num).click(function() {
				if ($(this).html() != '…' && !$(this).hasClass("wdgrid-activeNum")) {
					var pageIndex = parseInt($(this).html());
					getJsonData(objs, pageIndex, _this);
				}
			});

			if (pagenum <= startcompare) {
				if (pagenum == cyclenum) {
					num.className = 'wdgrid-pageNum wdgrid-activeNum';
				} else {
					num.className = 'wdgrid-pageNum';
				}
			} else if (pagenum > startcompare && pagenum < endcompare) {
				if (n == 4) {
					num.className = 'wdgrid-pageNum wdgrid-activeNum';
				} else {
					num.className = 'wdgrid-pageNum';
				}
			} else if (pagenum >= endcompare) {
				if (pagenum == parseInt($(num).html())) {
					num.className = 'wdgrid-pageNum wdgrid-activeNum';
				} else {
					num.className = 'wdgrid-pageNum';
				}
			}
			if ($(num).html() == "…") {
				$(num).addClass("wdgrid-pageNum-clearhover");
			}

			pageNumbox.appendChild(num);
		}
	}
};

// 底部操作处理
function getJsonData(objs, pageindex, _this) {
	var grid_data = "";
	var url = objs.url;
	if (url.indexOf('?') > 0) {
		url = url + "&time=" + new Date().getTime()
	} else {
		url = url + "?time=" + new Date().getTime()
	}
	if (objs.submitType.toUpperCase() == "FORM") {
		for (var i = 0; i < objs.postData.length; i++) {
			if (objs.postData[i].name == objs.constant.page) {
				objs.postData[i].value = pageindex;
			}
			if (objs.postData[i].name == objs.constant.rows) {
				objs.postData[i].value = objs.pagesize;
			}
		}
		if (!objs.postData.length) {
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
			if (typeof(data) == "string") {
				grid_data = eval("(" + data + ")");
			} else {
				grid_data = data;
			}
			objs.data["page"] = pageindex; // 当前页数
			grid_data["page"] = pageindex;
			objs.data["records"] = grid_data[objs.constant.records]; // 获取结果集总记录数 2015-10-15 调整
			if (grid_data.rows == undefined) { // 结果集
				grid_data["rows"] = grid_data[objs.constant.datarows];
			}
			if (grid_data.records == undefined) { // 总页数
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
			bindPages(_this, objs);
			if (objs.pageChangeFun)
				objs.pageChangeFun.call('', grid_data);

		}
	}
	jQuery("#" + objs.tableId).wdAjax({
		objs: ajaxObj
	});
};

//绑定翻页
function bindPages(obj, objs) {
	var _this = obj;
	var pagectr = $(objs.pager);
	$(pagectr).find(".wdgrid-pageWholeWide").remove();
	var wholeDiv = document.createElement('div');
	wholeDiv.className = 'wdgrid-pageWholeWide';
	wholeDiv.setAttribute('onselectstart', 'return false');
	$(pagectr).append(wholeDiv);
	var pagebox = document.createElement('div');
	pagebox.className = 'wdgrid-pagebox';
	wholeDiv.appendChild(pagebox);
	if (objs.data.total > 1) {
		var pageLeft = document.createElement('div');
		pageLeft.id = objs.tableId + "pageprev";
		if (objs.data.page != 1) {
			pageLeft.className = "wdgrid-pageBtn wdgrid-pageprev-active";
		} else {
			pageLeft.className = "wdgrid-pageBtn wdgrid-pageprev";
		}
		pagebox.appendChild(pageLeft);

		$(pageLeft).click(function() {
			if (objs.data.page != 1) {
				var pageIndex = objs.data.page - 1;
				getJsonData(objs, pageIndex, _this)
			}
		});

		var pageNumbox = document.createElement('div');
		pageNumbox.className = 'wdgrid-pageNumBox';
		pagebox.appendChild(pageNumbox);

		var pageRight = document.createElement('div');
		pageRight.id = objs.tableId + "pagenext";
		if (objs.data.page == objs.data.total) {
			pageRight.className = "wdgrid-pageBtn wdgrid-pagenext";
		} else {
			pageRight.className = "wdgrid-pageBtn wdgrid-pagenext-active";
		}

		pagebox.appendChild(pageRight);
		$(pageRight).click(function() {
			if (parseInt(objs.data.page) != objs.data.total) {
				var pageIndex = parseInt(objs.data.page) + 1;
				getJsonData(objs, pageIndex, _this);
			}
		});

		var pagenum = objs.data.page;
		var startcompare = 5;
		var endcompare = parseInt(objs.data.total) - 4;
		var totalpage = parseInt(objs.data.total);
		if (totalpage > 100) {
			totalpage = 100;
		}

		for (var n = 0; n < 9; n++) {
			if (totalpage == n) {
				return false;
			}
			var cyclenum = n + 1;
			var num = document.createElement('span');

			num.innerHTML = cyclenum;
			if (n == 0) {
				num.style.marginLeft = '0';
			}
			if (n == 1 && pagenum > startcompare) {
				num.innerHTML = "…";
			}
			if (n == 2) {
				if (pagenum > startcompare && pagenum < endcompare) {
					num.innerHTML = pagenum - 2;
				} else if (pagenum >= endcompare) {
					num.innerHTML = totalpage - 6;
				}
			}
			if (n == 3) {
				if (pagenum > startcompare && pagenum < endcompare) {
					num.innerHTML = pagenum - 1;
				} else if (pagenum >= endcompare) {
					num.innerHTML = totalpage - 5;
				}
			}
			if (n == 4) {
				if (pagenum > startcompare && pagenum < endcompare) {
					num.innerHTML = pagenum;
				} else if (pagenum >= endcompare) {
					num.innerHTML = totalpage - 4;
				}
			}
			if (n == 5) {
				if (pagenum > startcompare && pagenum < endcompare) {
					num.innerHTML = pagenum + 1;
				} else if (pagenum >= endcompare) {
					num.innerHTML = totalpage - 3;
				}
			}
			if (n == 6) {
				if (pagenum > startcompare && pagenum < endcompare) {
					num.innerHTML = pagenum + 2;
				} else if (pagenum >= endcompare) {
					num.innerHTML = totalpage - 2;
				}
			}
			if (n == 7) {
				if (pagenum < endcompare) {
					num.innerHTML = "…";
				} else {
					num.innerHTML = totalpage - 1;
				}
			}
			if (n == 8) {
				num.innerHTML = totalpage;
			}
			if (totalpage <= 9) {
				num.innerHTML = cyclenum;
			}
			$(num).click(function() {
				if ($(this).html() != '…' && !$(this).hasClass("wdgrid-activeNum")) {
					var pageIndex = parseInt($(this).html());
					getJsonData(objs, pageIndex, _this);
				}
			});

			if (pagenum <= startcompare) {
				if (pagenum == cyclenum) {
					num.className = 'wdgrid-pageNum wdgrid-activeNum';
				} else {
					num.className = 'wdgrid-pageNum';
				}
			} else if (pagenum > startcompare && pagenum < endcompare) {
				if (n == 4) {
					num.className = 'wdgrid-pageNum wdgrid-activeNum';
				} else {
					num.className = 'wdgrid-pageNum';
				}
			} else if (pagenum >= endcompare) {
				if (pagenum == parseInt($(num).html())) {
					num.className = 'wdgrid-pageNum wdgrid-activeNum';
				} else {
					num.className = 'wdgrid-pageNum';
				}
			}
			if ($(num).html() == "…") {
				$(num).addClass("wdgrid-pageNum-clearhover");
			}

			pageNumbox.appendChild(num);
		}
	}
};