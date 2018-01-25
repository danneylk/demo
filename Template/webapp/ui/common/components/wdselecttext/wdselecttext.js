// ##################################### 全局变量定义，可修改 #####################################start
var cookiename = "language"; // 国际化cookiename
var selectBackground = "#5b9ce8"; // 被选中的背景颜色
var selectTextColor = "#FFF"; // 被选中的文字颜色
// ##################################### 全局变量定义，可修改 #####################################end
var onCodeChange = function($WDInput) {
	if ($WDInput.attr('onCodeChange') !== null && $WDInput.attr('onCodeChange') !== undefined) {
		var _startIndex = $WDInput.attr("onCodeChange").indexOf("(");
		var _endIndex = $WDInput.attr("onCodeChange").indexOf(")");
		if (_startIndex == "-1" && _endIndex == "-1") {
			eval($WDInput.attr('onCodeChange')).call($WDInput);
		} else {
			var params = $WDInput.attr("onCodeChange").substring(_startIndex + 1, _endIndex);
			var _attr = params.split("&#");
			eval($WDInput.attr('onCodeChange').substring(0, _startIndex)).call($WDInput, _attr);
		}
	}
};
var hightLightIdx = 0; // 当前选中的行数
// ##################################### 国际化处理 #####################################start
var wdselecttextspan1; // 上一页
var wdselecttextspan2; // 清空
var wdselecttextspan3; // 下一页
var wdselecttextspan4; // 没有数据
var wdselectlangeflg; // 控件默认宽度
var language;
var arr, reg = new RegExp("(^| )" + cookiename + "=([^;]*)(;|$)");
if (document.cookie.match(reg) == null) {
	language = "zh";
} else {
	arr = document.cookie.match(reg);
	language = unescape(arr[2]);
}
//var language;
//if (navigator.browserLanguage) { // ie
//	language = navigator.browserLanguage.toUpperCase();
//} else {
//	language = navigator.language.toUpperCase();
//}
switch (language) {
	case "zh": // 中文
		wdselecttextspan1 = "上一页";
		wdselecttextspan2 = "清空";
		wdselecttextspan3 = "下一页";
		wdselecttextspan4 = "没有数据";
		wdselectlangeflg = true;
		break;
	case "en": // 英文
		wdselecttextspan1 = "Back";
		wdselecttextspan2 = "Clear";
		wdselecttextspan3 = "Next";
		wdselecttextspan4 = "No data";
		wdselectlangeflg = false;
		break;
	default:
		wdselecttextspan1 = "上一页";
		wdselecttextspan2 = "清空";
		wdselecttextspan3 = "下一页";
		wdselecttextspan4 = "没有数据";
		wdselectlangeflg = true;
		break;
}
// ##################################### 国际化处理 #####################################end
function selecttextInfo() {
	// 点击任何地方出下拉框，隐藏下拉框
	$(document.body).unbind("click");
	$(document.body).bind("click", function(event) {
		closeEW(event);
	});
	// 初始化提示
	createTip();
	// 初始化容器
	initDMLayer();
	// 初始化隐藏域
	$('.WDInput').each(function() {
		if (getattr($(this), 'WDinputTextColor')) {
			this.style.color = getattr($(this), 'WDinputTextColor');
		}
		if (getattr($(this), 'WDinputBackgroundColor')) {
			this.style.backgroundColor = getattr($(this), 'WDinputBackgroundColor');
		}
		// code
		var codeName = getattr($(this), 'WDinputDBColName');
		if (codeName == "") codeName = this.id.split('_')[1];
		if ($("#" + codeName).length == 0) {
			var hidtxt = "<input type='hidden' id='" + codeName + "' name='" + codeName + "' title='" + this.title + "'/>";
			$(this.parentNode).append(hidtxt);
		}
		// pagesize
		if ($("#" + this.id + "_pagesizehid").length == 0) {
			var pagesize = "<input type='hidden' id='" + this.id + "_pagesizehid' value='8'/>";
			$(this.parentNode).append(pagesize);
		}
		// pageindex
		if ($("#" + this.id + "_pageindexhid").length == 0) {
			var pageindex = "<input class='DMinputPageIndex' type='hidden' id='" + this.id + "_pageindexhid' value='1'/>";
			$(this.parentNode).append(pageindex);
		}
		// pagecount
		if ($("#" + this.id + "_pagecounthid").length == 0) {
			var pagecount = "<input type='hidden' id='" + this.id + "_pagecounthid'/>";
			$(this.parentNode).append(pagecount);
		}
		// allpagecount
		if ($("#" + this.id + "_allpagecounthid").length == 0) {
			var allpagecount = "<input type='hidden' id='" + this.id + "_allpagecounthid'/>";
			$(this.parentNode).append(allpagecount);
		}
		// 过滤
		if ($("#" + this.id + "_filter").length == 0) {
			var beforFilter = "<input type='hidden' id='" + this.id + "_filter'/>";
			$(this.parentNode).append(beforFilter);
		}
	});
	// 鼠标滑过事件,显示展示不下的信息
	$(".WDInput").unbind("mouseover");
	$(".WDInput").bind("mouseover", function() {
		var $multiTip = $('#multiTip');
		if ($(this).val().length * 12 < $(this).width()) {
			$multiTip.hide();
			return;
		}
		// 获取是否为多选
		var multiselect = getattr($(this), 'WDinputMultiselect-true');
		if (multiselect) {
			$multiTip.text($(this).val().substring(0, $(this).val().length - 1));
		} else {
			$multiTip.text($(this).val().substring(0, $(this).val().length));
		}
		$multiTip.show();

		var winWidth = $(window).width();
		var winHeight = $(window).height();
		var poz = $(this).offset();
		var tipTop = 0;
		if ($multiTip.outerHeight() <= $(this).height()) {
			tipTop = poz.top - $multiTip.outerHeight() - 3;
		} else {
			tipTop = poz.top + $(this).height() + 6;
		}
		var tipLeft = poz.left + $multiTip.outerWidth + 5 > winWidth ?
			poz.left + $(this).outerWidth - $multiTip.outerWidth : poz.left;

		$multiTip.css({
			top: tipTop,
			left: tipLeft,
			width: $(this).width() + 20
		});
	});
	// 鼠标移出事件,隐藏信息提示框
	$(".WDInput").unbind("mouseout");
	$(".WDInput").bind("mouseout", function() {
		var $multiTip = $('#multiTip');
		$multiTip.text("");
		$multiTip.hide();
	});
	// 点击后加载码表信息
	var oldeditvalue = "";
	$(".WDInput").unbind("focus");
	$(".WDInput").bind("focus", function() {
		// 所有码表设置为第一页
		$(".DMinputPageIndex").each(function() {
			this.value = "1";
		});
		hightLightIdx = 0;
		oldeditvalue = $(this).val();
		showDMLayer($(this));
	});
	// 输入文本查询内容
	$(".WDInput").unbind("keyup");
	$(".WDInput").bind("keyup", function(event) {
		var keyCode = event.keyCode ? event.keyCode : event.which;
		if (keyCode != 40 && keyCode != 38) showChangeDMLayer($(this));
		if (keyCode == 8) deleteInputValue($(this)); // 退格
	});
	// 失去焦点校验
	$(".WDInput").unbind("blur");
	$(".WDInput").bind("blur", function() {
		cleartDMinput($(this));
		if ($(this).val() != oldeditvalue) onCodeChange($(this));
	});
	// 阻止粘贴
	$(".WDInput").each(function() {
		this.onpaste = function() {
			return false;
		}
	});
	// 键盘按下事件
	$(".WDInput").unbind("keydown");
	$(".WDInput").bind("keydown", function(event) {
		$WDInput = $(this);
		var keyCode = event.keyCode ? event.keyCode : event.which;
		var tableRowsLength = $("#dmBody").find('tr').length;
		switch (keyCode) {
			case 40: // 下
				$("#dmBody tr").css("background-color", "#fff");
				$("#dmBody tr td").css("color", "#000");
				if (hightLightIdx == tableRowsLength - 1) {
					hightLightIdx = 0; //到最下行时转第一行					
				} else {
					hightLightIdx += 1; //行增加
				}
				$("#dmBody").find('tr').eq(hightLightIdx).css("background-color", "#5b9ce8");
				$("#dmBody").find('tr').eq(hightLightIdx).find('td').css("color", "#fff");
				break;
			case 38: //上
				$("#dmBody").find('tr').eq(hightLightIdx).css("background-color", "#FFF");
				$("#dmBody tr td").css("color", "#000");
				if (hightLightIdx === 0) {
					hightLightIdx = tableRowsLength - 1; //到第一行时转最下行
				} else {
					hightLightIdx -= 1; //行减少				
				}
				$("#dmBody").find('tr').eq(hightLightIdx).css("background-color", "#5b9ce8");
				$("#dmBody").find('tr').eq(hightLightIdx).find('td').css("color", "#fff");
				break;
			case 13: //回车
				selectInputValue($("#dmBody").find('tr').eq(hightLightIdx), $WDInput);
				break;
		}
	});
};

