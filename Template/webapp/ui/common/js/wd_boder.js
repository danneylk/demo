//格式化时间 服务器返回时间格式为yyyyMMddHHmmssSSS 17位字符串
//将服务器时间修改为yyyy年MM月dd日 HH:mm 的基本格式
//createTime 服务器返回时间
// value 国际化后的时间标志 （年，月，日）
function formatCreateTimeByChina(createTime) {
	if(!createTime) {
		console.log("时间传入值为空。");
		return;
	}
	if(createTime.length > 12) {
		var year = createTime.slice(0, 4);
		var month = createTime.slice(4, 6);
		var day = createTime.slice(6, 8);
		var hour = createTime.slice(8, 10);
		var minute = createTime.slice(10, 12)
		var newTimeStr = year + "年" + month + "月" + day + "日 " + hour + ":" + minute;
		return newTimeStr;
	} else {
		return createTime;
	}
};
//格式化时间 
//dateTime 需要格式化的时间（格式为：2016-08-05 11:00:00）
// 格式化之后返回时间的格式为：2016年08月05日 11:00
function formatDateTime(dateTime) {
	console.log("dateTime------>" + dateTime);
	if(!dateTime) {
		console.log("时间传入值为空。");
		return;
	}
	if(dateTime.length == 19) {
		var year = dateTime.slice(0, 4);
		var month = dateTime.slice(5, 7);
		var day = dateTime.slice(8, 10);
		var hour = dateTime.slice(11, 13);
		var minute = dateTime.slice(14, 16)
		var newTimeStr = year + "年" + month + "月" + day + "日 " + hour + ":" + minute;
		return newTimeStr;
	} else {
		return dateTime;
	}
};
//格式化时间 服务器返回时间格式为yyyyMMddHHmmssSSS 17位字符串
//将服务器时间修改为yyyy-MM-dd HH:mm 的基本格式
function formatCreateTimeByBase(createTime) {
	if(!createTime) {
		console.log("时间传入值为空。");
		return;
	}
	if(createTime.length > 12) {
		var year = createTime.slice(0, 4);
		var month = createTime.slice(4, 6);
		var day = createTime.slice(6, 8);
		var hour = createTime.slice(8, 10);
		var minute = createTime.slice(10, 12)
		var newTimeStr = year + "-" + month + "-" + day + " " + hour + ":" + minute;
		return newTimeStr;
	} else {
		return createTime;
	}
};
// 转换时间格式
function getTranTime(currentTime) {
	var intTime = parseInt(currentTime);
	var second = 0;
	var mins = 0;
	var hour = 0;
	var times = "";
	if(intTime < 60) {
		second = (intTime % 60)
	}
	if(intTime >= 60 && intTime <= 3600) {
		second = (intTime % 60);
		mins = parseInt(intTime / 60)
	}
	if(intTime > 3600) {
		second = (intTime % 60);
		var allmins = parseInt(intTime / 60);
		mins = (allmins % 60);
		hour = parseInt(allmins / 60);
	}
	if(second < 10) {
		second = "0" + second;

	}
	if(mins < 10) {
		mins = "0" + mins;
	}
	if(hour < 10) {
		hour = "0" + hour;
	}
	if(hour == 0) {
		if(mins == 0) {
			times = "00:00:" + second;
		} else {
			times = "00:" + mins + ":" + second;

		}
	} else {
		times = hour + ":" + mins + ":" + second;
	}
	return times;
};
// 日期加n
function addDate(dd, dadd) {
	var a = new Date(dd)
	a = a.valueOf()
	a = a + dadd * 24 * 60 * 60 * 1000
	a = new Date(a)
	return a;
};
/**
 * 获取该日期在本年的天数和星期数
 * @param {Object} d 计算日期
 */
function getDayWeekCountForDay(d) {
	var d1 = new Date(d);
	var d2 = new Date(d);
	d2.setMonth(0);
	d2.setDate(1);
	var rq = d1 - d2;
	var s1 = Math.ceil(rq / (24 * 60 * 60 * 1000));
	var s2 = Math.ceil(s1 / 7);
	return {
		"day": s1,
		"week": s2
	};
};
/**
 * 校验editor长度
 */
