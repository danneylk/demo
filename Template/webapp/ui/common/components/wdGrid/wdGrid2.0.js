(function($) {
	var arrayObj = new Array();
	var UILocationName = (typeof(grid2UILocationName) != "undefined") ? grid2UILocationName : "ui";
	// ##################################### 全局变量定义，可修改 #####################################start
	/*var rows = "pageSize"; // 每页条数（后台传参）
	var page = "pageNum"; // 当前页数（后台传参）
	var records = "total"; // 总记录数（后台回参）records
	var datarows = "list"; // 结果集（后台回参）rows
	var cookiename = "language"; // 国际化cookiename*/
	
	var rows = "pageSize"; // 每页条数（后台传参）
	var page = "currPage"; // 当前页数（后台传参）
	var records = "total"; // 总记录数（后台回参）
	var datarows = "data"; // 结果集（后台回参）
	var cookiename = "language"; // 国际化cookiename
 	// ##################################### 全局变量定义，可修改 #####################################end
	// 日期format
	Date.prototype.format = function(format) {
		var o = {
			"M+": this.getMonth() + 1, //month
			"d+": this.getDate(), //day
			"h+": this.getHours(), //hour
			"m+": this.getMinutes(), //minute
			"s+": this.getSeconds(), //second
			"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
			"S": this.getMilliseconds() //millisecond
		}
		if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(format))
				format = format.replace(RegExp.$1,
					RegExp.$1.length == 1 ? o[k] :
					("00" + o[k]).substr(("" + o[k]).length));
		return format;
	};
	// ##################################### 国际化处理 #####################################start
	var span1; // 第
	var span2; // 页
	var span3; // 共
	var span4; // 当前
	var span5; // 条
	var span10; // 条
	var span6; // 无数据
	var span7; // 序号
	var span8; // 数据加载中,请稍等~~~
	var span9;
	var language;
	var arr, reg = new RegExp("(^| )" + cookiename + "=([^;]*)(;|$)");

	if (document.cookie.match(reg) == null) {
		language = "zh";
	} else {
		arr = document.cookie.match(reg);
		language = unescape(arr[2]);
	}
	switch (language) {
		case "zh": // 中文
			span1 = "第";
			span2 = "页";
			span3 = "共";
			span4 = "当前";
			span5 = "条";
			span6 = "暂无数据";
			span7 = "序号";
			span8 = "数据加载中,请稍等~~~";
			span9 = "页";
			pan10 = "条";
			break;
		case "en": // 英文
			span1 = "page";
			span2 = "";
			span3 = "Total:";
			span4 = "Current";
			span5 = "records";
			span6 = "No data";
			span7 = "No.";
			span8 = "loading...";
			span9 = "page(s)"; //共XX页使用 page(s)
			pan10 = "";
			break;
		default:
			span1 = "第";
			span2 = "页";
			span3 = "共";
			span4 = "当前";
			span5 = "条";
			span6 = "暂无数据";
			span7 = "序号";
			span8 = "数据加载中,请稍等~~~";
			span9 = "页";
			pan10 = "条";
			break;
	}
	// ##################################### 国际化处理 #####################################end
	// 获取选中信息集合
	$.fn.getAllCheckedId = function() {
		var checkId = "";

		$("#" + this[0].id + " .wd-table-check-item").each(function() {
			if (this.checked) checkId = checkId + this.id.replace('wd-check', '') + ",";
		});

		return checkId.substring(0, checkId.length - 1);
	};
	// 获取总结果集数
	$.fn.getAllRows = function() {
		var allRowsCount = 0;
		if ($("#" + this[0].id + "records").length > 0) {
			allRowsCount = $("#" + this[0].id + "records")[0].innerHTML;
		}
		return allRowsCount;
	};
	$.fn.changeColShow = function(objs) {
		var _this = this;
		var showtr = [];
		var hidetr = [];
		if (objs.showCol) showtr = objs.showCol.split(',');
		if (objs.hideCol) hidetr = objs.hideCol.split(',');
		for (var i = 0; i < showtr.length; i++) {
			showChangeWdGridCol(_this[0].id, $("#" + _this[0].id + " th").index($("#wdgrid_" + showtr[i])), true);
		}
		for (var i = 0; i < hidetr.length; i++) {
			showChangeWdGridCol(_this[0].id, $("#" + _this[0].id + " th").index($("#wdgrid_" + hidetr[i])), false);
		}
	};

	function showChangeWdGridCol(id, index, flg) {
		if (flg) {
			$("#" + id + " tr").find('td:eq(' + index + ')').show();
			$("#" + id + " tr").find('th:eq(' + index + ')').show();
		} else {
			$("#" + id + " tr").find('td:eq(' + index + ')').hide();
			$("#" + id + " tr").find('th:eq(' + index + ')').hide();
		}
	};

	$.fn.addTableData = function(objs) {
		var _this = this;
		addTableData(_this, objs);
	}

	function addTableData(obj, objs) {
		var _wdobj = null;
		for (var i = 0; i < arrayObj.length; i++) {
			if (arrayObj[i].name == obj[0].id) {
				_wdobj = arrayObj[i].value;
			}
		}
		var _this = objs;
		for (var i = 0; i < objs.data.rows.length; i++) {
			objs.data.rows[i].num = i + 1;
			infotr = document.createElement("tr");
			infotr.style.height = _wdobj.lineheight + "px";
			if (_wdobj.hoverflg) infotr.className = 'textHover wdinfotr';
			else infotr.className = 'wdinfotr';
			infotr.id = objs.data.rows[i][_wdobj.dbkey]; //rows[i].id
			if (_wdobj.oddflg) {
				if (i % 2 == 1) {
					infotr.style.background = _wdobj.oddcolor;
				} else {
					infotr.style.background = _wdobj.unevencolor;
				}
			}
			// 添加checkbox
			if (_wdobj.checkflg) {
				td = document.createElement("td");
				if (_wdobj.showBorder) {
					td = setBorderStyle(td, _wdobj);
				}
				td.style.width = "40px";
				checkboxs = document.createElement("input");
				var tempid = "";
				if (_wdobj.checktext != undefined) {
					var temp = "";
					for (var l = 0; l < _wdobj.checktext.length; l++) {
						temp = temp + objs.data.rows[i][_wdobj.checktext[l]] + "#";
					}
					tempid = "wd-check" + temp.substring(0, temp.length - 1);
				} else {
					tempid = "wd-check" + objs.data.rows[i][_wdobj.dbkey];

				}
				checkboxs.id = tempid;

				checkboxs.className = "wd-table-check-item"
				checkboxs.type = "checkbox";
				$(checkboxs).bind("click", function() {
					checkboxCtrl(this, _this[0].id)
				});
				td.appendChild(checkboxs);
				infotr.appendChild(td);
			}

			if (_wdobj.numberflg) {
				td = document.createElement("td");
				if (_wdobj.showBorder) {
					td = setBorderStyle(td, _wdobj);
				}
				td.innerHTML = i + 1;
				infotr.appendChild(td);
			}
			for (var j = 0; j < _wdobj.colModel.length; j++) {
				td = document.createElement("td");
				if (_wdobj.showBorder) {
					td = setBorderStyle(td, _wdobj);
				}
				//td.style.width = parseInt(objs.colModel[j].width + tempWidth) + "px";
				if (_wdobj.colModel[j].float != undefined) { // 设置文本对齐方式
					td.style.textAlign = _wdobj.colModel[j].float;

					if (_wdobj.colModel[j].float == "left") {
						td.style.paddingLeft = "4px";
					} else {
						td.style.paddingRight = "4px";
					}
				}
				// 处理行内编辑innerhtml情况
				if (_wdobj.colModel[j].innerhtml == undefined) {
					tdspan = document.createElement('div');
					tdspan.style.width = parseInt(_wdobj.colModel[j].width - 10) + "px";
					tdspan.style.height = parseInt(_wdobj.lineheight - 4) + "px";
					tdspan.style.lineHeight = parseInt(_wdobj.lineheight - 4) + "px";
					// 行内处理
					if (objs.data.rows[i][_wdobj.colModel[j].name] || objs.data.rows[i][_wdobj.colModel[j].name] == 0) { // 2015-10-19调整
						// 处理日期格式化
						if (_wdobj.colModel[j].dataformat != undefined) {
							tempstr = objs.data.rows[i][_wdobj.colModel[j].name];
							tempstr = tempstr.replace(/-/g, "/");
							tdspan.innerHTML = new Date(tempstr).format(_wdobj.colModel[j].dataformat);
						}
						// 处理前文本格式
						if (_wdobj.colModel[j].textformatbefore != undefined) {
							tdspan.innerHTML = tdspan.innerHTML + _wdobj.colModel[j].textformatbefore + objs.data.rows[i][_wdobj.colModel[j].name];
						}
						// 处理后文本格式
						if (_wdobj.colModel[j].textformatafter != undefined) {
							tdspan.innerHTML = tdspan.innerHTML + objs.data.rows[i][_wdobj.colModel[j].name] + _wdobj.colModel[j].textformatafter;
						}
						// 其他处理
						if (!_wdobj.colModel[j].dataformat && !_wdobj.colModel[j].textformatbefore && !_wdobj.colModel[j].textformatafter) {
							tdspan.innerHTML = objs.data.rows[i][_wdobj.colModel[j].name];
						}
						// 处理码表返现
						if (_wdobj.colModel[j].codeformat) {
							var json_date = JSON.parse(store.get(_wdobj.colModel[j].codeformat));
							if (json_date.data == undefined) {
								json_date.data = json_date;
							}
							for (var l = 0; l < json_date.data.length; l++) {
								if (json_date.data[l]["code"] == objs.data.rows[i][_wdobj.colModel[j].name]) {
									tdspan.innerHTML = json_date.data[l]["codedesc"];
								}
							}
						}
					} else {
						tdspan.innerHTML = "";
					}
					if (objs.data.rows[i][_wdobj.colModel[j].name] || objs.data.rows[i][_wdobj.colModel[j].name] == 0) { // 2015-10-19调整

						if (_wdobj.colModel[j].codeformat) {
							var json_date = JSON.parse(store.get(_wdobj.colModel[j].codeformat));
							if (json_date.data == undefined) {
								json_date.data = json_date;
							}
							for (var l = 0; l < json_date.data.length; l++) {
								if (json_date.data[l]["code"] == objs.data.rows[i][_wdobj.colModel[j].name]) {
									tdspan.title = json_date.data[l]["codedesc"];
								}
							}
						} else {
							tdspan.title = objs.data.rows[i][_wdobj.colModel[j].name];
						}
					}
					td.appendChild(tdspan);
				} else {
					td.innerHTML = _wdobj.colModel[j].innerhtml.call("", objs.data.rows[i], objs.data);
				}
				infotr.appendChild(td);
			}
			obj[0].appendChild(infotr);
		}
	}

	$.fn.wdAjax = function(objs) {
		crossDomainAjax(objs.objs.objs, objs.objs.url, objs.objs.postData, function(data) {
			objs.objs.callFun.call('', data);
		});
	};

	$.fn.wdDeleteTableRow = function(objs) {
		deleteTableRow(objs.tableobj);
	};

	$.fn.wdAddTableRow = function(objs) {
		addTableRow(objs.grid_data, objs.tableobj, objs.objs);
	};

	$.fn.setGridParam = function(objs) {
		var defaults = {
			hidenav: false
		}
		var postData = {};
		if (objs.postData)
			postData = objs.postData;
		var postData = objs.postData;
		var _wdobj = null;
		for (var i = 0; i < arrayObj.length; i++) {
			if (arrayObj[i].name == this[0].id) {
				_wdobj = arrayObj[i].value;
			}
		}
		if (_wdobj == null) return;
		_wdobj.postData = postData;
		if (_wdobj.submitType.toUpperCase() == "FORM") {
			if (objs.postData != undefined) {
				if (postData instanceof Array) {
					postData[postData.length] = {
						"name": page,
						"value": "1"
					};
					postData[postData.length] = {
						"name": rows,
						"value": _wdobj.pagesize
					};
				} else {
					postData[page] = 1;
					postData[rows] = _wdobj.pagesize;
				}
			}
		}
		var _this = this;
		var url = objs.url;
		if (url.indexOf('?') > 0) {
			url = url + "&time=" + new Date().getTime();
		} else {
			url = url + "?time=" + new Date().getTime();
		}
		_wdobj.allLineHeight = $("#" + _wdobj.tableId)[0].clientHeight;

		crossDomainAjax(_wdobj, url, postData, function(data) {
			deleteTableAllRowAndPage(_this, _wdobj);
			if (typeof(data) == "string") {
				_wdobj.data = eval("(" + data + ")"); // 北京处理
			} else {
				_wdobj.data = eval(data);
			}

			// 自定义结果集
			if (_wdobj.data.records == undefined) {
				_wdobj.data["records"] = _wdobj.data[records];
			}
			if (_wdobj.data.rows == undefined) {
				_wdobj.data["rows"] = _wdobj.data[datarows];
			}
			// 当前页数
			if (_wdobj.data.page == undefined) {
				_wdobj.data["page"] = "1";
			}
			// 总页数
			if (_wdobj.data.total == undefined) {
				_wdobj.data["total"] = Math.ceil(_wdobj.data.records / _wdobj.pagesize);
			}
			// 添加表头
			addTableHead(_this, _wdobj, false);
			// 绑定表格处理
			initTable(_this, _wdobj);
			// 处理导航条
			if (!objs.hidenav)
				initPage(_this, _wdobj);

			if (typeof webviewback === 'function') {
				webviewback();
			}

			if (_wdobj.callFun) {
				_wdobj.callFun.call('', _wdobj.data);
			}
		});
	};
	$.fn.wdGrid = function(objs) {
		var _this = this;
		// 默认值处理
		var defaults = {
			checkflg: false, // 是否显示checkbox
			oddflg: true, // 是显示交替行颜色
			hoverflg: true, // 是否显示鼠标滑过改变颜色
			lineheight: 30, // 行高
			dataType: "json", // 请求类型json为原型使用
			submitType: "form", // 处理苏州使用
			hidhead: false, // 是否隐藏头部
			hidenav: false, // 是否隐藏底部
			numberflg: false, // 是否显示序号列
			tableId: this[0].id, // 记录对象id
			showBorder: true, // 是否显示边框
			borderStyle: "1px solid #E1E1E1", // 边框样式
			token: true, // 防止重复提交
			firstrequest: true, //是否第一次请求
			simplenav: false, //是否为简便翻页区
			pagecountwidth: 300,
			pageStyle: {
				borderWidth: 1,
				borderColor: '#E1E1E1',
				borderStyle: 'solid',
				pageBackgroundColor: '#EFF3F8'
			},
			pageTheme: "default",
			headStyle: {
				background: "#F2F2F2",
				height: 30,
				borderWidth: 1,
				borderColor: '#E1E1E1',
				borderStyle: 'solid',
				borderPosition: ['top', 'left', 'right', 'bottom']
			},
			oddcolor: "#F9F9F9",
			unevencolor: "#fff",
			dbkey: "id"
		}
		var objs = $.extend(defaults, objs);
		// 保存全局变量
		arrayObj.push({
			"name": this[0].id,
			"value": objs
		});

		// 翻页js地址
		var pageJsUrl = "";
		var pagetext;
		if (objs.pageTheme == "default") {
			pageJsUrl = appAddress + UILocationName + "/common/components/wdGrid/defaultPage.js";
		}else if(objs.pageTheme == "pageCount"){
			pageJsUrl = appAddress + UILocationName + "/common/components/wdGrid/pageCountPage.js";
		}

		objs.pagetext = {
			span1: span1,
			span2: span2,
			span3: span3,
			span9: span9,
			span4: span4,
			span5: span5
		};
		objs.constant = {
			records: records,
			datarows: datarows,
			page: page,
			rows: rows
		};

		// 获取空数据提醒
		if (!objs.nodatavalue) objs.nodatavalue = span6;

		// 加载请求数据
		if (objs.dataType.toUpperCase() == "GET") {
			// 删除表格信息
			deleteTableAllRowAndPage(this, objs);
			// 添加表头
			addTableHead(_this, objs, true);
			if (!objs.firstrequest) return;
			var url = objs.url;
			if (url.indexOf('?') > 0) {
				url = url + "&time=" + new Date().getTime();
			} else {
				url = url + "?time=" + new Date().getTime();
			}
			// 表单提交处理
			if (objs.submitType.toUpperCase() == "FORM") {
				if (!objs.postData)
					objs.postData = {};

				if (objs.postData != undefined) {
					if (objs.postData instanceof Array) {
						objs.postData[objs.postData.length] = {
							"name": page,
							"value": "1"
						};
						objs.postData[objs.postData.length] = {
							"name": rows,
							"value": objs.pagesize
						};
					} else {
						objs.postData[page] = 1;
						objs.postData[rows] = objs.pagesize;
					}
				}
			}
			url = url;
			crossDomainAjax(objs, url, objs.postData, function(data) {
				if (typeof(data) == "string") {
					objs.data = eval("(" + data + ")"); // 北京处理
				} else {
					objs.data = data; // 苏州处理
				}
				// 自定义结果集
				if (objs.data.records == undefined) { // 记录总数
					objs.data["records"] = objs.data[records];
				}
				if (objs.data.rows == undefined) { // 数据结果集
					objs.data["rows"] = objs.data[datarows];
				}
				if (objs.data.page == undefined) { // 当前页数
					objs.data["page"] = "1";
				}

				objs.data["total"] = Math.ceil(objs.data.records / objs.pagesize); // 总页数

				// 绑定表格处理
				initTable(_this, objs);
				if (!objs.hidenav) {
					var t = document.createElement('script');
					t.src = pageJsUrl;
					t.type = 'text/javascript';
					document.getElementsByTagName('head')[0].appendChild(t);
					t.onload = function() {
						initPage(_this, objs); // 处理导航条
					};
					// ie8处理
					t.onreadystatechange = function() {
//						if (getBrowserVersionIE8())
							initPage(_this, objs); // 处理导航条
					};
				}
				if (typeof webviewback === 'function') {
					webviewback();
				}

				if (objs.callFun) {
					objs.callFun.call('', objs.data);
				}
			})
		} else {
			// 自定义结果集
			if (objs.data.records == undefined) {
				objs.data["records"] = objs.data[records];
			}
			if (objs.data.rows == undefined) {
				objs.data["rows"] = objs.data[datarows];
			}
			objs.data["page"] = "1"; // 当前页数
			objs.data["total"] = Math.ceil(objs.data.records / objs.pagesize); // 总页数
			// 删除表格信息
			deleteTableAllRowAndPage(this, objs);
			// 添加表头
			addTableHead(_this, objs, true);
			if (!objs.firstrequest) return;
			initTable(_this, objs); // 绑定表格处理
			if (!objs.hidenav) {
				var t = document.createElement('script');
				t.src = pageJsUrl;
				t.type = 'text/javascript';
				document.getElementsByTagName('head')[0].appendChild(t);
				t.onload = function() {
					initPage(_this, objs); // 处理导航条
				};
				// ie8处理
				t.onreadystatechange = function() {
					if (getBrowserVersionIE8())
						initPage(_this, objs); // 处理导航条
				};
			}
			document.getElementById(objs.tableId).removeChild(document.getElementById(objs.tableId + "wd-wite"));
			if (typeof webviewback === 'function') {
				webviewback();
			}

			if (objs.callFun) {
				objs.callFun.call('', objs.data);
			}
		}
	};

	// 删除表格行（包括表头）、翻页
	function deleteTableAllRowAndPage(_this, objs) {
		_this.find(".wdinfotr").each(function() {
			_this[0].removeChild(this);
		});
		_this.find(".wdtableth").each(function() {
			_this[0].removeChild(this);
		});
		var pagectr = $(objs.pager);
		if ($(pagectr)[0]) $(pagectr)[0].innerHTML = "";
	};

	// 删除表格行（除表头）
	function deleteTableRow(_this) {
		_this.find(".wdinfotr").each(function() {
			_this[0].removeChild(this);
		});
	};

	// 添加表格行
	function addTableRow(json, _this, objs) {
		var tdspan;
		var _wdobjs = objs;
		var tempstr;
		for (var i = 0; i < json.rows.length; i++) {
			json.rows[i].num = i + 1;
			infotr = document.createElement("tr");
			infotr.style.height = objs.lineheight + "px";
			if (objs.hoverflg) infotr.className = 'textHover wdinfotr';
			else infotr.className = 'wdinfotr';
			infotr.id = json.rows[i][objs.dbkey]; //rows[i].id
			if (_wdobjs.oddflg) {
				if (i % 2 == 1) {
					infotr.style.background = _wdobjs.oddcolor;
				} else {
					infotr.style.background = _wdobjs.unevencolor;
				}
			}
			// 添加checkbox
			if (_wdobjs.checkflg) {
				td = document.createElement("td");
				if (_wdobjs.showBorder) {
					td = setBorderStyle(td, objs);
				}
				td.style.width = "40px";
				checkboxs = document.createElement("input");
				//checkboxs.id = "wd-check" + json.rows[i].id;
				if (_wdobjs.checktext != undefined) {
					var temp = "";
					for (var l = 0; l < _wdobjs.checktext.length; l++) {
						temp = temp + json.rows[i][_wdobjs.checktext[l]] + "#";
					}
					tempid = "wd-check" + temp.substring(0, temp.length - 1);
				} else {
					tempid = "wd-check" + json.rows[i][objs.dbkey]; //rows[i].id

				}
				checkboxs.id = tempid;
				checkboxs.className = "wd-table-check-item"
				checkboxs.type = "checkbox";
				$(checkboxs).bind("click", function() {
					checkboxCtrl(this, _this[0].id)
				});
				td.appendChild(checkboxs);
				infotr.appendChild(td);
			}
			if (_wdobjs.numberflg) {
				td = document.createElement("td");
				if (_wdobjs.showBorder) {
					td = setBorderStyle(td, objs);
				}
				td.innerHTML = i + 1;
				infotr.appendChild(td);
			}
			for (var j = 0; j < _wdobjs.colProperty.length; j++) { //_wdobjs.colModel
				td = document.createElement("td");
				if (_wdobjs.showBorder) {
					td = setBorderStyle(td, objs);
				}
				td.style.width = _wdobjs.colProperty[j].colModel.width + "px";
				if (_wdobjs.colProperty[j].colModel.float != undefined) { // 设置文本对齐方式
					td.style.textAlign = _wdobjs.colProperty[j].colModel.float;

					if (_wdobjs.colProperty[j].colModel.float == "left") {
						td.style.paddingLeft = "4px";
					} else {
						td.style.paddingRight = "4px";
					}
				}
				// 处理行内编辑innerhtml情况
				if (_wdobjs.colProperty[j].colModel.innerhtml == undefined) {
					tdspan = document.createElement('div');
					tdspan.style.width = parseInt(objs.colProperty[j].colModel.width - 10) + "px";
					tdspan.style.height = parseInt(objs.lineheight - 4) + "px";
					tdspan.style.lineHeight = parseInt(objs.lineheight - 4) + "px";
					// 行内处理
					if (json.rows[i][_wdobjs.colProperty[j].colModel.name] || json.rows[i][_wdobjs.colProperty[j].colModel.name] == 0) { // 2015-10-19调整
						// 处理日期格式化
						if (_wdobjs.colProperty[j].colModel.dataformat != undefined) {
							tempstr = json.rows[i][_wdobjs.colProperty[j].colModel.name];
							tempstr = tempstr.replace(/-/g, "/");
							tdspan.innerHTML = new Date(tempstr).format(_wdobjs.colProperty[j].colModel.dataformat);
						}
						// 处理前文本格式
						if (objs.colProperty[j].colModel.textformatbefore != undefined) {
							tdspan.innerHTML = tdspan.innerHTML + objs.colProperty[j].colModel.textformatbefore + json.rows[i][objs.colProperty[j].colModel.name];
						}
						// 处理后文本格式
						if (objs.colProperty[j].colModel.textformatafter != undefined) {
							tdspan.innerHTML = tdspan.innerHTML + json.rows[i][objs.colProperty[j].colModel.name] + objs.colProperty[j].colModel.textformatafter;
						}
						if (!objs.colProperty[j].colModel.dataformat && !objs.colProperty[j].colModel.textformatbefore && !objs.colProperty[j].colModel.textformatafter) {
							tdspan.innerHTML = json.rows[i][objs.colProperty[j].colModel.name];
						}
						// 处理码表返现
						if (store.get(objs.colProperty[j].colModel.codeformat)) {
							var json_date = JSON.parse(store.get(objs.colProperty[j].colModel.codeformat));
							if (json_date.data == undefined) {
								json_date.data = json_date;
							}
							for (var l = 0; l < json_date.data.length; l++) {
								if (json_date.data[l]["code"] == json.rows[i][objs.colProperty[j].colModel.name]) {
									tdspan.innerHTML = json_date.data[l]["codedesc"];
								}
							}
						}
					} else {
						tdspan.innerHTML = "";
					}
					if (json.rows[i][_wdobjs.colProperty[j].colModel.name] || json.rows[i][_wdobjs.colProperty[j].colModel.name] == 0) { // 2015-10-19调整
						tdspan.title = json.rows[i][_wdobjs.colProperty[j].colModel.name];
					}
					//tdspan.style.width = parseInt(_wdobjs.colProperty[j].colModel.width) + "px";
					td.appendChild(tdspan);
				} else {
					td.innerHTML = _wdobjs.colProperty[j].colModel.innerhtml.call("", json.rows[i], json);
				}
				infotr.appendChild(td);
			}
			_this[0].appendChild(infotr);
		}
		/////////////////////////////////////////////////////////////////////////待处理start
		// 处理翻页
		addPage(_this, json, _wdobjs);
		/////////////////////////////////////////////////////////////////////////待处理end
	};

	function addTableThStyle(th, objs) {
		th.style.backgroundColor = objs.headStyle.background;
		th.style.height = objs.headStyle.height + "px";
		th.style.lineHeight = objs.headStyle.height + "px";

		objs.headStyle.borderWidth = (objs.headStyle.borderWidth) ? objs.headStyle.borderWidth : 1;
		objs.headStyle.borderColor = (objs.headStyle.borderColor) ? objs.headStyle.borderColor : '#E1E1E1';
		objs.headStyle.borderStyle = (objs.headStyle.borderStyle) ? objs.headStyle.borderStyle : 'solid';

		var borderStyle = objs.headStyle.borderWidth + "px " + objs.headStyle.borderColor + " " + objs.headStyle.borderStyle;
		for (var i = 0; i < objs.headStyle.borderPosition.length; i++) {
			switch (objs.headStyle.borderPosition[i]) {
				case "top":
					th.style.borderTop = borderStyle;
					break;
				case "left":
					th.style.borderLeft = borderStyle;
					break;
				case "right":
					th.style.borderRight = borderStyle;
					break;
				case "bottom":
					th.style.borderBottom = borderStyle;
					break;
			}
		}

		return th;
	};

	// 处理码表
	function addTableThProperty(th, objs, iCount) {
		if (objs.colProperty[iCount].codeClass) { //处理码表
			if (objs.colProperty[iCount].textAlign)
				th.style.textAlign = objs.colProperty[iCount].textAlign;
			if (!store.get(objs.colProperty[iCount].codeClass))
				store.set(objs.colProperty[iCount].codeClass, JSON.stringify(objs.colProperty[iCount].codeValue));
			//<input type="text" name="code_A" id="code_A" class="WDInput WDinputCount-4 WDinputWidth-400 WDinputHiddenCode-true" onCodeChange="codechange" />
			var codeInput = document.createElement('input');
			codeInput.type = "text";
			codeInput.name = "code_" + objs.colProperty[iCount].codeClass;
			codeInput.id = "code_" + objs.colProperty[iCount].codeClass;
			codeInput.className = "WDInput"
			if (objs.colProperty[iCount].codeControl) codeInput.className = codeInput.className + " " + objs.colProperty[iCount].codeControl;

			codeInput.setAttribute("onCodeChange", objs.colProperty[iCount].codeChangeFnName)

			th.appendChild(codeInput);
		} else {
			if (objs.colProperty[iCount].innerhtml) {
				th.innerHTML = objs.colProperty[iCount].innerhtml.call("");
			}
		}

		if (objs.colProperty[iCount].lineheight) {
			th.style.height = objs.colProperty[iCount].lineheight + "px";
			th.style.lineHeight = objs.colProperty[iCount].lineheight + "px";
		}
		if (objs.colProperty[iCount].backgroundColor) {
			th.style.backgroundColor = objs.colProperty[iCount].backgroundColor;
		}
		return th;
	}

	// 添加表头
	function addTableHead(obj, objs, used) {
		var _this = obj;
		// 加载共通样式
		$(_this).addClass("wd-table");
		var tr = document.createElement("tr");
		tr.className = "wdtableth";
		if (objs.hidhead) { // 隐藏表头处理
			tr.style.display = "none";
		}
		//tr.style.height = objs.lineheight + "px";
		var infotr;
		var th;
		var td;
		var checkboxs;
		var tdspan;
		var tempstr;
		// 计算所有td的宽度和是否小于父容器的宽度，如果小于将小于部分分摊到各个td中
		// 处理padding属性
		var paddingwidth = 0;
		var paddingarray = $(_this[0].parentNode).css("padding").split(' ');
		if (paddingarray.length == 2) {
			paddingwidth = parseInt(paddingarray[1].replace('px', '')) * 2;
		} else if (paddingarray.length == 4) {
			paddingwidth = parseInt(paddingarray[1].replace('px', '')) + parseInt(paddingarray[3].replace('px', ''))
		} else if (paddingarray.length == 1 && paddingarray[0] != '') {
			paddingwidth = parseInt(paddingarray[0].replace('px', '')) * 2;
		}
		var parentNodeWidth = _this[0].parentNode.offsetWidth - paddingwidth;
		var alltablewidth = 0;
		if (objs.colProperty) {
			for (var i = 0; i < objs.colProperty.length; i++) {
				if (objs.colProperty[i].colModel.width == undefined) {
					objs.colProperty[i].colModel.width = 200;
				}
				alltablewidth = alltablewidth + parseInt(objs.colProperty[i].colModel.width);
			}
		}

		if (objs.numberflg) alltablewidth = parseInt(alltablewidth) + 100;
		else alltablewidth = parseInt(alltablewidth) + 40;

		var tempWidth = 0; // 分摊宽度
		if (parentNodeWidth > alltablewidth && objs.colProperty) {
			tempWidth = Math.ceil(parentNodeWidth - alltablewidth) / objs.colProperty.length;
		}
		// 处理添加checkbox头
		if (objs.checkflg) {
			th = document.createElement("th");
			if (objs.showBorder) {
				th = setBorderStyle(th, objs);
			}
			th.style.width = "40px";
			checkboxs = document.createElement("input");
			checkboxs.id = _this[0].id + "wd-checkall";
			checkboxs.type = "checkbox";
			$(checkboxs).bind("click", function() {
				checkboxCtrl(this, _this[0].id)
			});
			th.appendChild(checkboxs);
			// 表头样式处理
			th = addTableThStyle(th, objs);
			tr.appendChild(th);
		}
		if (objs.numberflg) {
			th = document.createElement("th");
			if (objs.showBorder) {
				th = setBorderStyle(th, objs);
			}
			th.style.width = "60px";
			th.innerHTML = span7;
			// 表头样式处理
			th = addTableThStyle(th, objs);
			tr.appendChild(th);
		}
		// 添加表头
		var allWidth = 0;
		if (objs.colProperty) {
			for (var i = 0; i < objs.colProperty.length; i++) {
				th = document.createElement("th");
				if (objs.showBorder) {
					th = setBorderStyle(th, objs);
				}

				th.id = "wdgrid_" + objs.colProperty[i].colModel.name;
				th.style.width = parseInt(objs.colProperty[i].colModel.width + tempWidth) + "px";
				objs.colProperty[i].colModel.width = objs.colProperty[i].colModel.width + tempWidth;
				allWidth = allWidth + objs.colProperty[i].width + tempWidth;
				tr.id = "wdgridBT" + _this[0].id;
				// 表头样式处理
				th = addTableThStyle(th, objs);

				if (!objs.colProperty[i].thtextAlign)
					th.style.textAlign = "center";
				else
					th.style.textAlign = objs.colProperty[i].thtextAlign;

				th.innerHTML = objs.colProperty[i].colName;

				th = addTableThProperty(th, objs, i);

				tr.appendChild(th);
			}
		}
		_this[0].appendChild(tr);

		// 添加临时遮蔽层
		if (used && objs.firstrequest) {
			tr = document.createElement("tr");
			tr.id = _this[0].id + "wd-wite";
			td = document.createElement('td');
			var colLength = 1;
			if (objs.colProperty) colLength = objs.colProperty.length;
			var colspanCount = colLength;
			if (objs.numberflg) colspanCount = colspanCount + 1;
			if (objs.checkflg) colspanCount = colspanCount + 1;
			td.colSpan = colspanCount;
			td.className = "wd-wite";
			td = setBorderStyle(td, objs);
			var div = document.createElement('div');
			td.appendChild(div);
			tr.appendChild(td);
			_this[0].appendChild(tr);
		}
	}

	// 绑定表格处理
	function initTable(obj, objs) {
		var _this = obj;
		var infotr;
		var th;
		var td;
		var checkboxs;
		var tdspan;
		var tempstr;
		// 处理行内信息
		// 处理空数据
		if (objs.data.rows == undefined || objs.data.rows == null) {
			if (objs.hidenav) {
				infotr = document.createElement("tr");
				infotr.style.height = objs.lineheight + "px";

				td = document.createElement("td");
				td.colSpan = objs.colProperty.length;
				if (objs.nodatavalue) td.innerHTML = objs.nodatavalue;
				else td.innerHTML = span6;

				if (objs.showBorder) {
					td = setBorderStyle(td, objs);
				}
				infotr.appendChild(td);
				_this[0].appendChild(infotr);
			}
		} else {
			for (var i = 0; i < objs.data.rows.length; i++) {
				objs.data.rows[i].num = i + 1;
				infotr = document.createElement("tr");
				infotr.style.height = objs.lineheight + "px";
				if (objs.hoverflg) infotr.className = 'textHover wdinfotr';
				else infotr.className = 'wdinfotr';
				infotr.id = objs.data.rows[i][objs.dbkey]; //rows[i].id
				if (objs.oddflg) {
					if (i % 2 == 1) {
						infotr.style.background = objs.oddcolor;
					} else {
						infotr.style.background = objs.unevencolor;
					}
				}
				// 添加checkbox
				if (objs.checkflg) {
					td = document.createElement("td");
					if (objs.showBorder) {
						td = setBorderStyle(td, objs);
					}
					td.style.width = "40px";
					checkboxs = document.createElement("input");
					var tempid = "";
					if (objs.checktext != undefined) {
						var temp = "";
						for (var l = 0; l < objs.checktext.length; l++) {
							temp = temp + objs.data.rows[i][objs.checktext[l]] + "#";
						}
						tempid = "wd-check" + temp.substring(0, temp.length - 1);
					} else {
						tempid = "wd-check" + objs.data.rows[i][objs.dbkey]; //rows[i].id

					}
					checkboxs.id = tempid;

					checkboxs.className = "wd-table-check-item"
					checkboxs.type = "checkbox";
					$(checkboxs).bind("click", function() {
						checkboxCtrl(this, _this[0].id)
					});
					td.appendChild(checkboxs);
					infotr.appendChild(td);
				}

				if (objs.numberflg) {
					td = document.createElement("td");
					if (objs.showBorder) {
						td = setBorderStyle(td, objs);
					}
					td.innerHTML = i + 1;
					infotr.appendChild(td);
				}
				for (var j = 0; j < objs.colProperty.length; j++) { //objs.colModel
					td = document.createElement("td");
					if (objs.showBorder) {
						td = setBorderStyle(td, objs);
					}
					if (objs.colProperty[j].colModel.float != undefined) { // 设置文本对齐方式
						td.style.textAlign = objs.colProperty[j].colModel.float;

						if (objs.colProperty[j].colModel.float == "left") {
							td.style.paddingLeft = "4px";
						} else {
							td.style.paddingRight = "4px";
						}
					}
					// 处理行内编辑innerhtml情况
					if (objs.colProperty[j].colModel.innerhtml == undefined) {
						tdspan = document.createElement('div');
						tdspan.style.width = parseInt(objs.colProperty[j].colModel.width - 10) + "px";
						tdspan.style.height = parseInt(objs.lineheight - 4) + "px";
						tdspan.style.lineHeight = parseInt(objs.lineheight - 4) + "px";
						// 行内处理
						if (objs.data.rows[i][objs.colProperty[j].colModel.name] || objs.data.rows[i][objs.colProperty[j].colModel.name] == 0) { // 2015-10-19调整
							// 处理日期格式化
							if (objs.colProperty[j].colModel.dataformat != undefined) {
								tempstr = objs.data.rows[i][objs.colProperty[j].colModel.name];
								tempstr = tempstr.replace(/-/g, "/");
								tdspan.innerHTML = new Date(tempstr).format(objs.colProperty[j].colModel.dataformat);
							}
							// 处理前文本格式
							if (objs.colProperty[j].colModel.textformatbefore != undefined) {
								tdspan.innerHTML = tdspan.innerHTML + objs.colProperty[j].colModel.textformatbefore + objs.data.rows[i][objs.colProperty[j].colModel.name];
							}
							// 处理后文本格式
							if (objs.colProperty[j].colModel.textformatafter != undefined) {
								tdspan.innerHTML = tdspan.innerHTML + objs.data.rows[i][objs.colProperty[j].colModel.name] + objs.colProperty[j].colModel.textformatafter;
							}
							// 其他处理
							if (!objs.colProperty[j].colModel.dataformat && !objs.colProperty[j].colModel.textformatbefore && !objs.colProperty[j].colModel.textformatafter) {
								tdspan.innerHTML = objs.data.rows[i][objs.colProperty[j].colModel.name];
							}
							// 处理码表返现
							if (objs.colProperty[j].colModel.codeformat) {
								if (store.get(objs.colProperty[j].colModel.codeformat)) {
									var json_date = JSON.parse(store.get(objs.colProperty[j].colModel.codeformat));
									if (json_date.data == undefined) {
										json_date.data = json_date;
									}
									for (var l = 0; l < json_date.data.length; l++) {
										if (json_date.data[l]["code"] == objs.data.rows[i][objs.colProperty[j].colModel.name]) {
											tdspan.innerHTML = json_date.data[l]["codedesc"];
										}
									}
								}
							}
						} else {
							tdspan.innerHTML = "";
						}
						if (objs.data.rows[i][objs.colProperty[j].colModel.name] || objs.data.rows[i][objs.colProperty[j].colModel.name] == 0) { // 2015-10-19调整

							if (objs.colProperty[j].colModel.codeformat) {
								if (store.get(objs.colProperty[j].colModel.codeformat)) {
									var json_date = JSON.parse(store.get(objs.colProperty[j].colModel.codeformat));
									if (json_date.data == undefined) {
										json_date.data = json_date;
									}
									for (var l = 0; l < json_date.data.length; l++) {
										if (json_date.data[l]["code"] == objs.data.rows[i][objs.colProperty[j].colModel.name]) {
											tdspan.title = json_date.data[l]["codedesc"];
										}
									}
								}
							} else {
								tdspan.title = objs.data.rows[i][objs.colProperty[j].colModel.name];
							}
						}
						td.appendChild(tdspan);
					} else {
						td.innerHTML = objs.colProperty[j].colModel.innerhtml.call("", objs.data.rows[i], objs.data);
					}
					infotr.appendChild(td);
				}
				_this[0].appendChild(infotr);
			}
		}
	};
	// 处理边框
	function setBorderStyle(obj, objs) {
		if (objs.borderPosition) {
			for (var i = 0; i < objs.borderPosition.length; i++) {
				switch (objs.borderPosition[i]) {
					case "top":
						obj.style.borderTop = objs.borderStyle;
						break;
					case "left":
						obj.style.borderLeft = objs.borderStyle;
						break;
					case "right":
						obj.style.borderRight = objs.borderStyle;
						break;
					case "bottom":
						obj.style.borderBottom = objs.borderStyle;
						break;
				}
			}
		} else {
			obj.style.border = objs.borderStyle;
		}

		return obj;
	};

	// checkbox点击事件
	function checkboxCtrl(obj, id) {
		_this = obj;
		var allcheck;
		// 处理全选操作
		if (_this.id == id + "wd-checkall") {
			allcheck = _this.checked;
			$("#" + id + " .wd-table-check-item").each(function() {
				this.checked = allcheck;
			});
		} else {
			// 单选取消
			if (!_this.checked) {
				$("#" + id + "wd-checkall")[0].checked = _this.checked;
			}
			// 单选选中
			else {
				allcheck = true;
				$("#" + id + " .wd-table-check-item").each(function() {
					if (!this.checked) {
						allcheck = false;
					}
				});
				$("#" + id + "wd-checkall")[0].checked = allcheck;
			}
		}
	};
	// 发送请求
	function crossDomainAjax(objs, url, dataobj, successCallback) {
		// 防止二次提交处理
		if (!objs.token) return false;
		objs.token = false;
		// 遮蔽层处理
		if (objs.allLineHeight != undefined) {
			var shield = document.createElement("DIV");
			shield.id = "wd-shield";
			shield.className = "wd-shield";
			shield.style.width = $("#" + objs.tableId)[0].clientWidth + "px";
			shield.style.height = (objs.allLineHeight + 40 - objs.lineheight) + "px";
			var A = $('html')[0];
			var _ = $('body')[0];
			var B = (A && A.scrollTop != null && (A.scrollTop > _.scrollTop || A.scrollLeft > _.scrollLeft)) ? A : _;
			ttop = $("#" + objs.tableId)[0].getBoundingClientRect().top + B.scrollTop + objs.lineheight;
			shield.style.top = ttop + "px";
			shield.style.left = $("#" + objs.tableId).offset().left + "px";
			document.body.appendChild(shield);

			var shieldText = document.createElement('span');
			shieldText.id = "wd-shieldText";
			shieldText.className = "wd-shieldText";
			shieldText.style.width = $("#" + objs.tableId)[0].clientWidth + "px";
			shieldText.style.top = (ttop + (objs.allLineHeight + 40 - 30) / 2) + "px";
			shieldText.style.left = $("#" + objs.tableId).offset().left + "px";

			var tempDiv = document.createElement('div');
			//			tempDiv.innerHTML = span8;
			shieldText.appendChild(tempDiv);
			document.body.appendChild(shieldText);
		}
		if (dataobj == undefined) {
			dataobj = "{[]}";
		}
		if (objs.submitType.toUpperCase() == "FORM") {
			$.ajax({
				url: url,
				cache: false,
				dataType: 'json',
				type: 'post',
				data: $.param(dataobj),
				async: true, // must be set to false
				success: function(data, success) {
					objs.token = true;
					if (objs.allLineHeight != undefined) {
						document.body.removeChild(document.getElementById("wd-shield"));
						document.body.removeChild(document.getElementById("wd-shieldText"));
					} else {
						if (document.getElementById(objs.tableId + "wd-wite"))
							document.getElementById(objs.tableId).removeChild(document.getElementById(objs.tableId + "wd-wite"));
					}
					successCallback(data);
				},
				error: function() {}
			});
		} else {
			$.ajax({
				url: url,
				cache: false,
				dataType: 'json',
				type: 'post',
				data: JSON.stringify(dataobj),
				contentType: 'application/json',
				async: true, // must be set to false
				success: function(data, success) {
					objs.token = true;
					if (objs.allLineHeight != undefined) {
						document.body.removeChild(document.getElementById("wd-shield"));
						document.body.removeChild(document.getElementById("wd-shieldText"));
					} else {
						if (document.getElementById(objs.tableId + "wd-wite"))
							document.getElementById(objs.tableId).removeChild(document.getElementById(objs.tableId + "wd-wite"));
					}
					successCallback(data);
				},
				error: function() {}
			});
		}
	}
})(jQuery);