function createTip() {
	if ($("#multiTip").length > 0) return;
	var toolTip = $("<div id='multiTip'></div>");
	$(document.body).append(toolTip);
};

function getDMtype($WDInput) {
	var name = $WDInput.attr('name');
	return name.split('_')[1].toUpperCase();
};

function mOver(tableRow) {
	$("#dmBody").find('tr').each(function() {
		if (!$(this).hasClass("wd-selectrow")) {
			$(this).css("background-color", "#fff");
			$(this).find("td").css("color", "#000");
			$(tableRow).css("background-color", "#5b9ce8");
			for (var i = 0; i < $(tableRow)[0].childNodes.length; i++) {
				$($(tableRow)[0].childNodes[i]).css("color", "#fff");
			}
			hightLightIdx = parseInt($(tableRow).attr('poz'));
		}
	})
};

function initDMLayer() {
	if ($("#dmLayer").length > 0) return;
	var dmLayer = '<div id="dmLayer" class="dmLayerWrapper" ></div>';
	$('body').append(dmLayer);
};
// 获取码表设置属性
function getattr($WDInput, attr) {
	var retstr = "";
	if ($WDInput[0].className.indexOf(attr) != -1) {
		var classarray = $WDInput[0].className.split(' ');
		for (var i = 0; i < classarray.length; i++) {
			if (classarray[i].indexOf(attr) != -1) {
				if (classarray[i].split('-').length > 1) { // 需要赋值属性处理
					retstr = classarray[i].split('-')[1];
				} else { // 无需赋值属性处理
					retstr = "true";
				}
			}
		}
	}

	switch (attr) {
		case "WDinputCount":
			if (retstr == "") retstr = 8;
			break;
		case "WDinputWidth":
			if (retstr == "") {
				if (wdselectlangeflg) retstr = $WDInput[0].scrollWidth + 2;
				else retstr = "250"; // 针对国际化特殊处理默认宽度
			}
			break;
		case "WDinputHiddenCode":
			if (retstr == "") retstr = false;
			break;
		case "WDinputHiddenPage":
			if (retstr == "") retstr = false;
			break;
		case "WDinputMultiselect":
			if (retstr == "") retstr = false;
			break;
		case "WDinputBeforFilter":
			if (retstr == "") retstr = "";
			break;
		case "WDinputAfterFilter":
			if (retstr == "") retstr = "";
			break;
		case "WDinputKey":
			if (retstr == "") retstr = "code";
			break;
		case "WDinputValue":
			if (retstr == "") retstr = "codedesc";
			break;
	}
	return retstr;
};
// 模糊查询
function showChangeDMLayer($WDInput) {
	var nbspflg = true;
	var json_date;

	var beforFilter = getattr($WDInput, 'WDinputBeforFilter'); // 前匹配处理
	var afterFilter = getattr($WDInput, 'WDinputAfterFilter'); // 后匹配处理
	var wdKey = getattr($WDInput, 'WDinputKey'); // json动态key
	var wdValue = getattr($WDInput, 'WDinputValue'); // json动态value
	if (beforFilter == "" && afterFilter == "") {
		json_date = JSON.parse(store.get(getDMtype($WDInput)));
	} else {
		json_date = eval("(" + $("#" + $WDInput[0].id + "_filter").val() + ")");
	}
	if ($WDInput.val() != "") {
		// 获取是否显示码值
		var hiddenCode = getattr($WDInput, "WDinputHiddenCode");
		var hiddencode = "";
		if (hiddenCode) {
			hiddencode = "display: none;"
		}
		// 获取展现div宽度
		var showwidth = getattr($WDInput, 'WDinputWidth');
		// 获取是否为多选
		var multiselect = getattr($WDInput, 'WDinputMultiselect');
		var inputValue = "";
		if (multiselect) {
			inputValue = $WDInput.val().split(',')[$WDInput.val().split(',').length - 1]
		} else {
			inputValue = $WDInput.val();
		}

		$("#dmLayer").html("");
		var dmLayer = '<table id="dmBody" class="DMLT" style="width:' + showwidth + 'px;background:#FFF">';
		var k = 0;
		if (json_date.data == undefined) {
			json_date["data"] = json_date;
		}
		for (var i = 0; i < json_date.data.length; i++) {
			if (json_date.data[i][wdKey].indexOf(inputValue) != -1 || json_date.data[i][wdValue].indexOf(inputValue) != -1) {
				nbspflg = false;
				dmLayer += '<tr class="nbspflg" poz="' + k + '">';
				dmLayer += '<td class="DMRB1" style="' + hiddencode + '">' + json_date.data[i][wdKey] + '</td>';
				dmLayer += '<td class="DMRB2">' + json_date.data[i][wdValue] + '</td>';
				dmLayer += '</tr>';

				k = k + 1;
			}
		}
		if (nbspflg) {
			dmLayer = dmLayer + "<tr><td class='DMRB1' colspan='2'>" + wdselecttextspan4 + "</td></tr>";
		}
		dmLayer = dmLayer + "</table>";
		$("#dmLayer").html(dmLayer);
		$('#dmBody tr.nbspflg').hover(function() {
			mOver(this);
		}).click(function() {
			selectInputValue(this, $WDInput);
		});
		locateDMLayer($WDInput);
	}
};