function checkEditorLen(strVal, maxLen) {
	var flag = true;
	var sum = 0;
	if(strVal != undefined && strVal != null && strVal != "") {
		for(var i = 0; i < strVal.length; i++) {
			if((strVal.charCodeAt(i) >= 0) && (strVal.charCodeAt(i) <= 255))
				sum += 1;
			else
				sum += 2;
		}
	}
	if(sum > maxLen) {
		flag = false;
	}
	return flag;
};
// 返回顶部
function goTop() {
	$("body,html").animate({
		scrollTop: 0
	}, 500);
	return false;
};
//生成32位随机码
function newGuid() {
	var guid = "";
	for(var i = 1; i <= 32; i++) {
		var n = Math.floor(Math.random() * 16.0).toString(16);
		guid += n;
	}
	return guid;
};
//--------------
/**
 * Description: 获取codedesc,未找到对应desc返回undefined
 * @param codeclass
 * @param code
 * @returns
 */
function getCodeDescByCodeClass(codeclass, code) {
	if(!code) return code;
	var codes = code.split(",");
	var codeclass_json = store.get(codeclass);
	if(!codeclass_json) return code;
	if(typeof codeclass_json == 'string') {
		codeclass_json = eval("(" + codeclass_json + ")");
	}
	var code_arr = codeclass_json.data;
	if(codeclass_json.data == undefined) {
		code_arr = codeclass_json;
	}
	var codesdesc = "";
	for(var i = 0; i < code_arr.length; i++) {
		for(var j = 0; j < codes.length; j++) {
			if(code_arr[i].code == codes[j].replace(/(^\s*)|(\s*$)/g, "")) {
				codesdesc += code_arr[i].codedesc + ",";
			}
		}
	}
	if(codesdesc != "") {
		return codesdesc.substring(0, codesdesc.length - 1);
	} else {
		return code;
	}
};
// 关闭控件飘窗共通处理方法
function wdControlClose(event) {
	if(typeof(closeEW) == "function") {
		closeEW(event);
	}

	if(typeof(closeLabelEW) == "function") {
		closeLabelEW(event);
	}

	if(typeof(closeDateEW) == "function") {
		closeDateEW(event)
	}
};
/**
 * 滚动到对象底部
 */
function scrollBottom(obj) {
	obj.scrollTop = obj.scrollHeight;
};
// 还原用户操作轨迹
function showCustomerTrack() {
	var box = document.getElementById(wd_mousermove_domid);
	box.style.position = "relative";
	var wdCanvas = document.createElement('canvas');
	wdCanvas.style.position = "absolute";
	wdCanvas.style.top = "0";
	wdCanvas.style.left = "0";
	wdCanvas.width = box.offsetWidth;
	wdCanvas.height = box.offsetHeight;
	box.appendChild(wdCanvas);

	for(var i = 0; i < wd_mousermove_arraylist.length; i++) {
		var ctx = wdCanvas.getContext("2d");
		ctx.beginPath();
		ctx.arc(wd_mousermove_arraylist[i].split(":")[0], wd_mousermove_arraylist[i].split(":")[1], 4, 0, 2 * Math.PI);
		ctx.fillStyle = "#0000ff";
		ctx.strokeStyle = "#0000ff";
		ctx.shadowBlur = 8;
		ctx.shadowColor = "#0000ff";
		ctx.fill();
		ctx.closePath();
		ctx.stroke();
	}
};
// 多选框全选
function wdCheckBoxAllSelect(boxid) {
	if($("#" + boxid).hasClass('wd-check-alltrue')) {
		$("#" + boxid).addClass("wd-check-allfalse");
		$("#" + boxid).removeClass("wd-check-alltrue");
	} else {
		$("#" + boxid).addClass("wd-check-alltrue");
		$("#" + boxid).removeClass("wd-check-allfalse");
	}
	$("#" + boxid).find("div").each(function() {
		if($(this).hasClass("wd-check")) {
			// 选中效果
			if(!$(this).hasClass("wd-checkbox-check-active") && $("#" + boxid).hasClass('wd-check-alltrue')) {
				// 全选屏蔽只读的复选框
				if(!$(this).hasClass("wd-check-readonly")) {
					$(this).removeClass("wd-checkbox-check");
					$(this).addClass("wd-checkbox-check-active");
					$(this).prev()[0].checked = true;
				}
			}
			// 取消效果
			else if($(this).hasClass("wd-checkbox-check-active") && !$("#" + boxid).hasClass('wd-check-alltrue')) {
				$(this).removeClass("wd-checkbox-check-active");
				$(this).addClass("wd-checkbox-check");
				$(this).prev()[0].checked = false;
			}
		}
	});
};
// 获取组选中数量
function getAllSelectCheckBoxCount(groupid) {
	var selectCount = 0;
	$("[name=" + groupid + "]").each(function() {
		if(this.checked) {
			selectCount = selectCount + 1;
		}
	});
	return selectCount;
};
function getMsgInfo(msgCode) {
	var msginfo = eval("(" + store.get("msgCode" + msgversion) + ")");
	return msginfo[msgCode];
};
/**
 * ajax请求全局设置，如果没有session或者session失效自动跳转
 * loginAddress: 登录地址
 * indexAddress: 登录后的跳转地址
 */