// 筛选过滤全部信息，拼装新json
function datafilter($WDInput, filterType, values) {
	var tempData = JSON.parse(store.get(getDMtype($WDInput)));
	if (tempData.data == undefined) tempData.data = tempData;
	var tempLength = tempData.data.length;
	var wdKey = getattr($WDInput, 'WDinputKey'); // json动态key
	var wdValue = getattr($WDInput, 'WDinputValue'); // json动态value
	var re;
	if (filterType == "befor") re = eval("/^" + values + ".*/i");
	else if (filterType == "after") re = eval("/.*" + values + "$/");
	//else if (filterType == "only") re = eval("/^" + values.replace(/|/g,'$|^') + "$/");
	else if (filterType == "only") re = eval("/^" + values.replace(/\|/g, '$|^') + "$/");
	var jsonString = "{'data':[";
	for (var i = 0; i < tempLength; i++) {
		if (filterType != "exclude") { // 除排除外的过滤

			if (re.test(tempData.data[i][wdKey])) {
				jsonString = jsonString + "{'" + wdKey + "':'" + tempData.data[i][wdKey] + "',"
				jsonString = jsonString + "'" + wdValue + "':'" + tempData.data[i][wdValue] + "'},"
			}
		} else { // 排除处理
			var tempexclude = values.split('|');
			var addgle = true;
			for (var j = 0; j < tempexclude.length; j++) {
				if (tempData.data[i][wdKey] == tempexclude[j]) {
					addgle = false;
					break;
				}
			}
			if (addgle) {
				jsonString = jsonString + "{'" + wdKey + "':'" + tempData.data[i][wdKey] + "',"
				jsonString = jsonString + "'" + wdValue + "':'" + tempData.data[i][wdValue] + "'},"
			}
		}
	}
	jsonString = jsonString.substring(0, jsonString.length - 1) + "]}";
	$("#" + $WDInput[0].id + "_filter").val(jsonString);
	return eval("(" + jsonString + ")");
};

function showDMLayer($WDInput) {
	var arrayObj = new Array();
	var json_date;
	var beforFilter = getattr($WDInput, 'WDinputBeforFilter'); // 前过滤
	var afterFilter = getattr($WDInput, 'WDinputAfterFilter'); // 后过滤
	var onlyInclude = getattr($WDInput, 'WDinputOnlyInclude'); // 只显示
	var exclude = getattr($WDInput, 'WDinputExclude'); // 排除
	var wdKey = getattr($WDInput, 'WDinputKey'); // json动态key
	var wdValue = getattr($WDInput, 'WDinputValue'); // json动态value
	// 如果控件不可用直接跳出处理
	if ($WDInput.attr("readOnly") || $WDInput.attr("disabled")) {
		return;
	}
	// 前过滤处理 / 后过滤处理 / 只显示 / 排除
	if (beforFilter == "" && afterFilter == "" && onlyInclude == "" && exclude == "") {
		json_date = JSON.parse(store.get(getDMtype($WDInput)));
	} else { // 只处理一次全部过滤
		//		if ($("#" + $WDInput[0].id + "_filter").val() != "") {
		//			json_date = eval("(" + $("#" + $WDInput[0].id + "_filter").val() + ")");
		//		} else {
		if (beforFilter != "") json_date = datafilter($WDInput, 'befor', beforFilter);
		else if (afterFilter != "") json_date = datafilter($WDInput, 'after', afterFilter);
		else if (onlyInclude != "") json_date = datafilter($WDInput, 'only', onlyInclude);
		else if (exclude != "") json_date = datafilter($WDInput, 'exclude', exclude);
		//		}
	}
	// 将光标定位在输入框末尾
	if ($WDInput[0].createTextRange) {
		var mg = $WDInput[0].createTextRange();
		mg.collapse(false);
		mg.select();
	}

	// 设置被选中下拉框id
	$("#dmLayer").attr({
		"sname": $WDInput.attr("id")
	});
	// 关闭已打开的下拉框
	$('#dmLayer').hide();
	// 获取展现div宽度
	var showwidth = 0;
	showwidth = getattr($WDInput, 'WDinputWidth');

	var dmLayer = '<table id="dmBody" class="DMLT" style="width:' + showwidth + 'px;background:#FFFFFF">';
	if (json_date.data == undefined) {
		json_date["data"] = json_date;
	}
	var allpagecount = json_date.data.length; // 总数据条数
	$("#" + $WDInput[0].id + "_allpagecounthid").val(allpagecount);

	// 获取设定每页条数
	var pagesize = 0; // 每页条数
	pagesize = getattr($WDInput, 'WDinputCount');
	$("#" + $WDInput[0].id + "_pagesizehid").val(pagesize);

	// 获取是否显示码值
	var hiddenCode = getattr($WDInput, "WDinputHiddenCode");

	// 获取是否显示翻页
	var hiddenPage = getattr($WDInput, "WDinputHiddenPage");

	// 获取总页数
	$("#" + $WDInput[0].id + "_pagecounthid").val(Math.ceil(allpagecount / pagesize));
	var hiddencode = "";
	if (hiddenCode) {
		hiddencode = "display: none;"
	}
	// 隐藏翻页，一次性加载全部信息
	if (hiddenPage) {
		pagesize = json_date.data.length;
	}
	if (json_date.data.length > pagesize) {
		for (var i = 0; i < pagesize; i++) {
			dmLayer += '<tr poz="' + i + '">';
			dmLayer += '<td class="DMRB1" style="' + hiddencode + '">' + json_date.data[i][wdKey] + '</td>';
			dmLayer += '<td class="DMRB2">' + json_date.data[i][wdValue] + '</td>';
			dmLayer += '</tr>';
		}
	} else {
		if (json_date.data[0][wdKey]) { // 当信息不存在时不显示下拉框
			for (var i = 0; i < json_date.data.length; i++) {
				dmLayer += '<tr poz="' + i + '">';
				dmLayer += '<td class="DMRB1" style="' + hiddencode + '">' + json_date.data[i][wdKey] + '</td>';
				dmLayer += '<td class="DMRB2">' + json_date.data[i][wdValue] + '</td>';
				dmLayer += '</tr>';
			}
		}
	}
	dmLayer = dmLayer + "</table>";

	if (!hiddenPage) {
		dmLayer += '<table class="DMPager" style="width:' + showwidth + 'px"><tr><td>';
		dmLayer += '<a href="javascript:void(0)" id="pageUp" name="' + $WDInput[0].id + '" style="display:none">' + wdselecttextspan1 + '</a>';
		dmLayer += '<a href="javascript:void(0)" id="wd-clear" name="' + $WDInput[0].id + '">' + wdselecttextspan2 + '</a>';
		if (pagesize >= json_date.data.length) {
			dmLayer += '<a href="javascript:void(0)" id="pageDown" name="' + $WDInput[0].id + '" style="display:none">' + wdselecttextspan3 + '</a>';
		} else {
			dmLayer += '<a href="javascript:void(0)" id="pageDown" name="' + $WDInput[0].id + '">' + wdselecttextspan3 + '</a>';
		}

		dmLayer += '</td></tr></table>';
	} else {
		dmLayer += '<table class="DMPager" style="width:' + showwidth + 'px"><tr><td>';
		dmLayer += '<a href="javascript:void(0)" id="pageUp" name="' + $WDInput[0].id + '" style="display:none">' + wdselecttextspan1 + '</a>';
		dmLayer += '<a href="javascript:void(0)" id="wd-clear" name="' + $WDInput[0].id + '">' + wdselecttextspan2 + '</a>';
		dmLayer += '<a href="javascript:void(0)" id="pageDown" name="' + $WDInput[0].id + '" style="display:none">' + wdselecttextspan3 + '</a>';
		dmLayer += '</td></tr></table>';
	}
	$("#dmLayer").html(dmLayer);


	// 设置默认选中行
	setSelectRow($WDInput);

	$('#dmBody tr').hover(function() {
		mOver(this);
	}).click(function() {
		selectInputValue(this, $WDInput);
	});
	$('#pageUp').click(function() {
		if ($(this).attr("disabled") == "disabled") return;
		if ($("#" + this.name + "_pageindexhid").val() != 1) {
			var fromcount = parseInt(parseInt($("#" + this.name + "_pageindexhid").val()) - 2) * parseInt($("#" + this.name + "_pagesizehid").val());
			var tocount = parseInt(parseInt($("#" + this.name + "_pageindexhid").val()) - 1) * parseInt($("#" + this.name + "_pagesizehid").val());
			$("#dmBody").html("");
			var dmLayer = "";
			for (var i = fromcount; i < tocount; i++) {
				dmLayer += '<tr>';
				dmLayer += '<td class="DMRB1" style="' + hiddencode + '">' + json_date.data[i][wdKey] + '</td>';
				dmLayer += '<td class="DMRB2">' + json_date.data[i][wdValue] + '</td>';
				dmLayer += '</tr>';
			}
			$("#dmBody").html(dmLayer);

			setSelectRow($WDInput);

			$('#dmBody tr').hover(function() {
				mOver(this);
			}).click(function() {
				selectInputValue(this, $WDInput);
			});
			$("#" + this.name + "_pageindexhid").val(parseInt($("#" + this.name + "_pageindexhid").val()) - 1);

			locateDMLayer($WDInput);
			if ($("#" + this.name + "_pageindexhid").val() == "1") {
				$("#pageUp").hide();
			}
			$("#pageDown").show();
		}
	});
	$('#pageDown').click(function() {
		if ($(this).attr("disabled") == "disabled") return;
		if ($("#" + this.name + "_pageindexhid").val() != $("#" + this.name + "_pagecounthid").val()) {
			var fromcount = parseInt($("#" + this.name + "_pageindexhid").val()) * parseInt($("#" + this.name + "_pagesizehid").val());
			var tocount = 0;
			if (parseInt($("#" + $WDInput[0].id + "_allpagecounthid").val()) < parseInt(parseInt($("#" + this.name + "_pageindexhid").val()) + 1) * parseInt($("#" + this.name + "_pagesizehid").val())) {
				tocount = $("#" + $WDInput[0].id + "_allpagecounthid").val();
			} else {
				tocount = parseInt(parseInt($("#" + this.name + "_pageindexhid").val()) + 1) * parseInt($("#" + this.name + "_pagesizehid").val());
			}
			$("#dmBody").html("");
			var dmLayer = "";
			for (var i = fromcount; i < tocount; i++) {
				dmLayer += '<tr>';
				dmLayer += '<td class="DMRB1" style="' + hiddencode + '">' + json_date.data[i][wdKey] + '</td>';
				dmLayer += '<td class="DMRB2">' + json_date.data[i][wdValue] + '</td>';
				dmLayer += '</tr>';
			}
			$("#dmBody").html(dmLayer);

			setSelectRow($WDInput);

			$('#dmBody tr').hover(function() {
				mOver(this);
			}).click(function() {
				selectInputValue(this, $WDInput);
			});
			$("#" + this.name + "_pageindexhid").val(parseInt($("#" + this.name + "_pageindexhid").val()) + 1);

			locateDMLayer($WDInput);

			if (fromcount + parseInt($("#" + this.name + "_pagesizehid").val()) >= parseInt($("#" + $WDInput[0].id + "_allpagecounthid").val())) {
				$("#pageDown").hide();
			}

			$("#pageUp").show();
		}
	});
	$('#wd-clear').click(function() {
		var codeName = getattr($("#" + this.name), 'WDinputDBColName');
		if (codeName == "") codeName = $("#" + this.name)[0].id.split('_')[1];

		$("#" + codeName).val("");
		$("#" + this.name).val("");
		clearSelectRow();
		onCodeChange($WDInput);
	});
	locateDMLayer($WDInput);
	$("#dmLayer").show();
};
// 设置默认选中行
function setSelectRow($WDInput) {
	$("#dmBody").find('tr').each(function() {
		var codeName = getattr($WDInput, 'WDinputDBColName');
		if (codeName == "") codeName = $WDInput[0].id.split("_")[1];

		var tmp = $("#" + codeName).val().split(',');

		for (var i = 0; i < tmp.length; i++) {
			if (($(this).find('td')[0].innerHTML) == tmp[i]) {
				$("#dmBody").find('tr').eq($(this).index()).addClass("wd-selectrow");
				$("#dmBody").find('tr').eq($(this).index()).css("backgroundColor", selectBackground); //默认第一行为高亮行
				$($("#dmBody").find('tr')[$(this).index()]).find('td').css("color", selectTextColor);
			}
		}
	});
}
// 清空选中行
function clearSelectRow(){
	if($("#dmBody").find('tr').hasClass("wd-selectrow")){
		$("#dmBody .wd-selectrow").css("background-color", "#fff");
		$("#dmBody .wd-selectrow").find("td").css("color", "#000");
		$("#dmBody .wd-selectrow").removeClass("wd-selectrow");
	}
}
// 删除已选项
function deleteInputValue($WDInput) {
	if ($WDInput.val() == "") {
		$("#" + $WDInput[0].id.split('_')[1]).val("");
	}
	var wdKey = getattr($WDInput, 'WDinputKey'); // json动态key
	var wdValue = getattr($WDInput, 'WDinputValue'); // json动态value
	var multiselect = getattr($WDInput, "WDinputMultiselect"); // 多选	
	if (multiselect) {
		var json_date = JSON.parse(store.get(getDMtype($WDInput)));
		if (json_date.data == undefined) {
			json_date["data"] = json_date;
		}
		var selectvalue = $WDInput.val().split(',');
		var selectcode = "";
		for (var i = 0; i < selectvalue.length; i++) {
			for (var j = 0; j < json_date.data.length; j++) {
				if (selectvalue[i] == json_date.data[j][wdValue]) {
					selectcode = selectcode + json_date.data[j][wdKey] + ",";
				}
			}
		}
		$("#" + $WDInput[0].id.split('_')[1]).val(selectcode);
	}
};
// 选中下拉框某项
function selectInputValue(obj, $WDInput) {
	// 当选中时屏蔽校验提示框
	if ($("#multivaildateTip").length != 0) $("#multivaildateTip").hide();
	hightLightIdx = 0;
	var codeName = getattr($WDInput, 'WDinputDBColName');
	if (codeName == "") codeName = $WDInput[0].id.split('_')[1];
	var multiselect = getattr($WDInput, "WDinputMultiselect"); // 多选
	var oldCode = "";
	var newCode = "";
	var multiselectValueBefor = "";
	var wdKey = getattr($WDInput, 'WDinputKey'); // json动态key
	var wdValue = getattr($WDInput, 'WDinputValue'); // json动态value
	// 多选处理
	if (multiselect) {
		oldCode = $WDInput.val();
		newCode = $.trim($(obj).children().eq(1).text());
		if (oldCode.indexOf(newCode + ",") == -1) { // 选择不同值时记录选择信息
			var temp = $("#" + codeName).val();
			temp = temp.substring(0, temp.length - 1).split(',');
			var json_date = JSON.parse(store.get(getDMtype($WDInput)));
			if (json_date.data == undefined) {
				json_date["data"] = json_date;
			}
			for (var i = 0; i < temp.length; i++) {
				for (var j = 0; j < json_date.data.length; j++) {
					if (json_date.data[j][wdKey] == temp[i]) {
						multiselectValueBefor = multiselectValueBefor + json_date.data[j][wdValue] + ",";
					}
				}
			}
			$WDInput.val(multiselectValueBefor + $.trim($(obj).children().eq(1).text()) + ",");
			$("#" + codeName).val($("#" + codeName).val() + $.trim($(obj).children().eq(0).text()) + ",");
		} else {
			oldCode = oldCode.replace(newCode + ",", '');
			$("#" + codeName).val($("#" + codeName).val().replace($.trim($(obj).children().eq(0).text()) + ",", ''));


			$(obj).css("background-color", "#fff");
			$(obj).find("td").css("color", "#000");
			//			var tmp = $WDInput.val().split(',');
			//			var tempVal = "";
			//			for (var i = 0; i < tmp.length - 1; i++) {
			//				tempVal = tempVal + tmp[i] + ",";
			//			}
			$WDInput.val(oldCode);
		}
	} else { // 单选处理
		oldCode = $WDInput.val();
		newCode = $.trim($(obj).children().eq(1).text());
		$WDInput.val($.trim($(obj).children().eq(1).text()));
		$("#" + codeName).val($.trim($(obj).children().eq(0).text()));
		$("#dmLayer").hide();
		if (oldCode != newCode) {
			onCodeChange($WDInput);
		}
	}

	// 设置为第一页
	$("#" + $WDInput[0].id + "_pageindexhid").val("1");
};
// 下拉框定位
function locateDMLayer(obj) {
	var thei = obj.height(); //控件本身的高
	var twid = obj.width(); //控件本身的宽
	var ttop = obj[0].getBoundingClientRect().bottom; //控件的定位点高

	var tleft = $(obj).offset().left; //obj[0].offsetLeft; //控件的定位点宽

	var A = $('html')[0];
	var _ = $('body')[0];
	var B = (A && A.scrollTop != null && (A.scrollTop > _.scrollTop || A.scrollLeft > _.scrollLeft)) ? A : _;
	ttop = ttop + B.scrollTop;
	var winWidth = document.body.clientWidth;
	var winHeight = $(document).height();
	dmLayerWidth = parseFloat(getattr(obj, 'WDinputWidth'));
	dmLayerHeight = $('#dmLayer').height();

	//靠近右边窗口时,代码列表在左边展现
	if ((tleft + dmLayerWidth + 15) < winWidth || tleft + twid - dmLayerWidth + 7 < 0) {
		$("#dmLayer").css("left", tleft);
	} else {
		$("#dmLayer").css("left", tleft + twid - dmLayerWidth + 7);
	}
	//靠近窗口底边时,代码列表在上边展现
	if (ttop + thei + dmLayerHeight + 10 < winHeight || ttop - dmLayerHeight - 1 < 0) {
		$("#dmLayer").css("top", ttop);
	} else {
		$("#dmLayer").css("top", ttop - dmLayerHeight - 2 - thei);
	}
}