var loginAddress = getRequestAddressUrl("loginAddress");
var indexAddress = getRequestAddressUrl("indexAddress");
$.ajaxSetup({
	type: 'POST',
	complete: function(xhr, status) {
		var sessionStatus = xhr.getResponseHeader('sessionstatus');
		if(sessionStatus == 'timeout') {
			var top = getTopWinow();
			top.location.href = loginAddress + "?redirectURL=" + indexAddress;
		}
	}
});
// 待拆分
var ShareTip = function() {};
//分享到新浪微博  
ShareTip.prototype.sharetosina = function(title, url, picurl) {
	var sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' + title + '&url=' + url + '&content=utf-8&sourceUrl=' + url + '&pic=' + picurl;
	window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=100');
};
//分享到QQ空间  
ShareTip.prototype.sharetoqqzone = function(title, url, picurl) {
	var shareqqzonestring = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=' + title + '&summary=' + title + '&url=' + url + '&pics=' + picurl;
	window.open(shareqqzonestring, 'newwindow', 'height=400,width=400,top=100,left=100');
};

// 待废弃
// 页面跳转方法(废弃)
// settings.openType：打开方式
// settings.targetId：目标页面id
// settings.parameters：页面跳转参数
// settings.boxId：模板id
// settings.headjsurl：动态引用json地址
// settings.internationaurl：国际化地址
function pageChange(settings) {

	$("#multivaildateTip").hide();
	var jsarray = "";
	var cssarray = ""
	var url = "";
	var fn = "";
	var internationaurl = "";
	var internationaversion = "";
	var urlversion = "";
	$.ajax({
		type: "get",
		url: appAddress + settings.headjsurl + "?time=" + new Date().getTime(),
		dataType: "json",
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				if(data[i].pageid == settings.targetId) {
					cssarray = data[i].cssurl;
					url = data[i].pageurl;
					fn = data[i].pagefun;
					jsarray = data[i].jsurlarray;
					internationaurl = data[i].internationaurl;
					internationaversion = (data[i].internationaversion) ? data[i].internationaversion : commonversion;
					urlversion = (data[i].pageversion) ? data[i].pageversion : commonversion;
					break;
				}
			}

			var languagedata = "";
			if(internationaurl != undefined) {
				languagedata = getInternationalizationInfo(internationaurl, internationaversion);
			}
			if(checkJson(languagedata) && checkJson(settings.parameters)) {
				languagedata = jsonjoin(languagedata, settings.parameters);
			}
			if(!checkJson(languagedata) && checkJson(settings.parameters)) {
				languagedata = settings.parameters;
			}

			switch(settings.openType) {
				case "template":
					loadHeadJs(jsarray, cssarray, function() {
						var jsonData = {
							url: url,
							urlversion: urlversion,
							id: mainPageTemplateId,
							parameters: languagedata,
							pageloadefn: fn
						};
						addurl(jsonData);
						if(wd_back.length > 1 && getBrowserVersion() != "IE 8" && getBrowserVersion() != "IE 9") {
							history.pushState(null, "", "");
							history.replaceState(null, "", "");
						}
						getTemplate(jsonData, function() {
							if(fn != "") {
								if(jsonData.parameters) {
									eval(fn).call('', jsonData.parameters);
								} else {
									eval(fn).apply();
								}
							}
						});
					});
					break;
				case "open":
					window.open(data[i].pageurl);
					break;
				case "location":
					window.location = data[i].pageurl;
					break;
			}
		}
	});
};