function cleartDMinput($WDInput) {
	var codeName = getattr($WDInput, 'WDinputDBColName');
	if (codeName == "") codeName = $WDInput[0].name.split('_')[1];

	var multiselect = getattr($WDInput, "WDinputMultiselect"); // 多选
	var wdKey = getattr($WDInput, 'WDinputKey'); // json动态key
	var wdValue = getattr($WDInput, 'WDinputValue'); // json动态value
	var json_date = JSON.parse(store.get(getDMtype($WDInput)));
	if (json_date.data == undefined) {
		json_date["data"] = json_date;
	}
	var flg = false;
	var selectValue = $WDInput.val().split(',');
	// 多选处理
	if (multiselect) {
		var subflg = false;
		for (var i = 0; i < selectValue.length; i++) {
			if (selectValue[i] == "") return;
			for (var j = 0; j < json_date.data.length; j++) {
				if (json_date.data[j][wdValue].indexOf(selectValue[i]) != -1) {
					subflg = true;
					break;
				} else {
					subflg = false;
				}
			}

			if (!subflg) {
				flg = subflg;
				break;
			} else {
				flg = subflg;
			}
		}
	} else {
		// 单选处理
		for (var i = 0; i < json_date.data.length; i++) {
			if (json_date.data[i][wdValue] == $WDInput.val()) {
				$("#" + codeName).val(json_date.data[i][wdKey]);
				flg = true;
				break;
			}
		}
	}
	if (!flg) {
		$WDInput.val("");
		$("#" + codeName).val("");
	}
}

// 任意点击时关闭该码表控件
function closeEW(event) {
	var obj = $(event.target);
	if (obj.parents('#dmLayer').length == 0 && (!obj.attr('class') || obj.attr('class').indexOf('WDInput') < 0) &&
		obj.attr('id') != 'pageUp' && obj.attr('id') != 'pageDown' && obj.attr('class') != 'DMRB1' && obj.attr('class') != 'DMRB2') {

		if ($("#dmLayer").is(':visible')) {
			$("#dmLayer").hide();
			// 所有码表设置为第一页
			$(".DMinputPageIndex").each(function() {
				this.value = "1";
			});
			// 处理当前选中控件内容是否合法
			var $WDInput = $('#' + $("#dmLayer").attr('sname'));
			if ($WDInput.length == 0) {
				return;
			}
			cleartDMinput($WDInput);
		}
	}
};
// 获取选择的码值
function getWDCode(obj) {
	var codeName = getattr($("#" + obj), 'WDinputDBColName');
	if (codeName == "") codeName = obj.split('_')[1];
	return $("#" + codeName).val();
};
// 获取选择的码值描述
function getWDCodeDesc(obj) {
	return $("#" + obj).val();
};
// 设置码表初始值
function setWDCode(obj, code, fn) {
	var codeName = getattr($("#" + obj), 'WDinputDBColName');
	if (codeName == "") codeName = obj.split('_')[1];

	var codeObj = $("#" + obj);
	var codeclass = getDMtype(codeObj);
	var wdKey = getattr(codeObj, 'WDinputKey'); // json动态key
	var wdValue = getattr(codeObj, 'WDinputValue'); // json动态value
	var multiselect = getattr(codeObj, "WDinputMultiselect"); // 多选
	if (!store.get(codeclass)) {
		$("#" + codeName).val(code);
		return;
	}
	var json_date = JSON.parse(store.get(codeclass));
	if (json_date.data == undefined) {
		json_date["data"] = json_date;
	}
	var dataLength = json_date.data.length;
	var tempcode = "";
	var tempcodedesc = "";
	for (var i = 0; i < dataLength; i++) {
		if (multiselect) {
			var tem = code.split(',');
			for (var j = 0; j < tem.length; j++) {
				if (json_date.data[i][wdKey] == tem[j]) {
					tempcode = tempcode + json_date.data[i][wdKey] + ",";
					tempcodedesc = tempcodedesc + json_date.data[i][wdValue] + ",";
				}
			}
		} else {
			if (json_date.data[i][wdKey] == code) {
				tempcode = json_date.data[i][wdKey];
				tempcodedesc = json_date.data[i][wdValue];
			}
		}
	}
	codeObj.val(tempcodedesc);
	$("#" + codeName).val(tempcode);

	if (fn) {
		fn.call();
	}
	//onCodeChange($("#" + obj));
};
// 动态添加码表值
function addWDCode(obj, code) {
	var codeObj = $("#" + obj);
	var codeclass = getDMtype(codeObj);
	var wdKey = getattr(codeObj, 'WDinputKey'); // json动态key
	var wdValue = getattr(codeObj, 'WDinputValue'); // json动态value
	var json_date = JSON.parse(store.get(codeclass));

	for (var i = 0; i < code.length; i++) {
		json_date[json_date.length] = {
			code: code[i][wdKey],
			codedesc: code[i][wdValue]
		};
	}
	store.set(codeclass, JSON.stringify(json_date));
};
// 动态修改码值
function editWDCode(codeclass, code, flg) {
	var json_date = JSON.parse(store.get(codeclass));
	var oldtext = "";
	for (var i = 0; i < json_date.length; i++) {
		if (json_date[i]["code"] == code.id) {
			oldtext = json_date[i]["codedesc"];
			if (flg == 'update') {
				json_date[i]["codedesc"] = code.name;

				$(".WDInput").each(function() {
					if (this.name.indexOf(codeclass) != 0) {
						if ($(this).val() == oldtext) {
							$(this).val(code.name)
						}
					}
				});

				break;
			} else if (flg == 'delete') {
				delete json_date[i]["codedesc"];
				delete json_date[i]["code"];

				break;
			}
		}
	}

	if (flg == 'add') {
		json_date[json_date.length] = {
			code: code.id,
			codedesc: code.name
		};
	}
	var tempjson = JSON.stringify(json_date).replace('{},', '');
	tempjson = tempjson.replace(',{}', '');
	store.set(codeclass, tempjson);

	if (flg == 'delete') {
		$(".WDInput").each(function() {
			if (this.name.indexOf(codeclass) != 0) {
				if ($(this).val() == oldtext) {
					cleartDMinput($(this));
				}
			}
		});
	}
};

function getCodeDescByCode(codeclass, code) {
	var returncodedesc = "";
	var json_date = JSON.parse(store.get("codeclass"));
	if (json_date.data == undefined) {
		json_date.data = json_date;
	}
	for (var l = 0; l < json_date.data.length; l++) {
		if (json_date.data[l]["code"] == code) {
			returncodedesc = json_date.data[l]["codedesc"];

			break;
		}
	}

	return returncodedesc;
}